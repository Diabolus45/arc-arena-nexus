import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Users, Gamepad2, Bell, LogOut, Settings, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  if (!user) return null;

  return (
    <nav className="border-b border-border card-gradient">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/tournaments" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Tournaments</span>
            </Link>
            <Link 
              to="/teams" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Teams</span>
            </Link>
            <Link 
              to="/challenges" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Challenges</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* ARC Coins */}
            <div className="flex items-center space-x-1 bg-accent/10 px-3 py-1 rounded-full">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">{user.profile.arcCoins}</span>
            </div>

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