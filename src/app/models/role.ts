export enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
}

export interface Role {
  id: number;
  name: RoleEnum;
}