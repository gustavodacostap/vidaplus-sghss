import { User } from '../../../../core/auth/models/user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
