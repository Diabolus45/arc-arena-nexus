import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Users, Gamepad2, TrendingUp, Star, Calendar, Award } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const nextLevelXP = (user.profile.level + 1) * 1000;
  const progressPercentage = (user.profile.xp / nextLevelXP) * 100;

  // Mock data
  const recentMatches = [
    { game: 'Valorant', result: 'Win', score: '13-8', date: '2 hours ago' },
    { game: 'CS2', result: 'Loss', score: '14-16', date: '1 day ago' },
    { game: 'Valorant', result: 'Win', score: '13-5', date: '2 days ago' },
  ];

  const upcomingTournaments = [
    { name: 'ARC Valorant Championship', date: 'Dec 15', prize: '$5,000' },
    { name: 'CS2 Weekly', date: 'Dec 18', prize: '$1,000' },
  ];

  const activeChallenges = [
    { name: 'Win 5 Matches', progress: 3, total: 5, reward: '50 ARC Coins' },
    { name: 'Get 20 Kills', progress: 15, total: 20, reward: '100 XP' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="card-gradient rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Welcome back, {user.username}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to dominate the competition today?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{user.profile.level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.profile.arcCoins}</div>
              <div className="text-sm text-muted-foreground">ARC Coins</div>
            </div>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Experience Points</span>
            <span>{user.profile.xp} / {nextLevelXP} XP</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">127</div>
              <p className="text-xs text-muted-foreground">+12 from last week</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">73%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">#42</div>
              <p className="text-xs text-muted-foreground">Global ranking</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Matches */}
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5" />
              <span>Recent Matches</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div>
                  <div className="font-medium">{match.game}</div>
                  <div className="text-sm text-muted-foreground">{match.date}</div>
                </div>
                <div className="text-right">
                  <Badge variant={match.result === 'Win' ? 'default' : 'destructive'}>
                    {match.result}
                  </Badge>
                  <div className="text-sm mt-1">{match.score}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements & Challenges */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user.profile.achievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="p-3 bg-primary/10 rounded-lg">
                  <div className="font-medium text-sm">{tournament.name}</div>
                  <div className="text-xs text-muted-foreground">{tournament.date}</div>
                  <div className="text-sm text-primary mt-1">{tournament.prize}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Challenges */}
      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Complete challenges to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map((challenge, index) => (
              <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{challenge.name}</h4>
                  <Badge variant="outline">{challenge.reward}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.total) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};