import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Heart } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: any) => void;
  onNavigateToSignup: () => void;
  onNavigateToPasswordReset: () => void;
}

export function LoginPage({ onLogin, onNavigateToSignup, onNavigateToPasswordReset }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, this would call an API
    const mockUser = {
      id: '1',
      email: formData.email,
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <CardTitle>Welcome to OK Clinic</CardTitle>
          <CardDescription>Sign in to manage your pet's healthcare</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <Button variant="link" onClick={onNavigateToPasswordReset}>
              Forgot your password?
            </Button>
            
            <div className="text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" onClick={onNavigateToSignup} className="p-0">
                Sign up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}