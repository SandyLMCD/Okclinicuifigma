import { Button } from './ui/button';
import { Home, Calendar, LogOut, FileText, MessageSquare } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: 'profile' | 'booking' | 'invoices' | 'feedback') => void;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, onLogout }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-primary">PawCare Veterinary</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant={currentPage === 'profile' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('profile')}
            >
              <Home className="w-4 h-4 mr-2" />
              Profile
            </Button>
            
            <Button 
              variant={currentPage === 'booking' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('booking')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            
            <Button 
              variant={currentPage === 'invoices' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('invoices')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Invoices
            </Button>
            
            <Button 
              variant={currentPage === 'feedback' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('feedback')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}