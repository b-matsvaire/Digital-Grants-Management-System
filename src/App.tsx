
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import AuthGuard from "./components/guards/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MyGrants from "./pages/MyGrants";
import SubmitGrant from "./pages/SubmitGrant";
import GrantDetail from "./pages/GrantDetail";
import Calendar from "./pages/Calendar";
import TeamMembers from "./pages/TeamMembers";
import IPManagement from "./pages/IPManagement";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import FundingOpportunities from "./pages/FundingOpportunities";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/"
              element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              }
            />
            <Route 
              path="/my-grants" 
              element={
                <AuthGuard>
                  <MyGrants />
                </AuthGuard>
              } 
            />
            <Route 
              path="/submit-grant" 
              element={
                <AuthGuard>
                  <SubmitGrant />
                </AuthGuard>
              } 
            />
            <Route 
              path="/grants/:id" 
              element={
                <AuthGuard>
                  <GrantDetail />
                </AuthGuard>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <AuthGuard>
                  <Calendar />
                </AuthGuard>
              } 
            />
            <Route 
              path="/funding-opportunities" 
              element={
                <AuthGuard>
                  <FundingOpportunities />
                </AuthGuard>
              } 
            />
            <Route 
              path="/team" 
              element={
                <AuthGuard>
                  <TeamMembers />
                </AuthGuard>
              } 
            />
            <Route 
              path="/ip-management" 
              element={
                <AuthGuard>
                  <IPManagement />
                </AuthGuard>
              } 
            />
            <Route 
              path="/documents" 
              element={
                <AuthGuard>
                  <Documents />
                </AuthGuard>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
