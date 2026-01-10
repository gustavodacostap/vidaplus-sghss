import { User } from '../../../../core/auth/models/User.model';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
