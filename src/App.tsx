import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ProfilePage } from './components/ProfilePage';
import { BookingPage } from './components/BookingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { PasswordResetPage } from './components/PasswordResetPage';
import { InvoicesPage } from './components/InvoicesPage';
import { FeedbackPage } from './components/FeedbackPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Navigation } from './components/Navigation';

type Page = 'login' | 'signup' | 'profile' | 'booking' | 'checkout' | 'password-reset' | 'invoices' | 'feedback' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  services: Service[];
  pet: Pet;
  total: number;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  depositPaid?: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [currentAppointment, setCurrentAppointment] = useState<Partial<Appointment>>({});
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    // Check if admin login (email: admin@pawcare.com, password: admin123)
    if (userData.email === 'admin@pawcare.com') {
      setIsAdmin(true);
      setUser(userData);
      navigateTo('admin');
    } else {
      setIsAdmin(false);
      setUser(userData);
      // Load user's pets (mock data)
      const mockPets = [
        { id: '1', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3 },
        { id: '2', name: 'Whiskers', species: 'Cat', breed: 'Persian', age: 2 }
      ];
      setPets(mockPets);
      
      // Load mock appointments
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          date: tomorrow.toISOString().split('T')[0],
          time: '10:00',
          pet: mockPets[0],
          services: [
            {
              id: '1',
              name: 'General Health Checkup',
              price: 75,
              duration: 30,
              description: 'Comprehensive physical examination'
            },
            {
              id: '2',
              name: 'Vaccination',
              price: 45,
              duration: 15,
              description: 'Essential vaccinations'
            }
          ],
          total: 120,
          notes: 'Buddy seems a bit lethargic lately',
          status: 'upcoming',
          depositPaid: 60
        },
        {
          id: '2',
          date: nextWeek.toISOString().split('T')[0],
          time: '14:30',
          pet: mockPets[1],
          services: [],
          total: 0,
          notes: 'Regular checkup',
          status: 'upcoming',
          depositPaid: 0
        }
      ];
      
      setAppointments(mockAppointments);
      navigateTo('profile');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setPets([]);
    setSelectedServices([]);
    setCurrentAppointment({});
    navigateTo('login');
  };

  const handleServiceSelection = (services: Service[]) => {
    setSelectedServices(services);
    setCurrentAppointment(prev => ({ ...prev, services }));
  };

  const handleBookingDetails = (details: { date: string; time: string; pet: Pet; services: Service[]; notes: string }) => {
    const total = details.services.reduce((sum, service) => sum + service.price, 0);
    setCurrentAppointment({ 
      ...details,
      total
    });
    setSelectedServices(details.services);
  };

  const handlePaymentComplete = () => {
    // Create a new appointment from currentAppointment
    if (currentAppointment.date && currentAppointment.time && currentAppointment.pet) {
      const isBookingOnly = !currentAppointment.services || currentAppointment.services.length === 0;
      const depositAmount = isBookingOnly ? 0 : (currentAppointment.total || 0) * 0.5;
      
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date: currentAppointment.date,
        time: currentAppointment.time,
        pet: currentAppointment.pet,
        services: currentAppointment.services || [],
        total: currentAppointment.total || 0,
        notes: currentAppointment.notes,
        status: 'upcoming',
        depositPaid: depositAmount
      };
      
      setAppointments([...appointments, newAppointment]);
      setCurrentAppointment({});
      setSelectedServices([]);
    }
    navigateTo('profile');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => navigateTo('signup')} onNavigateToPasswordReset={() => navigateTo('password-reset')} />;
      case 'signup':
        return <SignupPage onSignup={handleLogin} onNavigateToLogin={() => navigateTo('login')} />;
      case 'profile':
        return <ProfilePage user={user} pets={pets} appointments={appointments} onUpdateUser={setUser} onUpdatePets={setPets} onNavigate={navigateTo} />;
      case 'booking':
        return <BookingPage pets={pets} appointments={appointments} onBookingComplete={handleBookingDetails} onNavigate={navigateTo} />;
      case 'checkout':
        return <CheckoutPage appointment={currentAppointment} user={user} onPaymentComplete={handlePaymentComplete} onNavigate={navigateTo} />;
      case 'password-reset':
        return <PasswordResetPage onNavigateToLogin={() => navigateTo('login')} />;
      case 'invoices':
        return <InvoicesPage user={user} onNavigate={navigateTo} />;
      case 'feedback':
        return <FeedbackPage user={user} onNavigate={navigateTo} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => navigateTo('signup')} onNavigateToPasswordReset={() => navigateTo('password-reset')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && !isAdmin && <Navigation currentPage={currentPage} onNavigate={navigateTo} onLogout={handleLogout} />}
      <main className={user && !isAdmin ? 'pt-16' : ''}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}