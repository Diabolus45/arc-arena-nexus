import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [selectedRole, setSelectedRole] = useState<'player' | 'team' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, selectedRole!);
      toast({
        title: "Login Successful",
        description: "Welcome back to ARC!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  const handleRoleSelect = (role: 'player' | 'team') => {
    setSelectedRole(role);
  };

  if (!selectedRole) {
    return (
      <Card className="w-full max-w-md card-gradient border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl primary-gradient bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>Choose how you want to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => handleRoleSelect('player')}
            className="w-full h-12 primary-gradient hover:opacity-90"
          >
            Player
          </Button>
          <Button 
            onClick={() => handleRoleSelect('team')}
            className="w-full h-12 secondary-gradient hover:opacity-90"
          >
            Team
          </Button>
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToRegister}
              className="text-muted-foreground"
            >
              Don't have an account? Register
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md card-gradient border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl primary-gradient bg-clip-text text-transparent">
          {selectedRole === 'player' ? 'Player Login' : 'Team Login'}
        </CardTitle>
        <CardDescription>Sign in to your ARC account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full primary-gradient hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="link"
              onClick={() => setSelectedRole(null)}
              className="text-muted-foreground p-0"
            >
              ← Back
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToRegister}
              className="text-muted-foreground p-0"
            >
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};