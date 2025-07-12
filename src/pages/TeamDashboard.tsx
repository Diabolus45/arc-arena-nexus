import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Feed } from '@/components/feed/Feed';
import { Calendar, Trophy, Clock, MessageSquare } from 'lucide-react';

export const TeamDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const upcomingMatches = [
    { 
      opponent: 'Team Alpha', 
      date: 'Dec 15', 
      time: '7:00 PM', 
      game: 'Valorant',
      type: 'Scrim',
      status: 'Confirmed'
    },
    { 
      opponent: 'Beta Squad', 
      date: 'Dec 18', 
      time: '8:30 PM', 
      game: 'CS2',
      type: 'Tournament',
      status: 'Pending'
    },
    { 
      opponent: 'Pro Esports', 
      date: 'Dec 20', 
      time: '6:00 PM', 
      game: 'Dota 2',
      type: 'Match',
      status: 'Confirmed'
    },
  ];

  const todaySchedule = [
    { event: 'Valorant Practice', time: '4:00 PM', status: 'Upcoming' },
    { event: 'Strategy Review', time: '6:00 PM', status: 'Upcoming' },
    { event: 'Team Meeting', time: '8:00 PM', status: 'Scheduled' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="card-gradient rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              Team Home
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Stay updated with your team's latest activities and feed
            </p>
          </div>
          <Button className="primary-gradient text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Create Team Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar - Schedule & Matches */}
        <div className="lg:col-span-1 space-y-4">
          {/* Upcoming Matches */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Upcoming Matches</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">vs {match.opponent}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      match.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{match.date} at {match.time}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-primary">{match.game}</span>
                    <span className="text-xs text-accent">{match.type}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <Trophy className="w-4 h-4 mr-2" />
                Register for Tournament
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{item.event}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                    <span className="text-xs text-primary">{item.status}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3">
          <Feed />
        </div>
      </div>
    </div>
  );
};