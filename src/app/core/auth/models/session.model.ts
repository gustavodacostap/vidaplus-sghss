import { UserRole } from './user.model';

export interface Session {
  userId: string;
  role: UserRole;
  token: string;
}
