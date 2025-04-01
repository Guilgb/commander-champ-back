export interface UsersDto {
  id?: number;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}