
import React from "react";
import { Grant } from "@/types/publication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

interface PublicationFormProps {
  title: string;
  setTitle: (value: string) => void;
  authors: string;
  setAuthors: (value: string) => void;
  journal: string;
  setJournal: (value: string) => void;
  publicationDate: string;
  setPublicationDate: (value: string) => void;
  doi: string;
  setDoi: (value: string) => void;
  grantId: string;
  setGrantId: (value: string) => void;
  grants: Grant[];
  handleAddPublication: (e: React.FormEvent) => Promise<void>;
}

const PublicationForm: React.FC<PublicationFormProps> = ({
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
  grants,
  handleAddPublication,
}) => {
  return (
    <form onSubmit={handleAddPublication}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="authors" className="text-right">
            Authors
          </Label>
          <Input
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="col-span-3"
            placeholder="e.g., Smith J, Johnson M, et al."
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="journal" className="text-right">
            Journal/Source
          </Label>
          <Input
            id="journal"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="publication-date" className="text-right">
            Publication Date
          </Label>
          <Input
            id="publication-date"
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="doi" className="text-right">
            DOI
          </Label>
          <Input
            id="doi"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            className="col-span-3"
            placeholder="e.g., 10.1000/xyz123"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="grant" className="text-right">
            Related Grant
          </Label>
          <select
            id="grant"
            value={grantId}
            onChange={(e) => setGrantId(e.target.value)}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select a grant</option>
            {grants.map((grant) => (
              <option key={grant.id} value={grant.id}>
                {grant.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save Publication</Button>
      </DialogFooter>
    </form>
  );
};

export default PublicationForm;
