export type IUserRoles = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
}

export type IUserRolesInput = {
  user_id: number;
  role_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export type IRemoveUserRolesInput = {
  user_id: number;
  role_id: number;
}

export type IUpdateUserRolesInput = {
  user_id: number; 
  role_name: string;
  new_role_name: string;
}