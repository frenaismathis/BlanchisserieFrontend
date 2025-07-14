import { Role } from './role';

export interface User {
  id: number;
  username: string;
  email: string;
  civilite: number;
  role: Role;
}
