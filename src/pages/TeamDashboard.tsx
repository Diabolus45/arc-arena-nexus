import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Feed } from '@/components/feed/Feed';
import { Trophy, TrendingUp, Star, DollarSign, Calendar, Users, MessageSquare, Bell } from 'lucide-react';

export const TeamDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const teamStats = {
    totalWins: 45,
    winRate: 78,
    currentRank: 12,
    totalEarnings: 15000,
  };

  const upcomingMatches = [
    { opponent: 'Team Alpha', date: 'Dec 15', time: '7:00 PM', prize: '$2,000' },
    { opponent: 'Beta Squad', date: 'Dec 18', time: '8:30 PM', prize: '$5,000' },
  ];

  const quickActions = [
    { icon: Bell, label: 'Ping All Players', action: () => console.log('Ping players') },
    { icon: Calendar, label: 'Schedule Match', action: () => console.log('Schedule') },
    { icon: MessageSquare, label: 'Team Post', action: () => console.log('Post') },
    { icon: Users, label: 'Manage Roster', action: () => console.log('Roster') },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="card-gradient rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Team Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Stay updated with your team's latest activities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" size="sm" onClick={action.action}>
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Team Stats */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Wins</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{teamStats.totalWins}</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{teamStats.winRate}%</div>
              <p className="text-xs text-muted-foreground">+3% this month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">#{teamStats.currentRank}</div>
              <p className="text-xs text-muted-foreground">+3 positions</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${teamStats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+$2,500 this month</p>
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Matches</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                  <div className="font-medium text-sm">vs {match.opponent}</div>
                  <div className="text-xs text-muted-foreground">{match.date} at {match.time}</div>
                  <div className="text-sm text-primary mt-1">{match.prize} Prize Pool</div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <Trophy className="w-4 h-4 mr-2" />
                Register for Tournament
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3">
          <Feed />
        </div>
      </div>
    </div>
  );
};