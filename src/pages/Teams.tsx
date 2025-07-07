import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Search, Plus, Trophy, TrendingUp, Star } from 'lucide-react';

export const Teams = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock teams data
  const teams = [
    {
      id: 1,
      name: 'Phoenix Gaming',
      logo: 'PG',
      game: 'Valorant',
      region: 'NA',
      members: 5,
      maxMembers: 7,
      rank: '#23',
      recruiting: true,
      description: 'Competitive Valorant team looking for skilled players',
      achievements: ['Regional Champions 2024', 'Top 8 Masters'],
      owner: 'PhoenixLeader',
    },
    {
      id: 2,
      name: 'Storm Riders',
      logo: 'SR',
      game: 'CS2',
      region: 'EU',
      members: 6,
      maxMembers: 8,
      rank: '#45',
      recruiting: true,
      description: 'Semi-professional CS2 team seeking dedicated players',
      achievements: ['ESL Challenger Winner', 'FACEIT Level 10 Team'],
      owner: 'StormCaptain',
    },
    {
      id: 3,
      name: 'Apex Legends',
      logo: 'AL',
      game: 'Apex Legends',
      region: 'AS',
      members: 3,
      maxMembers: 4,
      rank: '#12',
      recruiting: false,
      description: 'Elite Apex Legends squad',
      achievements: ['ALGS Champions', 'Multiple Tournament Wins'],
      owner: 'ApexMaster',
    },
    {
      id: 4,
      name: 'Rocket Force',
      logo: 'RF',
      game: 'Rocket League',
      region: 'NA',
      members: 4,
      maxMembers: 6,
      rank: '#67',
      recruiting: true,
      description: 'Rising Rocket League team with championship potential',
      achievements: ['Regional Qualifier', 'Diamond Rank Team'],
      owner: 'RocketPro',
    },
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
            Teams
          </h1>
          <p className="text-muted-foreground">Find your perfect team or create one</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Browse All
          </Button>
          <Button className="primary-gradient hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="card-gradient border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search teams by name or game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* User's Team (if any) */}
      {user?.team && (
        <Card className="card-gradient border-border glow-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Your Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="primary-gradient text-white text-xl">
                  {user.team.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{user.team.name}</h3>
                <p className="text-muted-foreground">Role: {user.team.role}</p>
                <Button className="mt-2" size="sm">
                  Manage Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="card-gradient border-border hover:glow-effect transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="primary-gradient text-white">
                      {team.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{team.name}</span>
                      {team.recruiting && (
                        <Badge className="bg-success text-success-foreground">
                          Recruiting
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {team.game} • {team.region} • {team.owner}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{team.rank}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {team.description}
              </p>
              
              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">
                      {team.members}/{team.maxMembers}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Trophy className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">{team.achievements.length}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Rising</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Trend</div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Recent Achievements</span>
                </h4>
                <div className="space-y-1">
                  {team.achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="text-xs bg-secondary/20 rounded px-2 py-1">
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  View Profile
                </Button>
                {team.recruiting && (
                  <Button 
                    size="sm" 
                    className="flex-1 primary-gradient hover:opacity-90"
                  >
                    Apply
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card className="card-gradient border-border">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No teams found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or create a new team
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};