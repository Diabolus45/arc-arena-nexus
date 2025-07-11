import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Users, UserPlus, Trophy, Calendar, Briefcase, Clock, Settings, MessageSquare, Gamepad2, Bell } from 'lucide-react';

export const TeamProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const gameRosters = {
    valorant: [
      { name: 'ProPlayer1', role: 'IGL', status: 'Online', performance: 85 },
      { name: 'FragGod', role: 'Duelist', status: 'Online', performance: 92 },
      { name: 'SupportKing', role: 'Controller', status: 'Away', performance: 78 },
      { name: 'EntryFrag', role: 'Initiator', status: 'Offline', performance: 88 },
      { name: 'SentinelPro', role: 'Sentinel', status: 'Online', performance: 83 },
    ],
    cs2: [
      { name: 'AWPMaster', role: 'AWPer', status: 'Online', performance: 94 },
      { name: 'RifleKing', role: 'Rifler', status: 'Online', performance: 87 },
      { name: 'SupportGod', role: 'Support', status: 'Away', performance: 81 },
      { name: 'LurkerPro', role: 'Lurker', status: 'Online', performance: 89 },
    ],
    dota2: [
      { name: 'CarryLord', role: 'Carry', status: 'Online', performance: 91 },
      { name: 'MidGod', role: 'Mid', status: 'Online', performance: 86 },
      { name: 'SupportWiz', role: 'Support', status: 'Away', performance: 84 },
    ],
  };

  const teamStaff = [
    { name: 'Coach Mike', role: 'Head Coach', access: 'Full Access', status: 'Online' },
    { name: 'Analyst Sarah', role: 'Analyst', access: 'Limited Access', status: 'Online' },
    { name: 'Manager John', role: 'Team Manager', access: 'Admin Access', status: 'Away' },
  ];

  const scheduleEvents = [
    { event: 'Scrim vs Team Alpha', date: 'Dec 15', time: '6:00 PM', type: 'Practice' },
    { event: 'Strategy Review', date: 'Dec 16', time: '4:00 PM', type: 'Meeting' },
    { event: 'Tournament Match', date: 'Dec 18', time: '8:00 PM', type: 'Match' },
  ];

  const recruitmentPosts = [
    { position: 'Entry Fragger', game: 'Valorant', applications: 23, posted: '2 days ago' },
    { position: 'Support Player', game: 'CS2', applications: 15, posted: '1 week ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card-gradient rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Team Management
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
              <Bell className="w-4 h-4 mr-2" />
              Ping All Players
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Maker
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Team Post
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Game Rosters */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5" />
                <span>Game Rosters</span>
              </CardTitle>
              <CardDescription>
                Manage players across different games
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
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">{member.performance}%</div>
                            <div className="text-xs text-muted-foreground">Performance</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-3">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add {game.toUpperCase()} Player
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Active Recruitments</span>
              </CardTitle>
              <CardDescription>
                Manage your recruitment posts and applications
              </CardDescription>
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
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{post.applications} apps</Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <UserPlus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Staff Management */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Team Schedule</span>
              </CardTitle>
              <CardDescription>
                Manage team practices and matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduleEvents.map((event, index) => (
                <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.date} at {event.time}</div>
                    </div>
                    <Badge variant={event.type === 'Match' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <Calendar className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Team Staff</span>
              </CardTitle>
              <CardDescription>
                Manage staff members and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamStaff.map((staff, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      staff.status === 'Online' ? 'bg-green-500' : 
                      staff.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium text-sm">{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {staff.access}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Communication</span>
              </CardTitle>
              <CardDescription>
                Team communication tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Bell className="w-4 h-4 mr-2" />
                Ping All Players
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Team Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};