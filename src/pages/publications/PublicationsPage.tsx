
import React, { useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PublicationsTable from "@/components/publications/PublicationsTable";
import SearchToolbar from "@/components/publications/SearchToolbar";
import PublicationForm from "@/components/publications/PublicationForm";
import { usePublications } from "@/hooks/usePublications";

const PublicationsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
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
  } = usePublications();
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Publications</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Publication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Publication</DialogTitle>
                <DialogDescription>
                  Add details about your research publication.
                </DialogDescription>
              </DialogHeader>
              <PublicationForm
                title={title}
                setTitle={setTitle}
                authors={authors}
                setAuthors={setAuthors}
                journal={journal}
                setJournal={setJournal}
                publicationDate={publicationDate}
                setPublicationDate={setPublicationDate}
                doi={doi}
                setDoi={setDoi}
                grantId={grantId}
                setGrantId={setGrantId}
                grants={grants}
                handleAddPublication={handleAddPublication}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <SearchToolbar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Research Publications</CardTitle>
            <CardDescription>
              Publications resulting from grant-funded research projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PublicationsTable 
              publications={publications}
              searchTerm={searchTerm}
              loading={loading}
              formatDate={formatDate}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PublicationsPage;
