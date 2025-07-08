import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Edit2, Trophy, Users, Star, Gamepad2, MapPin, Calendar, Shield } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    age: user?.profile.age || '',
    location: user?.profile.location || '',
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile({
      age: formData.age ? Number(formData.age) : undefined,
      location: formData.location,
    });
    setIsEditing(false);
  };

  const gameStats = [
    { game: 'Valorant', rank: 'Immortal 2', kd: '1.8', winRate: '73%', hoursPlayed: '1,240' },
    { game: 'CS2', rank: 'Global Elite', kd: '1.6', winRate: '68%', hoursPlayed: '890' },
    { game: 'Apex Legends', rank: 'Predator', kd: '2.1', winRate: '71%', hoursPlayed: '650' },
  ];

  const gameIds = [
    { game: 'Valorant', username: 'ArcWarrior#1337', verified: true },
    { game: 'Steam', username: 'arc_gamer_pro', verified: true },
    { game: 'Epic Games', username: 'ArcChampion', verified: false },
    { game: 'Riot Games', username: 'ArcMaster2024', verified: true },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="card-gradient border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="primary-gradient text-white text-2xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold">{user.username}</h1>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span>Level {user.profile.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span>{user.profile.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-success" />
                    <span>{user.profile.followers.length} Followers</span>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter your location"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Age: {user.profile.age || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Location: {user.profile.location || 'Not specified'}</span>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Game Preferences</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.profile.gamePreferences.map((game) => (
                        <Badge key={game} variant="outline">{game}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Skill Roles</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.profile.skillRoles.map((role) => (
                        <Badge key={role} variant="secondary">{role}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Team */}
          {user.team && (
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Current Team</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{user.team.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.team.role}</p>
                  </div>
                  <Badge className="primary-gradient">{user.team.role}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Statistics */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5" />
                <span>Game Statistics</span>
              </CardTitle>
              <CardDescription>Your performance across different games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {gameStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{stat.game}</h4>
                      <Badge className="primary-gradient">{stat.rank}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">K/D Ratio</p>
                        <p className="font-medium text-success">{stat.kd}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Win Rate</p>
                        <p className="font-medium text-primary">{stat.winRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hours Played</p>
                        <p className="font-medium">{stat.hoursPlayed}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Linked Game IDs */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>Linked Game Accounts</CardTitle>
              <CardDescription>Your verified gaming accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gameIds.map((gameId, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Gamepad2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{gameId.game}</p>
                        <p className="text-sm text-muted-foreground">{gameId.username}</p>
                      </div>
                    </div>
                    <Badge variant={gameId.verified ? "default" : "outline"}>
                      {gameId.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};