export type ICategory = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export type ICategoryCreate = {
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export type ICategoryUpdate = {
  id: number;
  name: string;
  description: string;
  updated_at: Date;
}
