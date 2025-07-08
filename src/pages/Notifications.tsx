import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Trophy, Users, MessageCircle, Calendar, Settings, Check, X } from 'lucide-react';

export const Notifications = () => {
  const [notifications, setNotifications] = useState({
    all: [
      {
        id: 1,
        type: 'match',
        title: 'Match Request',
        message: 'Team Phoenix wants to challenge your team',
        time: '2 minutes ago',
        read: false,
        avatar: 'P'
      },
      {
        id: 2,
        type: 'achievement',
        title: 'New Achievement',
        message: 'You unlocked "Rising Star" achievement!',
        time: '1 hour ago',
        read: false,
        avatar: '🏆'
      },
      {
        id: 3,
        type: 'team',
        title: 'Team Invitation',
        message: 'ARC Legends invited you to join their roster',
        time: '3 hours ago',
        read: true,
        avatar: 'A'
      },
      {
        id: 4,
        type: 'tournament',
        title: 'Tournament Update',
        message: 'Valorant Championship brackets are now live',
        time: '5 hours ago',
        read: true,
        avatar: '🎮'
      },
      {
        id: 5,
        type: 'social',
        title: 'New Follower',
        message: 'ProGamer123 started following you',
        time: '1 day ago',
        read: true,
        avatar: 'P'
      },
    ],
    matches: [
      {
        id: 1,
        type: 'match',
        title: 'Match Request',
        message: 'Team Phoenix wants to challenge your team',
        time: '2 minutes ago',
        read: false,
        avatar: 'P'
      },
      {
        id: 6,
        type: 'match',
        title: 'Match Result',
        message: 'You won against Team Alpha! +50 ARC Coins',
        time: '2 days ago',
        read: true,
        avatar: '✓'
      },
    ],
    social: [
      {
        id: 5,
        type: 'social',
        title: 'New Follower',
        message: 'ProGamer123 started following you',
        time: '1 day ago',
        read: true,
        avatar: 'P'
      },
      {
        id: 7,
        type: 'social',
        title: 'Like',
        message: 'StreamerPro liked your recent achievement post',
        time: '3 days ago',
        read: true,
        avatar: 'S'
      },
    ],
    system: [
      {
        id: 4,
        type: 'tournament',
        title: 'Tournament Update',
        message: 'Valorant Championship brackets are now live',
        time: '5 hours ago',
        read: true,
        avatar: '🎮'
      },
      {
        id: 8,
        type: 'system',
        title: 'Maintenance Notice',
        message: 'Scheduled maintenance tonight from 2-4 AM',
        time: '1 week ago',
        read: true,
        avatar: '⚙️'
      },
    ]
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Trophy className="w-4 h-4" />;
      case 'team':
        return <Users className="w-4 h-4" />;
      case 'social':
        return <MessageCircle className="w-4 h-4" />;
      case 'tournament':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'text-primary';
      case 'team':
        return 'text-accent';
      case 'social':
        return 'text-success';
      case 'tournament':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const markAsRead = (notificationId: number, category: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      ),
      all: prev.all.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    }));
  };

  const markAllAsRead = (category: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].map(notif => ({ ...notif, read: true })),
      all: category === 'all' ? prev.all.map(notif => ({ ...notif, read: true })) : prev.all
    }));
  };

  const deleteNotification = (notificationId: number, category: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].filter(notif => notif.id !== notificationId),
      all: prev.all.filter(notif => notif.id !== notificationId)
    }));
  };

  const renderNotificationList = (notificationList: any[], category: keyof typeof notifications) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {notificationList.filter(n => !n.read).length} unread notifications
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => markAllAsRead(category)}
        >
          Mark all as read
        </Button>
      </div>
      
      {notificationList.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No notifications yet</p>
        </div>
      ) : (
        notificationList.map((notification) => (
          <Card 
            key={notification.id} 
            className={`card-gradient border-border transition-all hover:border-primary/50 ${
              !notification.read ? 'border-primary/30 bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="primary-gradient text-white text-sm">
                    {notification.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={getTypeColor(notification.type)}>
                      {getIcon(notification.type)}
                    </div>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                
                <div className="flex space-x-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id, category)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id, category)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {notification.type === 'match' && !notification.read && (
                <div className="flex space-x-2 mt-3 pt-3 border-t border-border">
                  <Button size="sm" className="primary-gradient">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm">
                    Decline
                  </Button>
                </div>
              )}
              
              {notification.type === 'team' && !notification.read && (
                <div className="flex space-x-2 mt-3 pt-3 border-t border-border">
                  <Button size="sm" className="primary-gradient">
                    Join Team
                  </Button>
                  <Button variant="outline" size="sm">
                    Decline
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated with your gaming activity</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>All</span>
            {notifications.all.filter(n => !n.read).length > 0 && (
              <Badge className="ml-1 px-1 py-0 text-xs">
                {notifications.all.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex items-center space-x-2">
            <Trophy className="w-4 h-4" />
            <span>Matches</span>
            {notifications.matches.filter(n => !n.read).length > 0 && (
              <Badge className="ml-1 px-1 py-0 text-xs">
                {notifications.matches.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Social</span>
            {notifications.social.filter(n => !n.read).length > 0 && (
              <Badge className="ml-1 px-1 py-0 text-xs">
                {notifications.social.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>System</span>
            {notifications.system.filter(n => !n.read).length > 0 && (
              <Badge className="ml-1 px-1 py-0 text-xs">
                {notifications.system.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderNotificationList(notifications.all, 'all')}
        </TabsContent>

        <TabsContent value="matches" className="mt-6">
          {renderNotificationList(notifications.matches, 'matches')}
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          {renderNotificationList(notifications.social, 'social')}
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          {renderNotificationList(notifications.system, 'system')}
        </TabsContent>
      </Tabs>
    </div>
  );
};