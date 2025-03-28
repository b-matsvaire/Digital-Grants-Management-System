
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Publication, Grant } from "@/types/publication";

export const usePublications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New publication form state
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journal, setJournal] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [doi, setDoi] = useState("");
  const [grantId, setGrantId] = useState("");
  
  // Fetch publications when component mounts
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchPublications();
    fetchGrants();
  }, [user, navigate]);
  
  const fetchPublications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("user_id", user?.id);
        
      if (error) throw error;
      
      setPublications(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching publications",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchGrants = async () => {
    try {
      const { data, error } = await supabase
        .from("grants")
        .select("id, title")
        .eq("user_id", user?.id);
        
      if (error) throw error;
      
      setGrants(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching grants",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleAddPublication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from("publications")
        .insert([
          {
            title,
            authors,
            journal,
            publication_date: publicationDate,
            doi,
            grant_id: grantId,
            user_id: user?.id,
            status: "published"
          }
        ])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Publication added",
        description: "Your publication has been successfully added.",
      });
      
      // Reset form
      setTitle("");
      setAuthors("");
      setJournal("");
      setPublicationDate("");
      setDoi("");
      setGrantId("");
      
      // Refresh publications
      fetchPublications();
      
    } catch (error: any) {
      toast({
        title: "Error adding publication",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return {
    publications,
    loading,
    grants,
    title,
    setTitle,
    authors,
    setAuthors,
    journal,
    setJournal,
    publicationDate,
    setPublicationDate,
    doi,
    setDoi,
    grantId,
    setGrantId,
    handleAddPublication,
    formatDate
  };
};
