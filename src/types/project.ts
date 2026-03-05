export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  year: number;
  duration: string;
  client: string;
  role: string;
  liveUrl: string;
  githubUrl: string | null;
  technologies: string[];
  image: string;
  gallery: string[];
  content: string;
}

export interface ProjectFrontmatter {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  year: number;
  duration: string;
  client: string;
  role: string;
  liveUrl: string;
  githubUrl: string | null;
  technologies: string[];
  image: string;
  gallery: string[];
}
