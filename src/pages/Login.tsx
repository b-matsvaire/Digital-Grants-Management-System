
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { login, signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("researcher");
  
  // Get the path to redirect to after login
  const from = location.state?.from?.pathname || "/";

  // Check if already logged in
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setCheckingAuth(false);
      if (isAuthenticated) {
        navigate(from, { replace: true });
      }
    }, 500);

    return () => clearTimeout(checkAuth);
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password, role, fullName);
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now login.",
      });
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center">
        <div className="flex-1 p-8 hidden md:block">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              E-Grant Management System
            </h1>
            <p className="text-lg mt-2 text-muted-foreground">
              Africa University Clinical Research Centre
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 7v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path><polyline points="3 7 12 13 21 7"></polyline></svg>
              </div>
              <div>
                <h3 className="font-medium">Apply for Grants</h3>
                <p className="text-sm text-muted-foreground">Submit and track grant applications seamlessly</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 11v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8"></path><path d="M20 11V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v4"></path><rect x="8" y="11" width="8" height="8"></rect></svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Research</h3>
                <p className="text-sm text-muted-foreground">Organize your research portfolio efficiently</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Monitor grant status and manage deliverables</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Sign in or create an account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input 
                        id="register-name" 
                        placeholder="Enter your full name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="Create a password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="researcher">Researcher</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="institutional_admin">Institutional Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              {activeTab === "login" ? 
                "Don't have an account? Click Register above." : 
                "Already have an account? Click Login above."
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
