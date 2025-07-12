import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Users, Gamepad2, MessageCircle, Bell, LogOut, Settings, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [notifications] = useState(3); // Mock notification count
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down & past threshold
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  if (!user) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-border card-gradient transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold primary-gradient bg-clip-text text-transparent">
              ARC
            </span>
          </Link>

          {/* Navigation Links - Role-based */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/tournaments" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Trophy className="w-4 h-4" />
              <span>Tournaments</span>
            </Link>
            
            {user.role === 'team' ? (
              <>
                <Link 
                  to="/team-profile" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/team-management" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span>Management</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/matchmaking" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>Matchmaking</span>
                </Link>
                <Link 
                  to="/challenges" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Challenges</span>
                </Link>
              </>
            )}
            
            <Link 
              to="/messages" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Messages</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* ARC Coins */}
            <Link to="/wallet">
              <div className="flex items-center space-x-1 bg-accent/10 px-3 py-1 rounded-full hover:bg-accent/20 transition-colors cursor-pointer">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">{user.profile.arcCoins}</span>
              </div>
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="primary-gradient text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      Level {user.profile.level} • {user.profile.xp} XP
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};