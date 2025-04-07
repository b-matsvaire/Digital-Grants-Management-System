
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "egrant-auth-user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  
  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event);
        setSession(newSession);
        
        if (newSession?.user) {
          // Don't fetch profile immediately to prevent recursive calls
          setTimeout(() => {
            fetchUserProfile(newSession.user);
          }, 0);
        } else {
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    );
    
    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session:", currentSession);
        setSession(currentSession);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (authUser: User) => {
    try {
      // Fetch the user's profile to get role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', authUser.id)
        .single();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }
      
      const userData: UserProfile = {
        id: authUser.id,
        name: profile?.full_name || authUser.email?.split("@")[0] || "User",
        email: authUser.email || "",
        role: profile?.role || "researcher"
      };
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };
  
  const signUp = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        console.error("Sign up error:", error);
        throw error;
      }
      
      if (data.user) {
        console.log("Successfully signed up new user");
        
        // Wait for profile to be created by trigger
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update the profile with the role
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error("Error updating profile:", updateError);
        }
        
        const userData: UserProfile = {
          id: data.user.id,
          name: data.user.email?.split("@")[0] || "User",
          email: data.user.email || "",
          role
        };
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data.user) {
        console.log("Successfully logged in user");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setUser(null);
      setSession(null);
      
      // Add toast notification for successful logout
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const value = {
    user,
    session,
    isAuthenticated: !!session,
    login,
    logout,
    signUp
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
