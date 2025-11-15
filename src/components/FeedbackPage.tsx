import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageSquare, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FeedbackPageProps {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  onNavigate: (page: string) => void;
}

export function FeedbackPage({ user, onNavigate }: FeedbackPageProps) {
  const [feedbackForm, setFeedbackForm] = useState({
    category: '',
    subject: '',
    message: '',
    rating: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackForm.category || !feedbackForm.subject || !feedbackForm.message || feedbackForm.rating === 0) {
      toast.error('Please fill in all fields and provide a rating');
      return;
    }

    // In a real app, this would send to a backend
    console.log('Feedback submitted:', {
      ...feedbackForm,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      submittedAt: new Date().toISOString()
    });

    toast.success('Thank you for your feedback! We appreciate your input.');
    
    // Reset form
    setFeedbackForm({
      category: '',
      subject: '',
      message: '',
      rating: 0
    });
  };

  const StarRating = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
            className="focus:outline-none transition-colors"
          >
            <Star
              className={`w-8 h-8 ${
                star <= feedbackForm.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2">Share Your Feedback</h1>
          <p className="text-muted-foreground">
            We value your opinion! Let us know about your experience with PawCare Veterinary.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Feedback Form
            </CardTitle>
            <CardDescription>
              Your feedback helps us improve our services for you and your pets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>How would you rate your overall experience?</Label>
                <StarRating />
                {feedbackForm.rating > 0 && (
                  <p className="text-muted-foreground">
                    {feedbackForm.rating === 1 && 'Poor'}
                    {feedbackForm.rating === 2 && 'Fair'}
                    {feedbackForm.rating === 3 && 'Good'}
                    {feedbackForm.rating === 4 && 'Very Good'}
                    {feedbackForm.rating === 5 && 'Excellent'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={feedbackForm.category}
                  onValueChange={(value) => setFeedbackForm({ ...feedbackForm, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service-quality">Service Quality</SelectItem>
                    <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                    <SelectItem value="facility-cleanliness">Facility Cleanliness</SelectItem>
                    <SelectItem value="appointment-booking">Appointment Booking</SelectItem>
                    <SelectItem value="pricing">Pricing</SelectItem>
                    <SelectItem value="wait-time">Wait Time</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your feedback"
                  value={feedbackForm.subject}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback</Label>
                <Textarea
                  id="message"
                  placeholder="Please share your thoughts, suggestions, or concerns..."
                  rows={6}
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit Feedback
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('profile')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Need immediate assistance? Reach out to us directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p>(555) 123-4567</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p>support@pawcare.com</p>
            </div>
            <div>
              <p className="text-muted-foreground">Hours</p>
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
