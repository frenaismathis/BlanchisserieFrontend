import { Role } from './role';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  civilite: number;
  role: Role;
}
