
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/components/auth';
import AuthGuard from '@/components/guards/AuthGuard';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import MyGrants from '@/pages/MyGrants';
import AllGrants from '@/pages/AllGrants';
import GrantDetail from '@/pages/GrantDetail';
import SubmitGrant from '@/pages/SubmitGrant';
import ReviewGrants from '@/pages/ReviewGrants';
import Settings from '@/pages/Settings';
import IPManagement from '@/pages/IPManagement';
import FundingOpportunities from '@/pages/FundingOpportunities';
import { UserRole } from './components/auth/types';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with role-specific access */}
          <Route path="/" element={
            <AuthGuard>
              <Index />
            </AuthGuard>
          } />
          
          {/* Researcher routes */}
          <Route path="/my-grants" element={
            <AuthGuard allowedRoles={['researcher', 'admin', 'institutional_admin']}>
              <MyGrants />
            </AuthGuard>
          } />
          
          <Route path="/submit-grant" element={
            <AuthGuard allowedRoles={['researcher', 'admin']}>
              <SubmitGrant />
            </AuthGuard>
          } />
          
          {/* Admin & Reviewer routes */}
          <Route path="/all-grants" element={
            <AuthGuard allowedRoles={['admin', 'reviewer', 'institutional_admin']}>
              <AllGrants />
            </AuthGuard>
          } />
          
          <Route path="/review-grants" element={
            <AuthGuard allowedRoles={['admin', 'reviewer']}>
              <ReviewGrants />
            </AuthGuard>
          } />
          
          {/* Admin-only routes */}
          <Route path="/ip-management" element={
            <AuthGuard allowedRoles={['admin', 'institutional_admin']}>
              <IPManagement />
            </AuthGuard>
          } />
          
          {/* Common routes */}
          <Route path="/grants/:id" element={
            <AuthGuard>
              <GrantDetail />
            </AuthGuard>
          } />
          
          <Route path="/settings" element={
            <AuthGuard>
              <Settings />
            </AuthGuard>
          } />
          
          <Route path="/funding-opportunities" element={
            <AuthGuard>
              <FundingOpportunities />
            </AuthGuard>
          } />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
