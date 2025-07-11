import { useAuth } from '@/contexts/AuthContext';
import { PlayerDashboard } from './PlayerDashboard';
import { TeamDashboard } from './TeamDashboard';

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Route to appropriate dashboard based on user role
  if (user.role === 'team') {
    return <TeamDashboard />;
  }
  
  // Default to player dashboard for players and creators
  return <PlayerDashboard />;
};