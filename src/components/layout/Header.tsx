
import { useState } from "react";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  ChevronDown,
  LogOut
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState([
    {
      id: 1,
      title: "Grant submission deadline",
      message: "The NIH grant submission deadline is tomorrow.",
      time: "1h ago",
      read: false
    },
    {
      id: 2,
      title: "Grant approved",
      message: "Your HIV research grant has been approved!",
      time: "2d ago",
      read: true
    },
    {
      id: 3,
      title: "Review requested",
      message: "Dr. Johnson has requested a review on the malaria research proposal.",
      time: "3d ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-white">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search grants, documents..." 
            className="pl-10 bg-muted/40"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="outline" className="ml-2 py-0">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                    <div className={`w-full ${!notification.read ? 'font-medium' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{notification.title}</span>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full absolute right-3 top-4"></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center">
                  <span className="text-sm text-primary">View all notifications</span>
                </DropdownMenuItem>
              </>
            ) : (
              <div className="py-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{user?.name || "User"}</div>
                <div className="text-xs text-muted-foreground">
                  {user?.role === "researcher"
                    ? "Researcher"
                    : user?.role === "admin"
                    ? "Administrator"
                    : user?.role === "reviewer"
                    ? "Reviewer"
                    : user?.role === "finance"
                    ? "Finance Officer"
                    : "User"}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/settings')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Help & support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
