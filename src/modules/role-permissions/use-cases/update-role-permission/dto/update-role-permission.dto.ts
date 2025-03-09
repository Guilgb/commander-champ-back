export interface RolePermissionnsUpdateDto {
  role_id: number;
  permission_id: number;
  new_role_id?: number;
  new_permission_id?: number;
  created_at: Date;
};