export interface UpdateArticleDto {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  creted_at: Date;
  updated_at: Date;
}