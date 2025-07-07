import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Calendar, Users, DollarSign, Search, Filter } from 'lucide-react';

export const Tournaments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState('all');

  // Mock tournament data
  const tournaments = [
    {
      id: 1,
      name: 'ARC Valorant Championship',
      game: 'Valorant',
      format: '5v5',
      prizePool: '$5,000',
      verified: true,
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      participants: 128,
      maxParticipants: 128,
      status: 'open',
      description: 'The biggest Valorant tournament of the season',
      organizer: 'ARC Esports',
    },
    {
      id: 2,
      name: 'CS2 Weekly Championship',
      game: 'CS2',
      format: '5v5',
      prizePool: '$1,000',
      verified: true,
      startDate: '2024-12-18',
      endDate: '2024-12-18',
      participants: 45,
      maxParticipants: 64,
      status: 'open',
      description: 'Weekly CS2 tournament for all skill levels',
      organizer: 'Weekly Esports',
    },
    {
      id: 3,
      name: 'Apex Legends Duo Challenge',
      game: 'Apex Legends',
      format: '2v2',
      prizePool: '$750',
      verified: false,
      startDate: '2024-12-20',
      endDate: '2024-12-21',
      participants: 24,
      maxParticipants: 32,
      status: 'open',
      description: 'Fast-paced duo tournament',
      organizer: 'Apex Community',
    },
    {
      id: 4,
      name: 'Rocket League 3v3 Masters',
      game: 'Rocket League',
      format: '3v3',
      prizePool: '$2,000',
      verified: true,
      startDate: '2024-12-25',
      endDate: '2024-12-26',
      participants: 96,
      maxParticipants: 96,
      status: 'full',
      description: 'Elite Rocket League competition',
      organizer: 'RL Masters',
    },
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = filterGame === 'all' || tournament.game === filterGame;
    return matchesSearch && matchesGame;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-success text-success-foreground';
      case 'full': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
            Tournaments
          </h1>
          <p className="text-muted-foreground">Compete in the best esports tournaments</p>
        </div>
        <Button className="primary-gradient hover:opacity-90">
          <Trophy className="w-4 h-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-gradient border-border">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tournaments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterGame} onValueChange={setFilterGame}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                <SelectItem value="Valorant">Valorant</SelectItem>
                <SelectItem value="CS2">CS2</SelectItem>
                <SelectItem value="Apex Legends">Apex Legends</SelectItem>
                <SelectItem value="Rocket League">Rocket League</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTournaments.map((tournament) => (
          <Card key={tournament.id} className="card-gradient border-border hover:glow-effect transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{tournament.name}</span>
                    {tournament.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        Verified
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Organized by {tournament.organizer}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(tournament.status)}>
                  {tournament.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {tournament.description}
              </p>
              
              {/* Tournament Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm">{tournament.game}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">{tournament.prizePool}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-sm">
                    {tournament.participants}/{tournament.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-info" />
                  <span className="text-sm">{tournament.format}</span>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-muted-foreground">
                {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                disabled={tournament.status === 'full' || tournament.status === 'closed'}
                variant={tournament.status === 'open' ? 'default' : 'secondary'}
              >
                {tournament.status === 'open' && 'Join Tournament'}
                {tournament.status === 'full' && 'Tournament Full'}
                {tournament.status === 'closed' && 'Registration Closed'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <Card className="card-gradient border-border">
          <CardContent className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tournaments found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};