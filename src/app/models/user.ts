export interface User {
  id: number;
  username: string;
  email: string;
  civilite: number;
  roleId: number;
  role?: {
    id: number;
    name: string;
  };
}
