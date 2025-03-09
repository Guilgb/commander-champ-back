export type IRolePermissions = {
  role_id: number;
  permission_id: number;
  created_at: Date;
};

export type IRolePermissionsDelete = {
  role_id: number;
  permission_id: number;
};

export type IRolePermissionnsUpdate = {
  role_id: number;
  permission_id: number;
  new_role_id?: number;
  new_permission_id?: number;
  created_at: Date;
};