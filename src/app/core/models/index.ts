export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readTime: number;
  file: string;
}
