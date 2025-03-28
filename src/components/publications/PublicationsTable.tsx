
import React from "react";
import { ExternalLink } from "lucide-react";
import { Publication } from "@/types/publication";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PublicationsTableProps {
  publications: Publication[];
  searchTerm: string;
  loading: boolean;
  formatDate: (dateString: string) => string;
}

const PublicationsTable: React.FC<PublicationsTableProps> = ({
  publications,
  searchTerm,
  loading,
  formatDate,
}) => {
  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading publications...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Publication Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Journal/Source</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPublications.length > 0 ? (
          filteredPublications.map((pub) => (
            <TableRow key={pub.id}>
              <TableCell className="font-medium max-w-[300px] truncate" title={pub.title}>
                {pub.title}
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={pub.authors}>
                {pub.authors}
              </TableCell>
              <TableCell>{pub.journal}</TableCell>
              <TableCell>{formatDate(pub.publication_date)}</TableCell>
              <TableCell>
                <Badge variant="outline">{pub.status}</Badge>
              </TableCell>
              <TableCell>
                {pub.doi ? (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> View
                    </a>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" /> View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              {searchTerm ? "No publications found matching your search." : "No publications added yet. Click 'Add Publication' to get started."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PublicationsTable;
