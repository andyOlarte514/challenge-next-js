export interface Project {
  id: number;
  name: string;
  owner: {
    email: string;
    name: string;
  };
  collaborators: any;
  notes: {
    id: number;
    title: string;
    content: string;
  }[];
}
