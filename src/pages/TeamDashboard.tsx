import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, UserPlus, Trophy, Calendar, Briefcase, DollarSign, TrendingUp, Star } from 'lucide-react';

export const TeamDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const teamStats = {
    totalWins: 45,
    winRate: 78,
    currentRank: 12,
    totalEarnings: 15000,
  };

  const teamMembers = [
    { name: 'ProPlayer1', role: 'IGL', status: 'Online', performance: 85 },
    { name: 'FragGod', role: 'AWPer', status: 'Online', performance: 92 },
    { name: 'SupportKing', role: 'Support', status: 'Away', performance: 78 },
    { name: 'EntryFrag', role: 'Entry', status: 'Offline', performance: 88 },
  ];

  const recruitmentPosts = [
    { position: 'Entry Fragger', game: 'Valorant', applications: 23, posted: '2 days ago' },
    { position: 'Support Player', game: 'CS2', applications: 15, posted: '1 week ago' },
  ];

  const upcomingMatches = [
    { opponent: 'Team Alpha', date: 'Dec 15', time: '7:00 PM', prize: '$2,000' },
    { opponent: 'Beta Squad', date: 'Dec 18', time: '8:30 PM', prize: '$5,000' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="card-gradient rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Team Management Hub
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your team, recruit players, and track performance
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="primary-gradient text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Post Recruitment
            </Button>
            <Button variant="outline">
              <Briefcase className="w-4 h-4 mr-2" />
              Manage Roster
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Team Stats */}
        <div className="space-y-4">
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
        </div>

        {/* Team Roster */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Roster</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      member.status === 'Online' ? 'bg-green-500' : 
                      member.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{member.performance}%</div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Active Recruitments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recruitmentPosts.map((post, index) => (
                <div key={index} className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{post.position}</div>
                      <div className="text-xs text-muted-foreground">{post.game}</div>
                      <div className="text-xs text-muted-foreground">{post.posted}</div>
                    </div>
                    <Badge variant="secondary">{post.applications} apps</Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                Create New Post
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Matches & Quick Actions */}
        <div className="space-y-4">
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
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Schedule Practice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                Register for Tournament
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="w-4 h-4 mr-2" />
                View Applications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Manage Contracts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};