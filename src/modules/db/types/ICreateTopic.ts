export interface ICreateTopic {
  title: string;
  content: string;
  user_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateTopicUpdate {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number;
  updated_at: Date;
}