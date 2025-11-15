import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Heart, ArrowLeft, CheckCircle, Mail } from 'lucide-react';

interface PasswordResetPageProps {
  onNavigateToLogin: () => void;
}

export function PasswordResetPage({ onNavigateToLogin }: PasswordResetPageProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'request' | 'sent' | 'reset'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending reset email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setStep('sent');
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate code verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    if (resetCode === '123456') { // Mock verification
      setStep('reset');
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    alert('Password reset successful!');
    onNavigateToLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <CardTitle>
            {step === 'request' && 'Reset Password'}
            {step === 'sent' && 'Check Your Email'}
            {step === 'reset' && 'Create New Password'}
          </CardTitle>
          <CardDescription>
            {step === 'request' && 'Enter your email to receive a reset code'}
            {step === 'sent' && 'We sent a verification code to your email'}
            {step === 'reset' && 'Enter your new password'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'request' && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Code'}
              </Button>
            </form>
          )}

          {step === 'sent' && (
            <div className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  We've sent a 6-digit verification code to <strong>{email}</strong>. 
                  Please check your inbox and enter the code below.
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetCode">Verification Code</Label>
                  <Input
                    id="resetCode"
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    For demo purposes, use code: 123456
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
              </form>
              
              <Button variant="link" onClick={() => setStep('request')} className="w-full">
                Didn't receive the code? Try again
              </Button>
            </div>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Code verified successfully! Now create your new password.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <Button variant="link" onClick={onNavigateToLogin}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}