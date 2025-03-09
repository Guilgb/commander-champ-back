export type IPermission = {
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export type IPermissionUpdate = {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}