
import { createContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "@supabase/supabase-js";
import { AuthContextType, UserProfile } from "./types";
import { fetchUserProfile, clearAuthData } from "./authUtils";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  
  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event);
        setSession(newSession);
        
        if (newSession?.user) {
          // Don't fetch profile immediately to prevent recursive calls
          setTimeout(async () => {
            const profile = await fetchUserProfile(newSession.user);
            if (profile) {
              console.log("Setting user profile:", profile);
              setUser(profile);
            }
          }, 0);
        } else {
          setUser(null);
          clearAuthData();
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
          const profile = await fetchUserProfile(currentSession.user);
          if (profile) {
            console.log("Setting initial user profile:", profile);
            setUser(profile);
          }
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
  
  const signUp = async (
    email: string, 
    password: string, 
    role: string, 
    fullName?: string
  ): Promise<boolean> => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        throw error;
      }
      
      if (data.user) {
        console.log("Successfully signed up new user");
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
      clearAuthData();
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
