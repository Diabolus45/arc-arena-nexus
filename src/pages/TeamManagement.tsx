import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Plus, Users, Trophy, Target, Bell, MessageSquare, UserPlus } from 'lucide-react';

export const TeamManagement = () => {
  const { user } = useAuth();

  if (!user) return null;

  const scheduleEvents = [
    { 
      event: 'Valorant Practice', 
      date: 'Dec 15', 
      time: '4:00 PM', 
      type: 'Practice',
      game: 'Valorant',
      participants: ['ProPlayer1', 'FragGod', 'SupportKing'],
      status: 'Scheduled'
    },
    { 
      event: 'Strategy Review', 
      date: 'Dec 16', 
      time: '6:00 PM', 
      type: 'Meeting',
      game: 'All Games',
      participants: ['All Team', 'Coach Mike'],
      status: 'Confirmed'
    },
    { 
      event: 'CS2 Scrim', 
      date: 'Dec 17', 
      time: '7:00 PM', 
      type: 'Scrim',
      game: 'CS2',
      participants: ['AWPMaster', 'RifleKing', 'SupportGod'],
      status: 'Pending'
    },
    { 
      event: 'Tournament Match', 
      date: 'Dec 18', 
      time: '8:00 PM', 
      type: 'Match',
      game: 'Valorant',
      participants: ['Full Roster'],
      status: 'Confirmed'
    },
  ];

  const recruitmentPosts = [
    { 
      position: 'Entry Fragger', 
      game: 'Valorant', 
      applications: 23, 
      posted: '2 days ago',
      requirements: 'Immortal+ Rank',
      status: 'Active'
    },
    { 
      position: 'Support Player', 
      game: 'CS2', 
      applications: 15, 
      posted: '1 week ago',
      requirements: 'Global Elite',
      status: 'Active'
    },
    { 
      position: 'Mid Laner', 
      game: 'Dota 2', 
      applications: 8, 
      posted: '3 days ago',
      requirements: 'Divine+',
      status: 'Reviewing'
    },
  ];

  const playerRecruitments = [
    {
      playerName: 'ShadowStrike',
      game: 'Valorant',
      rank: 'Radiant',
      role: 'Duelist',
      experience: '3 years pro experience',
      posted: '1 day ago',
      availability: 'Full-time',
      contact: 'Looking for tier 1 team'
    },
    {
      playerName: 'AimGod',
      game: 'CS2',
      rank: 'Global Elite',
      role: 'AWPer',
      experience: '5 years competitive',
      posted: '3 days ago',
      availability: 'Part-time',
      contact: 'Available for scrims'
    },
    {
      playerName: 'MidMaster',
      game: 'Dota 2',
      rank: 'Immortal',
      role: 'Mid Laner',
      experience: '2 years team experience',
      posted: '2 days ago',
      availability: 'Full-time',
      contact: 'Seeking serious team'
    },
    {
      playerName: 'SupportKing',
      game: 'Valorant',
      rank: 'Immortal 3',
      role: 'Controller',
      experience: '4 years gaming',
      posted: '5 days ago',
      availability: 'Flexible',
      contact: 'Team player mindset'
    },
    {
      playerName: 'CarryPro',
      game: 'Dota 2',
      rank: 'Divine',
      role: 'Carry',
      experience: '3 years competitive',
      posted: '1 week ago',
      availability: 'Full-time',
      contact: 'Ready to commit'
    },
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
              Schedule practices, manage recruitment, and coordinate team activities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="primary-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Schedule
            </Button>
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Post Recruitment
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule Maker</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        {/* Schedule Maker Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Schedule */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create New Schedule</span>
                </CardTitle>
                <CardDescription>
                  Schedule practices, scrims, meetings, and tournaments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input id="event-name" placeholder="e.g., Valorant Practice Session" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="practice">Practice</SelectItem>
                        <SelectItem value="scrim">Scrimmmage</SelectItem>
                        <SelectItem value="meeting">Team Meeting</SelectItem>
                        <SelectItem value="match">Tournament Match</SelectItem>
                        <SelectItem value="review">Strategy Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="game">Game</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select game" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="valorant">Valorant</SelectItem>
                        <SelectItem value="cs2">Counter-Strike 2</SelectItem>
                        <SelectItem value="dota2">Dota 2</SelectItem>
                        <SelectItem value="all">All Games</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants">Participants</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select participants" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="all-team">Full Team</SelectItem>
                      <SelectItem value="valorant-roster">Valorant Roster</SelectItem>
                      <SelectItem value="cs2-roster">CS2 Roster</SelectItem>
                      <SelectItem value="dota2-roster">Dota 2 Roster</SelectItem>
                      <SelectItem value="staff-only">Staff Only</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full primary-gradient text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create & Send Invites
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Schedule */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Schedule</span>
                </CardTitle>
                <CardDescription>
                  Manage and track all scheduled team activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scheduleEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-muted-foreground">{event.date} at {event.time}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === 'Confirmed' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary">{event.game}</span>
                      <span className="text-muted-foreground">{event.type}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Participants: {event.participants.join(', ')}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Create Recruitment Post */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Create Recruitment Post</span>
                </CardTitle>
                <CardDescription>
                  Post new openings to find talented players
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="e.g., Entry Fragger, Support Player" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="game-recruit">Game</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select game" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="valorant">Valorant</SelectItem>
                        <SelectItem value="cs2">Counter-Strike 2</SelectItem>
                        <SelectItem value="dota2">Dota 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank-req">Rank Requirement</Label>
                    <Input id="rank-req" placeholder="e.g., Immortal+, Global Elite" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Additional Requirements</Label>
                  <Input id="requirements" placeholder="e.g., Experience, Age, Availability" />
                </div>

                <Button className="w-full primary-gradient text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Post Recruitment
                </Button>
              </CardContent>
            </Card>

            {/* Active Recruitments */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Active Recruitment Posts</span>
                </CardTitle>
                <CardDescription>
                  Monitor applications and manage recruitment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recruitmentPosts.map((post, index) => (
                  <div key={index} className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{post.position}</div>
                        <div className="text-sm text-muted-foreground">{post.game} • {post.requirements}</div>
                        <div className="text-xs text-muted-foreground">{post.posted}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.status === 'Active' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{post.applications} applications</Badge>
                      <Button variant="outline" size="sm">
                        Review Applications
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  View All Recruitment Posts
                </Button>
              </CardContent>
            </Card>

            {/* Player Recruitments */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Player Recruitments</span>
                </CardTitle>
                <CardDescription>
                  Browse players looking for teams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {playerRecruitments.map((player, index) => (
                  <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{player.playerName}</div>
                        <div className="text-sm text-muted-foreground">{player.game} • {player.role}</div>
                        <div className="text-xs text-muted-foreground">{player.posted}</div>
                      </div>
                      <Badge variant="outline">{player.rank}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {player.experience} • {player.availability}
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      {player.contact}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1 primary-gradient text-white">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Browse All Players
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Communications */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Team Communication</span>
                </CardTitle>
                <CardDescription>
                  Send announcements and coordinate with team members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full primary-gradient text-white">
                  <Bell className="w-4 h-4 mr-2" />
                  Ping All Players
                </Button>
                
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Team Announcement
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Schedule Team Meeting
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Tournament Registration Reminder
                </Button>
              </CardContent>
            </Card>

            {/* Communication History */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Communications</span>
                </CardTitle>
                <CardDescription>
                  Track team communications and announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-sm">Practice Schedule Updated</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Sent to: All Team Members</div>
                </div>

                <div className="p-3 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-sm">Tournament Registration Open</div>
                    <div className="text-xs text-muted-foreground">Yesterday</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Sent to: Valorant Roster</div>
                </div>

                <div className="p-3 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-sm">New Player Welcome</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Sent to: All Team Members</div>
                </div>

                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  View Communication History
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};