
export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  publication_date: string;
  doi: string;
  status: string;
  grant_id: string;
}

export interface Grant {
  id: string;
  title: string;
}
