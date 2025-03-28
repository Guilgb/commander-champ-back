export interface IArticleCreate {
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  excerpt: string;
  read_time: string;
  views: number;
  comments: number;
  featured: boolean;
  cover_image: string;
  tags: string;
  created_at: Date;
  updated_at: Date;
}

export interface IArticleUpdate {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  excerpt: string;
  read_time: string;
  views: number;
  comments: number;
  featured: boolean;
  cover_image: string;
  tags: string;
  created_at: Date;
  updated_at: Date;
}