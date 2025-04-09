
import { Session, User } from "@supabase/supabase-js";

export type UserRole = 'researcher' | 'admin' | 'reviewer' | 'institutional_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string | null;
  department: string | null;
}

export interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, role: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
