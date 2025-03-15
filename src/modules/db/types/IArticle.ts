export interface IArticleCreate {
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IArticleUpdate {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  updated_at: Date;
}