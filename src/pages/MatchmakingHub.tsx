import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, Star, MapPin, Clock, Trophy, Gamepad2 } from 'lucide-react';

export const MatchmakingHub = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRank, setSelectedRank] = useState('');

  const games = ['Valorant', 'CS2', 'Apex Legends', 'Fortnite', 'PUBG'];
  const roles = {
    'Valorant': ['Duelist', 'Initiator', 'Controller', 'Sentinel'],
    'CS2': ['Entry Fragger', 'AWPer', 'Support', 'IGL', 'Lurker'],
    'Apex Legends': ['Assault', 'Defensive', 'Support', 'Recon'],
  };

  const players = [
    {
      id: '1',
      username: 'ProShooter',
      game: 'Valorant',
      role: 'Duelist',
      rank: 'Immortal 2',
      level: 25,
      winRate: 73,
      location: 'Mumbai',
      online: true,
      lookingFor: 'Competitive Team'
    },
    {
      id: '2',
      username: 'TacticalMind',
      game: 'CS2',
      role: 'IGL',
      rank: 'Global Elite',
      level: 28,
      winRate: 68,
      location: 'Delhi',
      online: false,
      lookingFor: 'Casual Squad'
    },
    {
      id: '3',
      username: 'SniperElite',
      game: 'Valorant',
      role: 'Sentinel',
      rank: 'Ascendant 3',
      level: 22,
      winRate: 71,
      location: 'Bangalore',
      online: true,
      lookingFor: 'Tournament Team'
    }
  ];

  const teams = [
    {
      id: '1',
      name: 'Shadow Wolves',
      game: 'Valorant',
      members: 4,
      avgRank: 'Immortal',
      lookingFor: ['Duelist'],
      region: 'South Asia',
      tournaments: 12,
      winRate: 75
    },
    {
      id: '2',
      name: 'Cyber Knights',
      game: 'CS2',
      members: 3,
      avgRank: 'Supreme',
      lookingFor: ['AWPer', 'Support'],
      region: 'India',
      tournaments: 8,
      winRate: 68
    },
    {
      id: '3',
      name: 'Elite Squad',
      game: 'Apex Legends',
      members: 2,
      avgRank: 'Predator',
      lookingFor: ['Support'],
      region: 'Asia Pacific',
      tournaments: 15,
      winRate: 82
    }
  ];

  const filteredPlayers = players.filter(player => {
    if (selectedGame && player.game !== selectedGame) return false;
    if (selectedRole && player.role !== selectedRole) return false;
    return true;
  });

  const filteredTeams = teams.filter(team => {
    if (selectedGame && team.game !== selectedGame) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent mb-2">
          Matchmaking Hub
        </h1>
        <p className="text-muted-foreground">
          Find teammates and join competitive teams
        </p>
      </div>

      {/* Filters */}
      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Find Your Match</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger>
                <SelectValue placeholder="Select Game" />
              </SelectTrigger>
              <SelectContent>
                {games.map(game => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRole} onValueChange={setSelectedRole} disabled={!selectedGame}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {selectedGame && roles[selectedGame as keyof typeof roles]?.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRank} onValueChange={setSelectedRank}>
              <SelectTrigger>
                <SelectValue placeholder="Rank Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronze+</SelectItem>
                <SelectItem value="silver">Silver+</SelectItem>
                <SelectItem value="gold">Gold+</SelectItem>
                <SelectItem value="platinum">Platinum+</SelectItem>
                <SelectItem value="diamond">Diamond+</SelectItem>
                <SelectItem value="immortal">Immortal+</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search username..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="players" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="players">Players ({filteredPlayers.length})</TabsTrigger>
          <TabsTrigger value="teams">Teams ({filteredTeams.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="card-gradient border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="primary-gradient text-white">
                            {player.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        {player.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{player.username}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{player.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Lv.{player.level}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Game</div>
                      <div className="font-medium">{player.game}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Role</div>
                      <div className="font-medium">{player.role}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Rank</div>
                      <div className="font-medium text-primary">{player.rank}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Win Rate</div>
                      <div className="font-medium text-success">{player.winRate}%</div>
                    </div>
                  </div>

                  <div className="bg-secondary/20 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground mb-1">Looking for</div>
                    <div className="text-sm font-medium">{player.lookingFor}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Users className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                    <Button variant="outline" size="sm">
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="card-gradient border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{team.name}</span>
                        <Badge variant="outline">{team.game}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{team.region}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Avg Rank</div>
                      <div className="font-semibold text-primary">{team.avgRank}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent">{team.members}/5</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{team.tournaments}</div>
                      <div className="text-xs text-muted-foreground">Tournaments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{team.winRate}%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="text-sm font-medium mb-2">Looking for:</div>
                    <div className="flex flex-wrap gap-1">
                      {team.lookingFor.map((role, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Trophy className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/team/${team.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        View Team
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};