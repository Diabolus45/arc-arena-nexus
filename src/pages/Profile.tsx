import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Edit2, Trophy, Users, Star, Gamepad2, MapPin, Calendar, Shield, Camera, Settings, Lock, Bell, Eye, Plus, X } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: 'Competitive gamer passionate about FPS games. Always looking to improve and learn new strategies.',
    age: user?.profile.age || '',
    location: user?.profile.location || '',
    gamePreferences: user?.profile.gamePreferences || [],
    skillRoles: user?.profile.skillRoles || [],
    twitchHandle: '@ArcWarrior',
    discordTag: 'ArcWarrior#1337',
    privacySettings: {
      showEmail: false,
      showAge: true,
      showLocation: true,
      showStats: true,
    }
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile({
      age: formData.age ? Number(formData.age) : undefined,
      location: formData.location,
      gamePreferences: formData.gamePreferences,
      skillRoles: formData.skillRoles,
    });
    setIsEditing(false);
  };

  const gameStats = [
    { 
      game: 'Valorant', 
      rank: 'Immortal 2', 
      kd: '1.8', 
      winRate: '73%', 
      hoursPlayed: '1,240',
      peakRank: 'Radiant',
      currentSeason: 'Episode 8 Act 1'
    },
    { 
      game: 'CS2', 
      rank: 'Global Elite', 
      kd: '1.6', 
      winRate: '68%', 
      hoursPlayed: '890',
      peakRank: 'Global Elite',
      currentSeason: 'Competitive'
    },
    { 
      game: 'Apex Legends', 
      rank: 'Predator', 
      kd: '2.1', 
      winRate: '71%', 
      hoursPlayed: '650',
      peakRank: 'Apex Predator',
      currentSeason: 'Season 19'
    },
  ];

  const gameIds = [
    { game: 'Riot Games', platform: 'Valorant', username: 'ArcWarrior#1337', verified: true },
    { game: 'Steam', platform: 'CS2', username: 'arc_gamer_pro', verified: true },
    { game: 'Epic Games', platform: 'Fortnite', username: 'ArcChampion', verified: false },
    { game: 'EA', platform: 'Apex Legends', username: 'ArcMaster2024', verified: true },
  ];

  const recentMatches = [
    { game: 'Valorant', result: 'Win', score: '13-8', kd: '24/12/8', mvp: true, date: '2 hours ago' },
    { game: 'CS2', result: 'Loss', score: '14-16', kd: '18/15/4', mvp: false, date: '1 day ago' },
    { game: 'Valorant', result: 'Win', score: '13-5', kd: '28/9/12', mvp: true, date: '2 days ago' },
    { game: 'Apex Legends', result: 'Win', score: '#1/20', kd: '8/2/3', mvp: true, date: '3 days ago' },
  ];

  const addGamePreference = (game: string) => {
    if (!formData.gamePreferences.includes(game)) {
      setFormData(prev => ({
        ...prev,
        gamePreferences: [...prev.gamePreferences, game]
      }));
    }
  };

  const removeGamePreference = (game: string) => {
    setFormData(prev => ({
      ...prev,
      gamePreferences: prev.gamePreferences.filter(g => g !== game)
    }));
  };

  const addSkillRole = (role: string) => {
    if (!formData.skillRoles.includes(role)) {
      setFormData(prev => ({
        ...prev,
        skillRoles: [...prev.skillRoles, role]
      }));
    }
  };

  const removeSkillRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      skillRoles: prev.skillRoles.filter(r => r !== role)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="card-gradient border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="primary-gradient text-white text-3xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-bold primary-gradient bg-clip-text text-transparent">
                    {user.username}
                  </h1>
                  <Badge variant="secondary" className="text-sm">{user.role}</Badge>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Online</span>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-md">
                  {formData.bio}
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-medium">Level {user.profile.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="font-medium">{user.profile.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-success" />
                    <span className="font-medium">{user.profile.followers.length} Followers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{user.profile.following.length} Following</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "destructive" : "default"}>
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Game Stats</TabsTrigger>
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Details */}
            <div className="space-y-4">
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>
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
                      <Button onClick={handleSave} className="w-full primary-gradient">
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
                        <h4 className="font-medium mb-2 flex items-center justify-between">
                          Game Preferences
                          {isEditing && (
                            <Button size="sm" variant="ghost">
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.gamePreferences.map((game) => (
                            <Badge key={game} variant="outline" className="flex items-center space-x-1">
                              <span>{game}</span>
                              {isEditing && (
                                <X 
                                  className="w-3 h-3 cursor-pointer" 
                                  onClick={() => removeGamePreference(game)}
                                />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center justify-between">
                          Skill Roles
                          {isEditing && (
                            <Button size="sm" variant="ghost">
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.skillRoles.map((role) => (
                            <Badge key={role} variant="secondary" className="flex items-center space-x-1">
                              <span>{role}</span>
                              {isEditing && (
                                <X 
                                  className="w-3 h-3 cursor-pointer" 
                                  onClick={() => removeSkillRole(role)}
                                />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Twitch</span>
                    <span className="text-sm text-muted-foreground">{formData.twitchHandle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Discord</span>
                    <span className="text-sm text-muted-foreground">{formData.discordTag}</span>
                  </div>
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
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.profile.achievements.slice(0, 5).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Linked Game Accounts */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle>Linked Game Accounts</CardTitle>
                  <CardDescription>Your verified gaming accounts and IDs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {gameIds.map((gameId, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Gamepad2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{gameId.game}</p>
                              <Badge variant="outline" className="text-xs">{gameId.platform}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{gameId.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={gameId.verified ? "default" : "outline"}>
                            {gameId.verified ? "Verified" : "Pending"}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed">
                      <Plus className="w-4 h-4 mr-2" />
                      Link New Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <div className="grid gap-6">
            {gameStats.map((stat, index) => (
              <Card key={index} className="card-gradient border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Gamepad2 className="w-5 h-5" />
                      <span>{stat.game}</span>
                    </CardTitle>
                    <Badge className="primary-gradient text-lg px-3 py-1">{stat.rank}</Badge>
                  </div>
                  <CardDescription>Current Season: {stat.currentSeason} • Peak: {stat.peakRank}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{stat.kd}</p>
                      <p className="text-sm text-muted-foreground">K/D Ratio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{stat.winRate}</p>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{stat.hoursPlayed}</p>
                      <p className="text-sm text-muted-foreground">Hours Played</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">{stat.peakRank}</p>
                      <p className="text-sm text-muted-foreground">Peak Rank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matches" className="mt-6">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Your latest gaming sessions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{match.game}</span>
                          {match.mvp && <Badge variant="secondary">MVP</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-3">
                        <div>
                          <Badge variant={match.result === 'Win' ? 'default' : 'destructive'}>
                            {match.result}
                          </Badge>
                          <p className="text-sm mt-1">{match.score}</p>
                        </div>
                        <div>
                          <p className="font-medium">{match.kd}</p>
                          <p className="text-xs text-muted-foreground">K/D/A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Email</p>
                    <p className="text-sm text-muted-foreground">Display email on profile</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Age</p>
                    <p className="text-sm text-muted-foreground">Display age on profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Location</p>
                    <p className="text-sm text-muted-foreground">Display location on profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Game Stats</p>
                    <p className="text-sm text-muted-foreground">Display game statistics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Match Invites</p>
                    <p className="text-sm text-muted-foreground">Get notified of match requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Team Invitations</p>
                    <p className="text-sm text-muted-foreground">Get notified of team invites</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tournament Updates</p>
                    <p className="text-sm text-muted-foreground">Tournament announcements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Social Activity</p>
                    <p className="text-sm text-muted-foreground">Likes, follows, comments</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};