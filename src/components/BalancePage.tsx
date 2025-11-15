import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CreditCard, Plus, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  balance: number;
}

interface BalancePageProps {
  user: User | null;
  onNavigate: (page: 'profile') => void;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 100.00,
    description: 'Account top-up',
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'debit',
    amount: 75.00,
    description: 'General Health Checkup - Buddy',
    date: '2024-01-10'
  },
  {
    id: '3',
    type: 'credit',
    amount: 50.00,
    description: 'Account top-up',
    date: '2024-01-05'
  },
  {
    id: '4',
    type: 'debit',
    amount: 45.00,
    description: 'Vaccination - Whiskers',
    date: '2024-01-03'
  },
  {
    id: '5',
    type: 'credit',
    amount: 200.00,
    description: 'Initial account credit',
    date: '2024-01-01'
  }
];

export function BalancePage({ user, onNavigate }: BalancePageProps) {
  const [topUpAmount, setTopUpAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setTopUpAmount('');
    alert(`Successfully added $${amount.toFixed(2)} to your account!`);
  };

  const quickAmounts = [25, 50, 100, 200];

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Account Balance</h1>
          <p className="text-muted-foreground">Manage your PawCare account balance</p>
        </div>
        
        <Button variant="outline" onClick={() => onNavigate('profile')}>
          Back to Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Balance & Top Up */}
        <div className="space-y-6">
          {/* Current Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <p className="text-primary" style={{ fontSize: '2.25rem' }}>${user.balance.toFixed(2)}</p>
                  <p className="text-muted-foreground">Available for appointments</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">This Month</p>
                    <p>$120.00 spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Last Top-up</p>
                    <p>$100.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Up Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Funds
              </CardTitle>
              <CardDescription>Top up your account balance for future appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount to Add</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Quick Select</Label>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopUpAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleTopUp}
                disabled={processing || !topUpAmount || parseFloat(topUpAmount) <= 0}
              >
                {processing ? 'Processing...' : `Add $${topUpAmount || '0.00'}`}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Funds will be available immediately after payment confirmation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Transaction History */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Transaction History
              </CardTitle>
              <CardDescription>Your recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction, index) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-sm ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <Badge variant={transaction.type === 'credit' ? 'default' : 'secondary'} className="text-xs">
                          {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                        </Badge>
                      </div>
                    </div>
                    
                    {index < mockTransactions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Balance Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="text-sm">Save on appointments</h4>
                <p className="text-xs text-muted-foreground">
                  Keep a balance to enjoy faster checkout and avoid payment processing delays.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm">Auto top-up</h4>
                <p className="text-xs text-muted-foreground">
                  Set up automatic balance refills when your balance gets low (coming soon).
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm">Refunds</h4>
                <p className="text-xs text-muted-foreground">
                  Cancelled appointments are automatically refunded to your account balance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}