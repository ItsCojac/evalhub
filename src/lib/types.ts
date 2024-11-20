export interface List {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  categories: string[];
  is_public: boolean;
  _count?: {
    services: number;
    votes: number;
    collaborators: number;
  };
}

export interface Service {
  id: string;
  list_id: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  logo_url?: string;
  video_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  votes?: Vote[];
  comments?: Comment[];
  _count?: {
    votes: number;
    comments: number;
  };
}

export interface Vote {
  id: string;
  service_id: string;
  user_id: string;
  value: 1 | -1;
  created_at: string;
}

export interface Comment {
  id: string;
  service_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    full_name: string;
    avatar_url: string;
  };
}

export interface Collaborator {
  list_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  created_at: string;
  user?: {
    full_name: string;
    avatar_url: string;
  };
}