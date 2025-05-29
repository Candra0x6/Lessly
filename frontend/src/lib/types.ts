// Types used across the frontend application

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  tags?: string[];
  preview_url?: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  template_id: string | null;
}