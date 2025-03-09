export type IRolesCreate = {
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export type IRolesUpdate = {
  id: number,
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}