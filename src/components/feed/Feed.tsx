import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Trophy, Play, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  id: string;
  type: 'video' | 'achievement' | 'text';
  author: {
    username: string;
    avatar?: string;
    level: number;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  media?: string;
  achievement?: {
    title: string;
    game: string;
    points: number;
  };
}

export const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      type: 'achievement',
      author: { username: 'ProGamer123', level: 15 },
      content: 'Just hit Diamond rank in Valorant! The grind continues 💪',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: false,
      achievement: {
        title: 'Diamond Achieved',
        game: 'Valorant',
        points: 500
      }
    },
    {
      id: '2',
      type: 'video',
      author: { username: 'StreamerPro', level: 22 },
      content: 'Insane 1v5 clutch that won us the tournament! 🔥',
      timestamp: '4 hours ago',
      likes: 156,
      comments: 32,
      isLiked: true,
      media: '/api/placeholder/400/300'
    },
    {
      id: '3',
      type: 'text',
      author: { username: 'TeamCaptain', level: 18 },
      content: 'Looking for a support player for our CS2 team. DM if interested!',
      timestamp: '6 hours ago',
      likes: 12,
      comments: 5,
      isLiked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card className="card-gradient border-border">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="primary-gradient text-white">
                {user?.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-secondary/20 rounded-lg p-3 text-muted-foreground cursor-pointer hover:bg-secondary/30 transition-colors">
                What's on your mind, {user?.username}?
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-border">
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Video
            </Button>
            <Button variant="ghost" size="sm">
              <Trophy className="w-4 h-4 mr-2" />
              Achievement
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Team Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="card-gradient border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="primary-gradient text-white">
                    {post.author.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{post.author.username}</span>
                    <Badge variant="outline" className="text-xs">
                      Lv.{post.author.level}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {getPostIcon(post.type)}
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Follow</Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="mb-4">{post.content}</p>

            {/* Achievement Badge */}
            {post.achievement && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">{post.achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{post.achievement.game}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-accent">+{post.achievement.points}</div>
                    <div className="text-xs text-muted-foreground">XP</div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Thumbnail */}
            {post.media && (
              <div className="relative bg-secondary/20 rounded-lg aspect-video mb-4 flex items-center justify-center">
                <Play className="w-12 h-12 text-primary" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  2:34
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.isLiked ? 'text-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};