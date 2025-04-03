export interface UpdateUserRoleDto {
  data: {
    user_id: number;
    role_name: string;
    new_role_name: string;
  }
}