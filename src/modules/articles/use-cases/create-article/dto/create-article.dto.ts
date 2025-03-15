export interface CreateArticleDto {
  content: string;
  title: string;
  user_id: number;
  topic_id: number;
  creted_at: Date;
  updated_at: Date;
}