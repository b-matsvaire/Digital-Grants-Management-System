
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import GrantsList from "@/components/dashboard/GrantsList";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeGrants: 0,
    pendingApplications: 0,
    totalFunding: 0,
    upcomingDeadlines: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Different queries based on user role
        let grantsQuery = supabase.from('grants').select('*');
        
        if (user.role === 'researcher') {
          // Researchers only see their own grants
          grantsQuery = grantsQuery.eq('submitter_id', user.id);
        }
        
        // For admin and institutional_admin, we fetch all grants
        // For reviewers, we would typically fetch grants assigned to them
        
        const { data: grantsData, error: grantsError } = await grantsQuery;
        
        if (grantsError) throw grantsError;
        
        // Calculate stats based on the grants data
        let activeCount = 0;
        let pendingCount = 0;
        let totalAmount = 0;
        let deadlinesCount = 0;
        
        grantsData?.forEach(grant => {
          if (grant.status === 'approved') {
            activeCount++;
            totalAmount += Number(grant.funding_amount);
          }
          
          if (grant.status === 'submitted' || grant.status === 'under_review') {
            pendingCount++;
          }
          
          // Check for upcoming deadlines (assuming there's an end_date field)
          if (grant.end_date) {
            const endDate = new Date(grant.end_date);
            const today = new Date();
            const inThirtyDays = new Date();
            inThirtyDays.setDate(today.getDate() + 30);
            
            if (endDate >= today && endDate <= inThirtyDays) {
              deadlinesCount++;
            }
          }
        });
        
        setStats({
          activeGrants: activeCount,
          pendingApplications: pendingCount,
          totalFunding: totalAmount,
          upcomingDeadlines: deadlinesCount
        });
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grant Administrator Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>As a Grant Administrator, you can manage grant applications, review submissions, track approvals, and monitor budgets.</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate('/all-grants')}>
                    View All Grants
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/review-grants')}>
                    Review Grant Applications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'reviewer':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviewer Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>As a Reviewer, you can evaluate and provide feedback on grant proposals.</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate('/review-grants')}>
                    Review Assigned Grants
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'institutional_admin':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Institutional Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>As an Institutional Admin, you have full oversight of the system, can manage access controls, and generate analytics and compliance reports.</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate('/all-grants')}>
                    View All Grants
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/user-management')}>
                    User Management
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/reports')}>
                    Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'researcher':
      default:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Researcher Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Welcome to your Researcher Dashboard. Here you can submit grant proposals, track progress of your applications, and upload necessary documents.</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate('/submit-grant')}>
                    Submit New Grant
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/my-grants')}>
                    View My Grants
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}</h1>
          <p className="text-muted-foreground">
            Africa University Clinical Research Centre - Grants Management System
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                {loading ? '...' : stats.activeGrants}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                {loading ? '...' : stats.pendingApplications}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                ${loading ? '...' : stats.totalFunding.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                {loading ? '...' : stats.upcomingDeadlines}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Role-specific content */}
        {getRoleSpecificContent()}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <GrantsList />
          </div>
          
          <div>
            <UpcomingDeadlines />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
