import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Users, UserPlus, Trophy, Star, Award, Calendar, Briefcase, Settings, MessageSquare, Gamepad2, Target, Crown } from 'lucide-react';

export const TeamProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const gameRosters = {
    valorant: [
      { name: 'ProPlayer1', role: 'IGL', status: 'Online', performance: 85, joinDate: 'Jan 2024' },
      { name: 'FragGod', role: 'Duelist', status: 'Online', performance: 92, joinDate: 'Feb 2024' },
      { name: 'SupportKing', role: 'Controller', status: 'Away', performance: 78, joinDate: 'Mar 2024' },
      { name: 'EntryFrag', role: 'Initiator', status: 'Offline', performance: 88, joinDate: 'Apr 2024' },
      { name: 'SentinelPro', role: 'Sentinel', status: 'Online', performance: 83, joinDate: 'May 2024' },
    ],
    cs2: [
      { name: 'AWPMaster', role: 'AWPer', status: 'Online', performance: 94, joinDate: 'Jan 2024' },
      { name: 'RifleKing', role: 'Rifler', status: 'Online', performance: 87, joinDate: 'Feb 2024' },
      { name: 'SupportGod', role: 'Support', status: 'Away', performance: 81, joinDate: 'Mar 2024' },
      { name: 'LurkerPro', role: 'Lurker', status: 'Online', performance: 89, joinDate: 'Apr 2024' },
    ],
    dota2: [
      { name: 'CarryLord', role: 'Carry', status: 'Online', performance: 91, joinDate: 'Jan 2024' },
      { name: 'MidGod', role: 'Mid', status: 'Online', performance: 86, joinDate: 'Feb 2024' },
      { name: 'SupportWiz', role: 'Support', status: 'Away', performance: 84, joinDate: 'Mar 2024' },
    ],
  };

  const teamStaff = [
    { name: 'Coach Mike', role: 'Head Coach', access: 'Full Access', status: 'Online', specialization: 'Strategy' },
    { name: 'Analyst Sarah', role: 'Performance Analyst', access: 'Limited Access', status: 'Online', specialization: 'Data Analysis' },
    { name: 'Manager John', role: 'Team Manager', access: 'Admin Access', status: 'Away', specialization: 'Operations' },
    { name: 'Mental Coach Alex', role: 'Sports Psychologist', access: 'Limited Access', status: 'Online', specialization: 'Mental Health' },
  ];

  const achievements = [
    { title: 'VCT Champions 2024', position: '2nd Place', prize: '$50,000', date: 'Nov 2024' },
    { title: 'Regional League Winner', position: '1st Place', prize: '$25,000', date: 'Oct 2024' },
    { title: 'Summer Tournament', position: '3rd Place', prize: '$10,000', date: 'Aug 2024' },
    { title: 'Spring Championship', position: '1st Place', prize: '$30,000', date: 'May 2024' },
  ];

  const tournamentsParticipated = [
    { name: 'VCT Champions 2024', result: '2nd Place', earnings: '$50,000' },
    { name: 'Masters Madrid', result: 'Top 8', earnings: '$15,000' },
    { name: 'Regional Qualifiers', result: '1st Place', earnings: '$25,000' },
    { name: 'IEM Katowice', result: 'Top 4', earnings: '$20,000' },
    { name: 'ESL One', result: '3rd Place', earnings: '$12,000' },
  ];

  const playersRecruited = [
    { name: 'ProPlayer1', role: 'IGL', recruitedDate: 'Jan 2024', recruitedFrom: 'Free Agent' },
    { name: 'FragGod', role: 'Duelist', recruitedDate: 'Feb 2024', recruitedFrom: 'Team Sigma' },
    { name: 'AWPMaster', role: 'AWPer', recruitedDate: 'Jan 2024', recruitedFrom: 'Academy Team' },
    { name: 'SupportKing', role: 'Controller', recruitedDate: 'Mar 2024', recruitedFrom: 'Team Beta' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card-gradient rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Team Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete overview of team members, staff, achievements and tournament history
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="primary-gradient text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Post Recruitment
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Team Settings
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="rosters" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="rosters">Rosters</TabsTrigger>
          <TabsTrigger value="staff">Staff & Settings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Team Posts</span>
              </CardTitle>
              <CardDescription>
                Create and manage team posts, announcements and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="primary-gradient text-white w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Valorant Championship Win!</div>
                      <div className="text-sm text-muted-foreground">Posted 2 hours ago</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Amazing victory against Team Alpha! Our coordination was perfect and everyone played their best roles.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>👍 45 likes</span>
                    <span>💬 12 comments</span>
                    <span>🔄 8 shares</span>
                  </div>
                </div>

                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">New Player Recruitment</div>
                      <div className="text-sm text-muted-foreground">Posted yesterday</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Welcome FragGod to our Valorant roster! Looking forward to dominating the upcoming tournaments.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>👍 32 likes</span>
                    <span>💬 8 comments</span>
                    <span>🔄 5 shares</span>
                  </div>
                </div>

                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Training Schedule Update</div>
                      <div className="text-sm text-muted-foreground">Posted 3 days ago</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Updated practice schedule for this week. Check your calendars and be ready for intense sessions!
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>👍 28 likes</span>
                    <span>💬 5 comments</span>
                    <span>🔄 3 shares</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Game Rosters Tab */}
        <TabsContent value="rosters" className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5" />
                <span>Game Rosters</span>
              </CardTitle>
              <CardDescription>
                Team members organized by different games and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="valorant" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="valorant">Valorant</TabsTrigger>
                  <TabsTrigger value="cs2">CS2</TabsTrigger>
                  <TabsTrigger value="dota2">Dota 2</TabsTrigger>
                </TabsList>
                
                {Object.entries(gameRosters).map(([game, members]) => (
                  <TabsContent key={game} value={game} className="space-y-3">
                    {members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            member.status === 'Online' ? 'bg-green-500' : 
                            member.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.role} • Joined {member.joinDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">{member.performance}%</div>
                            <div className="text-xs text-muted-foreground">Performance</div>
                          </div>
                          <Badge variant="outline">{member.status}</Badge>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add {game.toUpperCase()} Player
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff & Settings Tab */}
        <TabsContent value="staff" className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Team Staff</span>
              </CardTitle>
              <CardDescription>
                Staff members with their roles and access levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamStaff.map((staff, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      staff.status === 'Online' ? 'bg-green-500' : 
                      staff.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-sm text-muted-foreground">{staff.role} • {staff.specialization}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{staff.access}</Badge>
                    <Badge variant="secondary">{staff.status}</Badge>
                    <Button variant="outline" size="sm">
                      Edit Access
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </CardContent>
          </Card>

          {/* Team Settings */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Team Settings</span>
              </CardTitle>
              <CardDescription>
                Configure team preferences and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Team Privacy</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Control who can view team information</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">Communication</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Set up team communication channels</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">Tournament Settings</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Configure tournament preferences</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">Role Permissions</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Manage staff and player permissions</span>
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Players
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Team Announcement
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trophy className="w-4 h-4 mr-2" />
                    Register Tournament
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Team Achievements</span>
              </CardTitle>
              <CardDescription>
                Tournament wins, player recruitment history, and tournament participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="wins" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="wins">Achievements</TabsTrigger>
                  <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                  <TabsTrigger value="recruited">Recruited</TabsTrigger>
                </TabsList>

                <TabsContent value="wins" className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          achievement.position.includes('1st') ? 'bg-yellow-500/20' : 
                          achievement.position.includes('2nd') ? 'bg-gray-400/20' : 'bg-amber-600/20'
                        }`}>
                          {achievement.position.includes('1st') ? <Crown className="w-5 h-5 text-yellow-500" /> : 
                           achievement.position.includes('2nd') ? <Award className="w-5 h-5 text-gray-400" /> : 
                           <Star className="w-5 h-5 text-amber-600" />}
                        </div>
                        <div>
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.position} • {achievement.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-500">{achievement.prize}</div>
                        <div className="text-xs text-muted-foreground">Prize Money</div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="tournaments" className="space-y-4">
                  {tournamentsParticipated.map((tournament, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div>
                        <div className="font-medium">{tournament.name}</div>
                        <div className="text-sm text-muted-foreground">Result: {tournament.result}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-500">{tournament.earnings}</div>
                        <div className="text-xs text-muted-foreground">Earnings</div>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">$122,000</div>
                      <div className="text-sm text-muted-foreground">Total Tournament Earnings</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recruited" className="space-y-4">
                  {playersRecruited.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.role} • Recruited from {player.recruitedFrom}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{player.recruitedDate}</div>
                        <div className="text-xs text-muted-foreground">Recruitment Date</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <UserPlus className="w-4 h-4 mr-2" />
                    View All Recruitment Posts
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};