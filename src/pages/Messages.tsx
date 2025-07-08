import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Users, Radio, Pin, Send, Plus, Settings } from 'lucide-react';

export const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  if (!user) return null;

  const dmChats = [
    { id: '1', name: 'ProGamer123', lastMessage: 'GG last match!', time: '2m ago', unread: 2, online: true },
    { id: '2', name: 'StreamerPro', lastMessage: 'Thanks for the follow', time: '1h ago', unread: 0, online: false },
    { id: '3', name: 'NewbieFan', lastMessage: 'Can you teach me?', time: '3h ago', unread: 1, online: true },
  ];

  const lobbyChats = [
    { id: 'team1', name: 'Phoenix Esports', lastMessage: 'Practice at 8 PM', time: '30m ago', unread: 3, pinned: true, type: 'team' },
    { id: 'group1', name: 'Valorant Squad', lastMessage: 'Who wants to queue?', time: '1h ago', unread: 1, pinned: false, type: 'group' },
    { id: 'group2', name: 'CS2 Scrims', lastMessage: 'Looking for IGL', time: '2h ago', unread: 0, pinned: false, type: 'group' },
  ];

  const broadcasts = [
    { id: 'arc1', name: 'ARC Official', lastMessage: 'New tournament rules updated', time: '1d ago', unread: 1, official: true },
    { id: 'tour1', name: 'Valorant Championship', lastMessage: 'Quarter-finals start tomorrow', time: '2h ago', unread: 2, official: false },
    { id: 'tour2', name: 'CS2 Weekly', lastMessage: 'Registration closing soon', time: '5h ago', unread: 0, official: false },
  ];

  const messages = [
    { id: '1', sender: 'ProGamer123', content: 'Great game yesterday!', time: '2:30 PM', isMe: false },
    { id: '2', sender: 'Me', content: 'Thanks! Your aim was insane', time: '2:32 PM', isMe: true },
    { id: '3', sender: 'ProGamer123', content: 'Want to queue together tonight?', time: '2:35 PM', isMe: false },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const ChatList = ({ chats, type }: { chats: any[], type: string }) => (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setSelectedChat(chat.id)}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            selectedChat === chat.id ? 'bg-primary/20' : 'hover:bg-secondary/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {chat.pinned && <Pin className="w-4 h-4 text-accent" />}
              <Avatar className="w-10 h-10">
                <AvatarFallback className={chat.official ? 'bg-accent text-white' : 'primary-gradient text-white'}>
                  {chat.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{chat.name}</span>
                  {type === 'dm' && chat.online && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {type === 'lobby' && chat.type === 'team' && (
                    <Badge variant="outline" className="text-xs">Team</Badge>
                  )}
                  {type === 'broadcast' && chat.official && (
                    <Badge className="text-xs bg-accent">Official</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{chat.time}</p>
              {chat.unread > 0 && (
                <Badge className="mt-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {chat.unread}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-muted-foreground">Stay connected with your team and community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="card-gradient border-border">
          <CardHeader className="pb-3">
            <Tabs defaultValue="dm" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dm" className="text-xs">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  DMs
                </TabsTrigger>
                <TabsTrigger value="lobby" className="text-xs">
                  <Users className="w-4 h-4 mr-1" />
                  Lobby
                </TabsTrigger>
                <TabsTrigger value="broadcast" className="text-xs">
                  <Radio className="w-4 h-4 mr-1" />
                  Broadcast
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dm" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Direct Messages</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <ChatList chats={dmChats} type="dm" />
              </TabsContent>
              
              <TabsContent value="lobby" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Groups & Teams</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <ChatList chats={lobbyChats.sort((a, b) => b.pinned ? 1 : -1)} type="lobby" />
              </TabsContent>
              
              <TabsContent value="broadcast" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Broadcasts</h3>
                  <Button size="sm" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <ChatList chats={broadcasts} type="broadcast" />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card className="card-gradient border-border h-full flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="primary-gradient text-white">
                        P
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">ProGamer123</h3>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.isMe
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="card-gradient border-border h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a chat to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};