import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Target, Trophy, Clock, Star, Gift } from 'lucide-react';

export const Challenges = () => {
  // Mock challenges data
  const dailyChallenges = [
    {
      id: 1,
      title: 'First Victory',
      description: 'Win your first match of the day',
      progress: 0,
      total: 1,
      reward: { type: 'coins', amount: 25 },
      difficulty: 'Easy',
      timeLeft: '18h 45m',
      game: 'Any',
    },
    {
      id: 2,
      title: 'Sharpshooter',
      description: 'Get 10 headshots in competitive matches',
      progress: 6,
      total: 10,
      reward: { type: 'xp', amount: 100 },
      difficulty: 'Medium',
      timeLeft: '18h 45m',
      game: 'Valorant',
    },
    {
      id: 3,
      title: 'Team Player',
      description: 'Play 3 matches with your team',
      progress: 1,
      total: 3,
      reward: { type: 'coins', amount: 50 },
      difficulty: 'Easy',
      timeLeft: '18h 45m',
      game: 'Any',
    },
  ];

  const weeklyChallenges = [
    {
      id: 4,
      title: 'Tournament Warrior',
      description: 'Participate in 5 tournaments',
      progress: 2,
      total: 5,
      reward: { type: 'badge', amount: 'Tournament Veteran' },
      difficulty: 'Hard',
      timeLeft: '4d 12h',
      game: 'Any',
    },
    {
      id: 5,
      title: 'Win Streak Master',
      description: 'Achieve a 10-game win streak',
      progress: 4,
      total: 10,
      reward: { type: 'coins', amount: 200 },
      difficulty: 'Hard',
      timeLeft: '4d 12h',
      game: 'Any',
    },
    {
      id: 6,
      title: 'Content Creator',
      description: 'Upload 5 highlight clips',
      progress: 3,
      total: 5,
      reward: { type: 'xp', amount: 500 },
      difficulty: 'Medium',
      timeLeft: '4d 12h',
      game: 'Any',
    },
  ];

  const completedChallenges = [
    {
      id: 7,
      title: 'Getting Started',
      description: 'Complete your first match',
      reward: { type: 'coins', amount: 10 },
      completedAt: '2 hours ago',
      game: 'Valorant',
    },
    {
      id: 8,
      title: 'Social Butterfly',
      description: 'Add 5 friends',
      reward: { type: 'xp', amount: 50 },
      completedAt: '1 day ago',
      game: 'Any',
    },
    {
      id: 9,
      title: 'Profile Complete',
      description: 'Fill out your complete profile',
      reward: { type: 'badge', amount: 'Profile Master' },
      completedAt: '2 days ago',
      game: 'Any',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coins': return <Gift className="w-4 h-4 text-accent" />;
      case 'xp': return <Star className="w-4 h-4 text-primary" />;
      case 'badge': return <Trophy className="w-4 h-4 text-warning" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const renderChallengeCard = (challenge: any, isCompleted = false) => (
    <Card key={challenge.id} className="card-gradient border-border hover:glow-effect transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <span>{challenge.title}</span>
            </CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {!isCompleted && challenge.difficulty && (
              <Badge className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
            )}
            {challenge.game && (
              <Badge variant="outline">{challenge.game}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCompleted && challenge.progress !== undefined && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{challenge.progress}/{challenge.total}</span>
            </div>
            <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
          </div>
        )}

        {challenge.timeLeft && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Time left: {challenge.timeLeft}</span>
          </div>
        )}

        {challenge.completedAt && (
          <div className="text-sm text-muted-foreground">
            Completed {challenge.completedAt}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getRewardIcon(challenge.reward.type)}
            <span className="text-sm font-medium">
              {challenge.reward.type === 'coins' && `${challenge.reward.amount} ARC Coins`}
              {challenge.reward.type === 'xp' && `${challenge.reward.amount} XP`}
              {challenge.reward.type === 'badge' && challenge.reward.amount}
            </span>
          </div>
          {!isCompleted && (
            <Button 
              size="sm" 
              variant={challenge.progress === challenge.total ? 'default' : 'outline'}
              disabled={challenge.progress !== challenge.total}
            >
              {challenge.progress === challenge.total ? 'Claim' : 'In Progress'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
          Challenges
        </h1>
        <p className="text-muted-foreground">Complete challenges to earn rewards and level up</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1/3</div>
            <p className="text-xs text-muted-foreground">Challenges completed today</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">0/3</div>
            <p className="text-xs text-muted-foreground">Weekly challenges completed</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
            <Star className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">47</div>
            <p className="text-xs text-muted-foreground">All-time completions</p>
          </CardContent>
        </Card>
      </div>

      {/* Challenges Tabs */}
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Challenges</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dailyChallenges.map(challenge => renderChallengeCard(challenge))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {weeklyChallenges.map(challenge => renderChallengeCard(challenge))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedChallenges.map(challenge => renderChallengeCard(challenge, true))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};