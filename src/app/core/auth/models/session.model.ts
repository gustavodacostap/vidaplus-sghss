import { UserRole } from './User.model';

export interface Session {
  userId: string;
  role: UserRole;
  token: string;
}
