import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Star, Calendar, Target, UserPlus, MessageCircle } from 'lucide-react';

export const TeamDetail = () => {
  const { teamId } = useParams();
  const [isApplying, setIsApplying] = useState(false);

  // Mock team data
  const team = {
    id: teamId,
    name: 'Phoenix Esports',
    logo: 'PE',
    description: 'Professional esports organization focused on tactical FPS games',
    region: 'Asia Pacific',
    founded: '2022',
    members: 24,
    achievements: ['Valorant Champions 2023', 'CS2 Major Winner', 'IEM Champion'],
    socialLinks: {
      twitter: '@PhoenixEsports',
      instagram: '@phoenix_esports',
      youtube: 'Phoenix Esports Official'
    },
    recruiting: true
  };

  const rosters = [
    {
      game: 'Valorant',
      players: [
        { name: 'PhoenixAce', role: 'Duelist', country: 'IN', rating: 2400 },
        { name: 'SmokeKing', role: 'Controller', country: 'PK', rating: 2350 },
        { name: 'FlashMaster', role: 'Initiator', country: 'BD', rating: 2300 },
        { name: 'WallHacker', role: 'Sentinel', country: 'LK', rating: 2250 },
        { name: 'IGL_Phoenix', role: 'IGL', country: 'IN', rating: 2200 }
      ]
    },
    {
      game: 'CS2',
      players: [
        { name: 'HeadshotKing', role: 'AWPer', country: 'IN', rating: 1800 },
        { name: 'SprayControl', role: 'Rifler', country: 'PK', rating: 1750 },
        { name: 'EntryFragger', role: 'Entry', country: 'BD', rating: 1700 },
        { name: 'SupportGod', role: 'Support', country: 'IN', rating: 1650 },
        { name: 'StratCaller', role: 'IGL', country: 'LK', rating: 1600 }
      ]
    }
  ];

  const tournaments = [
    { name: 'Valorant Champions 2023', placement: '1st', prize: '$50,000', date: 'Nov 2023' },
    { name: 'CS2 Major Stockholm', placement: '1st', prize: '$100,000', date: 'Oct 2023' },
    { name: 'IEM Katowice', placement: '2nd', prize: '$30,000', date: 'Sep 2023' },
    { name: 'VCT Masters', placement: '3rd', prize: '$15,000', date: 'Aug 2023' },
  ];

  const teamPosts = [
    {
      id: '1',
      type: 'achievement',
      content: 'Phoenix Esports wins Valorant Champions 2023! 🏆',
      author: 'PhoenixAce',
      timestamp: '2 days ago',
      likes: 1245,
      comments: 89
    },
    {
      id: '2',
      type: 'announcement',
      content: 'Looking for a coach for our CS2 team. DM us if interested!',
      author: 'Team Manager',
      timestamp: '1 week ago',
      likes: 234,
      comments: 45
    },
    {
      id: '3',
      type: 'practice',
      content: 'Intense practice session before the finals. The grind never stops! 💪',
      author: 'SmokeKing',
      timestamp: '2 weeks ago',
      likes: 567,
      comments: 23
    }
  ];

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      // Show success message
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Team Header */}
      <Card className="card-gradient border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="primary-gradient text-white text-2xl font-bold">
                  {team.logo}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
                  {team.name}
                </h1>
                <p className="text-muted-foreground mt-2 max-w-md">{team.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{team.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Founded {team.founded}</span>
                  </div>
                  <Badge variant="outline">{team.region}</Badge>
                  {team.recruiting && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      Recruiting
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button onClick={handleApply} disabled={isApplying}>
                <UserPlus className="w-4 h-4 mr-2" />
                {isApplying ? 'Applying...' : 'Apply to Team'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="rosters" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rosters">Rosters</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="feed">Team Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="rosters" className="space-y-6">
          {rosters.map((roster) => (
            <Card key={roster.game} className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>{roster.game} Roster</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {roster.players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="primary-gradient text-white">
                            {player.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary">{player.rating}</div>
                        <div className="text-sm text-muted-foreground">{player.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Team Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-accent/10 rounded-lg text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="font-medium">{achievement}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Tournament History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.map((tournament, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                    <div>
                      <div className="font-medium">{tournament.name}</div>
                      <div className="text-sm text-muted-foreground">{tournament.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={tournament.placement === '1st' ? 'default' : 'outline'}
                        className={tournament.placement === '1st' ? 'bg-accent' : ''}
                      >
                        {tournament.placement}
                      </Badge>
                      <div className="text-sm text-primary mt-1">{tournament.prize}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feed" className="space-y-6">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>Team Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="primary-gradient text-white text-xs">
                            {post.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{post.author}</div>
                          <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.type}
                      </Badge>
                    </div>
                    <p className="mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};