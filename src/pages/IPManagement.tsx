import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Award, Copyright, BookOpen, Lock, Search, PenLine, TrashIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { IntellectualProperty } from "@/types/grants";
import { useToast } from "@/components/ui/use-toast";
import IPManagementForm from "@/components/ip/IPManagementForm";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IPItemWithGrant extends IntellectualProperty {
  grant_title?: string;
}

const IPManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ipItems, setIpItems] = useState<IPItemWithGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<IPItemWithGrant[]>([]);
  const [selectedIP, setSelectedIP] = useState<IPItemWithGrant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  useEffect(() => {
    fetchIPItems();
  }, [user]);
  
  useEffect(() => {
    if (searchTerm) {
      setFilteredItems(
        ipItems.filter(ip => 
          ip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ip.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredItems(ipItems);
    }
  }, [searchTerm, ipItems]);
  
  const fetchIPItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase.from('intellectual_property').select(`
        *,
        grants(title)
      `);
      
      if (user.role === 'researcher') {
        query = query.eq('grants.submitter_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const transformedData: IPItemWithGrant[] = data?.map(item => {
        const ip = item as unknown as IPItemWithGrant;
        if (item.grants) {
          ip.grant_title = item.grants.title;
        }
        return ip;
      }) || [];
      
      setIpItems(transformedData);
      setFilteredItems(transformedData);
    } catch (error) {
      console.error('Error fetching IP items:', error);
      toast({
        title: "Error",
        description: "Failed to load intellectual property items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteIP = async (id: string) => {
    try {
      const { error } = await supabase
        .from('intellectual_property')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "IP Deleted",
        description: "Intellectual property item has been deleted successfully.",
      });
      
      fetchIPItems();
    } catch (error: any) {
      console.error('Error deleting IP item:', error);
      toast({
        title: "Deletion Error",
        description: error.message || "Failed to delete intellectual property item. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const getIPTypeIcon = (type: string) => {
    switch (type) {
      case 'patent':
        return <Award className="h-4 w-4 mr-2" />;
      case 'copyright':
        return <Copyright className="h-4 w-4 mr-2" />;
      case 'trademark':
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'trade_secret':
        return <Lock className="h-4 w-4 mr-2" />;
      default:
        return <Award className="h-4 w-4 mr-2" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'approved':
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'registered':
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "";
    }
  };
  
  const formatIPType = (type: string) => {
    switch (type) {
      case 'trade_secret':
        return 'Trade Secret';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Intellectual Property Management</h1>
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button>Register New IP</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register Intellectual Property</DialogTitle>
              </DialogHeader>
              <IPManagementForm 
                onComplete={() => {
                  setShowAddForm(false);
                  fetchIPItems();
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search intellectual property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property Registry</CardTitle>
            <CardDescription>
              Manage your registered patents, copyrights, trademarks, and trade secrets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-6">
                <p>Loading intellectual property items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">No intellectual property items found</p>
                <Button onClick={() => setShowAddForm(true)}>Register Your First IP</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference Number</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Related Grant</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((ip) => (
                      <TableRow key={ip.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getIPTypeIcon(ip.type)}
                            {ip.title}
                          </div>
                        </TableCell>
                        <TableCell>{formatIPType(ip.type)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(ip.status)}>
                            {ip.status.charAt(0).toUpperCase() + ip.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{ip.reference_number || '-'}</TableCell>
                        <TableCell>
                          {ip.filing_date ? new Date(ip.filing_date).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {ip.grant_title || '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                setSelectedIP(ip);
                                setShowEditForm(true);
                              }}
                            >
                              <PenLine className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  <TrashIcon className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the 
                                    intellectual property record from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteIP(ip.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={showEditForm && selectedIP !== null} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Intellectual Property</DialogTitle>
          </DialogHeader>
          {selectedIP && (
            <IPManagementForm 
              ipData={selectedIP}
              grantId={selectedIP.grant_id}
              onComplete={() => {
                setShowEditForm(false);
                setSelectedIP(null);
                fetchIPItems();
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default IPManagement;
