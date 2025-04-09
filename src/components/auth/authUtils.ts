
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

const LOCAL_STORAGE_KEY = "egrant-auth-user";

export const fetchUserProfile = async (authUser: User): Promise<UserProfile | null> => {
  try {
    // Clear any cached user data to force a fresh fetch from the database
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Fetch the user's profile to get role
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, full_name, institution, department, email')
      .eq('id', authUser.id)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      
      // If there's an error fetching the profile, use data from auth.user as fallback
      const fallbackName = authUser.user_metadata?.full_name || 
                           authUser.email?.split("@")[0] || 
                           "User";
      
      const fallbackRole = authUser.user_metadata?.role || "researcher";
      
      const userData: UserProfile = {
        id: authUser.id,
        name: fallbackName,
        email: authUser.email || "",
        role: fallbackRole as UserProfile['role'],
        institution: null,
        department: null
      };
      
      console.log("Using fallback user profile:", userData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      return userData;
    }
    
    if (!profile) {
      console.warn("No profile found for user, using fallback data");
      const fallbackName = authUser.user_metadata?.full_name || 
                         authUser.email?.split("@")[0] || 
                         "User";
      
      const fallbackRole = authUser.user_metadata?.role || "researcher";
      
      const userData: UserProfile = {
        id: authUser.id,
        name: fallbackName,
        email: authUser.email || "",
        role: fallbackRole as UserProfile['role'],
        institution: null,
        department: null
      };
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      return userData;
    }
    
    const userData: UserProfile = {
      id: authUser.id,
      name: profile.full_name || authUser.email?.split("@")[0] || "User",
      email: profile.email || authUser.email || "",
      role: (profile.role as UserProfile['role']) || "researcher",
      institution: profile.institution || null,
      department: profile.department || null
    };
    
    console.log("User profile fetched:", userData);
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
