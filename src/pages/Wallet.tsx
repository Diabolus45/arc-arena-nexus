import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Coins, ArrowUpRight, ArrowDownLeft, CreditCard, Gift, Trophy, TrendingUp, Wallet as WalletIcon, Plus, Send } from 'lucide-react';

export const Wallet = () => {
  const { user } = useAuth();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'earned',
      amount: 50,
      description: 'Tournament Victory - Valorant Championship',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'spent',
      amount: -25,
      description: 'Team Registration Fee',
      date: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earned',
      amount: 100,
      description: 'Achievement Bonus - Rising Star',
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'deposit',
      amount: 200,
      description: 'Wallet Deposit via Credit Card',
      date: '3 days ago',
      status: 'completed'
    },
    {
      id: 5,
      type: 'earned',
      amount: 30,
      description: 'Challenge Completion Reward',
      date: '5 days ago',
      status: 'completed'
    },
    {
      id: 6,
      type: 'withdraw',
      amount: -150,
      description: 'Withdrawal to Bank Account',
      date: '1 week ago',
      status: 'pending'
    },
  ];

  const rewards = [
    {
      id: 1,
      title: 'Daily Login Bonus',
      description: 'Login daily to earn ARC Coins',
      reward: '5 ARC Coins',
      type: 'daily',
      claimed: false
    },
    {
      id: 2,
      title: 'Weekly Challenge',
      description: 'Win 10 matches this week',
      reward: '50 ARC Coins',
      type: 'weekly',
      progress: '7/10',
      claimed: false
    },
    {
      id: 3,
      title: 'Monthly Tournament',
      description: 'Participate in monthly tournament',
      reward: '500 ARC Coins',
      type: 'monthly',
      claimed: true
    },
    {
      id: 4,
      title: 'Referral Bonus',
      description: 'Invite friends to earn rewards',
      reward: '25 ARC Coins',
      type: 'referral',
      claimed: false
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case 'spent':
        return <ArrowUpRight className="w-4 h-4 text-destructive" />;
      case 'deposit':
        return <Plus className="w-4 h-4 text-primary" />;
      case 'withdraw':
        return <Send className="w-4 h-4 text-warning" />;
      default:
        return <Coins className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned':
      case 'deposit':
        return 'text-success';
      case 'spent':
      case 'withdraw':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Wallet Header */}
      <div className="card-gradient rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              ARC Wallet
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your ARC Coins and transactions
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{user.profile.arcCoins}</div>
                <div className="text-sm text-muted-foreground">ARC Coins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4 mt-6">
          <Button className="primary-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Deposit
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
          <Button variant="outline">
            <Gift className="w-4 h-4 mr-2" />
            Send Gift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="space-y-4">
          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1,240</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">320</div>
              <p className="text-xs text-muted-foreground">Tournament fees & more</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <WalletIcon className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">150</div>
              <p className="text-xs text-muted-foreground">Withdrawal pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="deposit">Deposit/Withdraw</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent ARC Coin transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} ARC
                          </p>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Claim your daily, weekly, and special rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {rewards.map((reward) => (
                      <div key={reward.id} className="p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
                              <Gift className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{reward.title}</h4>
                              <p className="text-sm text-muted-foreground">{reward.description}</p>
                              {reward.progress && (
                                <p className="text-xs text-primary mt-1">Progress: {reward.progress}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-accent mb-2">{reward.reward}</p>
                            <Button 
                              size="sm" 
                              disabled={reward.claimed}
                              className={reward.claimed ? "" : "primary-gradient"}
                            >
                              {reward.claimed ? 'Claimed' : 'Claim'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deposit" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-gradient border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Deposit ARC Coins</span>
                    </CardTitle>
                    <CardDescription>Add ARC Coins to your wallet</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={() => setDepositAmount('100')}>
                        100 ARC
                      </Button>
                      <Button variant="outline" onClick={() => setDepositAmount('500')}>
                        500 ARC
                      </Button>
                      <Button variant="outline" onClick={() => setDepositAmount('1000')}>
                        1000 ARC
                      </Button>
                      <Button variant="outline" onClick={() => setDepositAmount('2500')}>
                        2500 ARC
                      </Button>
                    </div>
                    <Button className="w-full primary-gradient">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Deposit via Card
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Withdraw ARC Coins</span>
                    </CardTitle>
                    <CardDescription>Convert ARC Coins to real money</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        max={user.profile.arcCoins}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Available: {user.profile.arcCoins} ARC Coins
                      </p>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <p className="text-sm text-warning">
                        Exchange Rate: 1 ARC = $0.10 USD
                      </p>
                      <p className="text-sm text-warning">
                        Minimum withdrawal: 100 ARC Coins
                      </p>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Withdraw to Bank
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};