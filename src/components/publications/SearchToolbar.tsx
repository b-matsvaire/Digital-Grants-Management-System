
import React from "react";
import { Search, Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search publications by title, author, journal, or project..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default SearchToolbar;
