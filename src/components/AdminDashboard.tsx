import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Users, Calendar, DollarSign, 
  Search, Filter, Download, Edit, Trash2,
  Clock, TrendingUp,
  FileText, Heart, LogOut, Plus, X, PawPrint, Star
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { Textarea } from './ui/textarea';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface AdminAppointment {
  id: string;
  clientId: string;
  clientName: string;
  petId: string;
  petName: string;
  service: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  amount: number;
}

interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

interface AdminService {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive';
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  ownerName: string;
  lastVisit: string;
  medicalNotes: string;
  status: 'active' | 'inactive';
}

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: string;
  subject: string;
  message: string;
  rating: number;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - using state to allow updates
  const [users, setUsers] = useState<AdminUser[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-0101', pets: 2, totalSpent: 1250.00, status: 'active', joinDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', pets: 1, totalSpent: 850.00, status: 'active', joinDate: '2024-02-20' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', pets: 3, totalSpent: 2100.00, status: 'active', joinDate: '2024-03-10' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', phone: '555-0104', pets: 1, totalSpent: 350.00, status: 'inactive', joinDate: '2023-11-05' },
  ]);

  const [pets, setPets] = useState<Pet[]>([
    { id: 'p1', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 5, weight: 65, ownerId: '1', ownerName: 'John Doe', lastVisit: '2025-11-10', medicalNotes: 'Healthy, up to date on vaccinations', status: 'active' },
    { id: 'p2', name: 'Charlie', species: 'Dog', breed: 'Labrador', age: 3, weight: 70, ownerId: '1', ownerName: 'John Doe', lastVisit: '2025-11-08', medicalNotes: 'Prone to ear infections', status: 'active' },
    { id: 'p3', name: 'Whiskers', species: 'Cat', breed: 'Persian', age: 4, weight: 12, ownerId: '2', ownerName: 'Jane Smith', lastVisit: '2025-11-10', medicalNotes: 'Dental issues, on special diet', status: 'active' },
    { id: 'p4', name: 'Max', species: 'Dog', breed: 'German Shepherd', age: 7, weight: 80, ownerId: '3', ownerName: 'Bob Johnson', lastVisit: '2025-11-09', medicalNotes: 'Arthritis in hind legs', status: 'active' },
    { id: 'p5', name: 'Bella', species: 'Dog', breed: 'Beagle', age: 2, weight: 25, ownerId: '3', ownerName: 'Bob Johnson', lastVisit: '2025-10-15', medicalNotes: 'Very energetic, healthy', status: 'active' },
    { id: 'p6', name: 'Rocky', species: 'Dog', breed: 'Bulldog', age: 6, weight: 50, ownerId: '3', ownerName: 'Bob Johnson', lastVisit: '2025-10-20', medicalNotes: 'Breathing issues, requires monitoring', status: 'active' },
    { id: 'p7', name: 'Luna', species: 'Cat', breed: 'Siamese', age: 3, weight: 10, ownerId: '4', ownerName: 'Alice Williams', lastVisit: '2025-11-09', medicalNotes: 'Indoor cat, regular checkups', status: 'active' },
  ]);

  const [appointments, setAppointments] = useState<AdminAppointment[]>([
    { id: '1', clientId: '1', clientName: 'John Doe', petId: 'p1', petName: 'Buddy', service: 'Annual Checkup', date: '2025-11-10', time: '10:00 AM', status: 'scheduled', amount: 75.00 },
    { id: '2', clientId: '2', clientName: 'Jane Smith', petId: 'p3', petName: 'Whiskers', service: 'Dental Cleaning', date: '2025-11-10', time: '11:30 AM', status: 'scheduled', amount: 200.00 },
    { id: '3', clientId: '3', clientName: 'Bob Johnson', petId: 'p4', petName: 'Max', service: 'Vaccination', date: '2025-11-09', time: '2:00 PM', status: 'completed', amount: 50.00 },
    { id: '4', clientId: '4', clientName: 'Alice Williams', petId: 'p7', petName: 'Luna', service: 'Grooming', date: '2025-11-09', time: '3:30 PM', status: 'completed', amount: 60.00 },
    { id: '5', clientId: '1', clientName: 'John Doe', petId: 'p2', petName: 'Charlie', service: 'X-Ray', date: '2025-11-08', time: '1:00 PM', status: 'cancelled', amount: 150.00 },
  ]);

  const [invoices, setInvoices] = useState<AdminInvoice[]>([
    { id: '1', invoiceNumber: 'INV-2025-001', clientId: '1', clientName: 'John Doe', amount: 150.00, status: 'paid', date: '2025-01-15', dueDate: '2025-02-15' },
    { id: '2', invoiceNumber: 'INV-2025-002', clientId: '2', clientName: 'Jane Smith', amount: 200.00, status: 'pending', date: '2025-02-20', dueDate: '2025-03-20' },
    { id: '3', invoiceNumber: 'INV-2025-003', clientId: '3', clientName: 'Bob Johnson', amount: 450.00, status: 'overdue', date: '2024-11-01', dueDate: '2024-12-01' },
    { id: '4', invoiceNumber: 'INV-2025-004', clientId: '4', clientName: 'Alice Williams', amount: 75.00, status: 'paid', date: '2025-03-05', dueDate: '2025-04-05' },
  ]);

  const [services, setServices] = useState<AdminService[]>([
    { id: '1', name: 'Annual Checkup', category: 'Wellness', price: 75.00, duration: 30, status: 'active' },
    { id: '2', name: 'Vaccination', category: 'Wellness', price: 50.00, duration: 15, status: 'active' },
    { id: '3', name: 'Dental Cleaning', category: 'Dental', price: 200.00, duration: 60, status: 'active' },
    { id: '4', name: 'Grooming', category: 'Grooming', price: 60.00, duration: 45, status: 'active' },
    { id: '5', name: 'X-Ray', category: 'Diagnostic', price: 150.00, duration: 30, status: 'active' },
    { id: '6', name: 'Surgery Consultation', category: 'Surgery', price: 100.00, duration: 45, status: 'inactive' },
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: '1', userId: '1', userName: 'John Doe', userEmail: 'john@example.com', category: 'service-quality', subject: 'Excellent service!', message: 'The staff was very professional and my dog Buddy received great care.', rating: 5, submittedAt: '2025-11-14', status: 'reviewed' },
    { id: '2', userId: '2', userName: 'Jane Smith', userEmail: 'jane@example.com', category: 'facility-cleanliness', subject: 'Very clean facility', message: 'I was impressed with how clean everything was. Great experience overall.', rating: 5, submittedAt: '2025-11-13', status: 'resolved' },
    { id: '3', userId: '3', userName: 'Bob Johnson', userEmail: 'bob@example.com', category: 'wait-time', subject: 'Long wait time', message: 'Had to wait 45 minutes past my appointment time. Otherwise good service.', rating: 3, submittedAt: '2025-11-12', status: 'new' },
    { id: '4', userId: '4', userName: 'Alice Williams', userEmail: 'alice@example.com', category: 'staff-behavior', subject: 'Friendly staff', message: 'Everyone was so kind and patient with my nervous cat Luna.', rating: 5, submittedAt: '2025-11-11', status: 'reviewed' },
  ]);

  // Dialog states
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [petDialogOpen, setPetDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Edit mode states
  const [editingAppointment, setEditingAppointment] = useState<AdminAppointment | null>(null);
  const [editingClient, setEditingClient] = useState<AdminUser | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<AdminInvoice | null>(null);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ type: string; id: string; name: string } | null>(null);

  // Filter states
  const [appointmentFilter, setAppointmentFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [invoiceFilter, setInvoiceFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [petFilter, setPetFilter] = useState<string>('all');
  const [feedbackFilter, setFeedbackFilter] = useState<string>('all');

  // Form states
  const [appointmentForm, setAppointmentForm] = useState({
    clientId: '', petId: '', service: '', date: '', time: '', status: 'scheduled' as const, amount: ''
  });
  const [clientForm, setClientForm] = useState({
    name: '', email: '', phone: '', status: 'active' as const
  });
  const [invoiceForm, setInvoiceForm] = useState({
    clientId: '', amount: '', status: 'pending' as const, date: '', dueDate: ''
  });
  const [serviceForm, setServiceForm] = useState({
    name: '', category: '', price: '', duration: '', status: 'active' as const
  });
  const [petForm, setPetForm] = useState({
    name: '', species: '', breed: '', age: '', weight: '', ownerId: '', medicalNotes: '', status: 'active' as const
  });

  // Get client pets for appointment form
  const getClientPets = (clientId: string) => {
    return pets.filter(pet => pet.ownerId === clientId && pet.status === 'active');
  };

  // Get active clients
  const getActiveClients = () => {
    return users.filter(user => user.status === 'active');
  };

  // Status update handlers
  const updateAppointmentStatus = (id: string, newStatus: AdminAppointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    toast.success('Appointment status updated');
  };

  const updateClientStatus = (id: string, newStatus: AdminUser['status']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    toast.success('Client status updated');
  };

  const updateInvoiceStatus = (id: string, newStatus: AdminInvoice['status']) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    ));
    toast.success('Invoice status updated');
  };

  const updateServiceStatus = (id: string, newStatus: AdminService['status']) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, status: newStatus } : service
    ));
    toast.success('Service status updated');
  };

  const updatePetStatus = (id: string, newStatus: Pet['status']) => {
    setPets(pets.map(pet => 
      pet.id === id ? { ...pet, status: newStatus } : pet
    ));
    toast.success('Pet status updated');
  };

  const updateFeedbackStatus = (id: string, newStatus: Feedback['status']) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, status: newStatus } : feedback
    ));
    toast.success('Feedback status updated');
  };

  // Add/Edit handlers
  const handleAppointmentSubmit = () => {
    if (!appointmentForm.clientId || !appointmentForm.petId || !appointmentForm.service || 
        !appointmentForm.date || !appointmentForm.time || !appointmentForm.amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const client = users.find(u => u.id === appointmentForm.clientId);
    const pet = pets.find(p => p.id === appointmentForm.petId);

    if (!client || !pet) {
      toast.error('Invalid client or pet selection');
      return;
    }

    if (editingAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment.id ? {
          ...apt,
          clientId: appointmentForm.clientId,
          clientName: client.name,
          petId: appointmentForm.petId,
          petName: pet.name,
          service: appointmentForm.service,
          date: appointmentForm.date,
          time: appointmentForm.time,
          status: appointmentForm.status,
          amount: parseFloat(appointmentForm.amount)
        } : apt
      ));
      toast.success('Appointment updated successfully');
    } else {
      const newAppointment: AdminAppointment = {
        id: String(Date.now()),
        clientId: appointmentForm.clientId,
        clientName: client.name,
        petId: appointmentForm.petId,
        petName: pet.name,
        service: appointmentForm.service,
        date: appointmentForm.date,
        time: appointmentForm.time,
        status: appointmentForm.status,
        amount: parseFloat(appointmentForm.amount)
      };
      setAppointments([...appointments, newAppointment]);
      toast.success('Appointment created successfully');
    }

    setAppointmentDialogOpen(false);
    setEditingAppointment(null);
    setAppointmentForm({ clientId: '', petId: '', service: '', date: '', time: '', status: 'scheduled', amount: '' });
  };

  const handleClientSubmit = () => {
    if (!clientForm.name || !clientForm.email || !clientForm.phone) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingClient) {
      setUsers(users.map(user => 
        user.id === editingClient.id ? {
          ...user,
          name: clientForm.name,
          email: clientForm.email,
          phone: clientForm.phone,
          status: clientForm.status
        } : user
      ));
      toast.success('Client updated successfully');
    } else {
      const newClient: AdminUser = {
        id: String(Date.now()),
        name: clientForm.name,
        email: clientForm.email,
        phone: clientForm.phone,
        status: clientForm.status,
        pets: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newClient]);
      toast.success('Client added successfully');
    }

    setClientDialogOpen(false);
    setEditingClient(null);
    setClientForm({ name: '', email: '', phone: '', status: 'active' });
  };

  const handleInvoiceSubmit = () => {
    if (!invoiceForm.clientId || !invoiceForm.amount || !invoiceForm.date || !invoiceForm.dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    const client = users.find(u => u.id === invoiceForm.clientId);
    if (!client) {
      toast.error('Invalid client selection');
      return;
    }

    if (editingInvoice) {
      setInvoices(invoices.map(inv => 
        inv.id === editingInvoice.id ? {
          ...inv,
          clientId: invoiceForm.clientId,
          clientName: client.name,
          amount: parseFloat(invoiceForm.amount),
          status: invoiceForm.status,
          date: invoiceForm.date,
          dueDate: invoiceForm.dueDate
        } : inv
      ));
      toast.success('Invoice updated successfully');
    } else {
      const newInvoice: AdminInvoice = {
        id: String(Date.now()),
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
        clientId: invoiceForm.clientId,
        clientName: client.name,
        amount: parseFloat(invoiceForm.amount),
        status: invoiceForm.status,
        date: invoiceForm.date,
        dueDate: invoiceForm.dueDate
      };
      setInvoices([...invoices, newInvoice]);
      toast.success('Invoice created successfully');
    }

    setInvoiceDialogOpen(false);
    setEditingInvoice(null);
    setInvoiceForm({ clientId: '', amount: '', status: 'pending', date: '', dueDate: '' });
  };

  const handleServiceSubmit = () => {
    if (!serviceForm.name || !serviceForm.category || !serviceForm.price || !serviceForm.duration) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? {
          ...service,
          ...serviceForm,
          price: parseFloat(serviceForm.price),
          duration: parseInt(serviceForm.duration)
        } : service
      ));
      toast.success('Service updated successfully');
    } else {
      const newService: AdminService = {
        id: String(Date.now()),
        ...serviceForm,
        price: parseFloat(serviceForm.price),
        duration: parseInt(serviceForm.duration)
      };
      setServices([...services, newService]);
      toast.success('Service added successfully');
    }

    setServiceDialogOpen(false);
    setEditingService(null);
    setServiceForm({ name: '', category: '', price: '', duration: '', status: 'active' });
  };

  const handlePetSubmit = () => {
    if (!petForm.name || !petForm.species || !petForm.breed || !petForm.age || 
        !petForm.weight || !petForm.ownerId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const owner = users.find(u => u.id === petForm.ownerId);
    if (!owner) {
      toast.error('Invalid owner selection');
      return;
    }

    if (editingPet) {
      setPets(pets.map(pet => 
        pet.id === editingPet.id ? {
          ...pet,
          name: petForm.name,
          species: petForm.species,
          breed: petForm.breed,
          age: parseInt(petForm.age),
          weight: parseFloat(petForm.weight),
          ownerId: petForm.ownerId,
          ownerName: owner.name,
          medicalNotes: petForm.medicalNotes,
          status: petForm.status
        } : pet
      ));
      toast.success('Pet updated successfully');
    } else {
      const newPet: Pet = {
        id: `p${Date.now()}`,
        name: petForm.name,
        species: petForm.species,
        breed: petForm.breed,
        age: parseInt(petForm.age),
        weight: parseFloat(petForm.weight),
        ownerId: petForm.ownerId,
        ownerName: owner.name,
        lastVisit: new Date().toISOString().split('T')[0],
        medicalNotes: petForm.medicalNotes,
        status: petForm.status
      };
      setPets([...pets, newPet]);
      
      // Update owner's pet count
      setUsers(users.map(u => 
        u.id === petForm.ownerId ? { ...u, pets: u.pets + 1 } : u
      ));
      
      toast.success('Pet added successfully');
    }

    setPetDialogOpen(false);
    setEditingPet(null);
    setPetForm({ name: '', species: '', breed: '', age: '', weight: '', ownerId: '', medicalNotes: '', status: 'active' });
  };

  // Edit button handlers
  const handleEditAppointment = (appointment: AdminAppointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      clientId: appointment.clientId,
      petId: appointment.petId,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      amount: String(appointment.amount)
    });
    setAppointmentDialogOpen(true);
  };

  const handleEditClient = (client: AdminUser) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      status: client.status
    });
    setClientDialogOpen(true);
  };

  const handleEditInvoice = (invoice: AdminInvoice) => {
    setEditingInvoice(invoice);
    setInvoiceForm({
      clientId: invoice.clientId,
      amount: String(invoice.amount),
      status: invoice.status,
      date: invoice.date,
      dueDate: invoice.dueDate
    });
    setInvoiceDialogOpen(true);
  };

  const handleEditService = (service: AdminService) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      price: String(service.price),
      duration: String(service.duration),
      status: service.status
    });
    setServiceDialogOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: String(pet.age),
      weight: String(pet.weight),
      ownerId: pet.ownerId,
      medicalNotes: pet.medicalNotes,
      status: pet.status
    });
    setPetDialogOpen(true);
  };

  // Delete handlers
  const handleDeleteClick = (type: string, id: string, name: string) => {
    setDeleteItem({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;

    switch (deleteItem.type) {
      case 'appointment':
        setAppointments(appointments.filter(apt => apt.id !== deleteItem.id));
        toast.success('Appointment deleted successfully');
        break;
      case 'client':
        setUsers(users.filter(user => user.id !== deleteItem.id));
        toast.success('Client deleted successfully');
        break;
      case 'invoice':
        setInvoices(invoices.filter(inv => inv.id !== deleteItem.id));
        toast.success('Invoice deleted successfully');
        break;
      case 'service':
        setServices(services.filter(service => service.id !== deleteItem.id));
        toast.success('Service deleted successfully');
        break;
      case 'pet':
        const pet = pets.find(p => p.id === deleteItem.id);
        if (pet) {
          setPets(pets.filter(p => p.id !== deleteItem.id));
          // Update owner's pet count
          setUsers(users.map(u => 
            u.id === pet.ownerId ? { ...u, pets: Math.max(0, u.pets - 1) } : u
          ));
        }
        toast.success('Pet deleted successfully');
        break;
      case 'feedback':
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== deleteItem.id));
        toast.success('Feedback deleted successfully');
        break;
    }

    setDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  // Export to CSV handlers
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  // Filter data based on active filters
  const getFilteredAppointments = () => {
    let filtered = appointments.filter(apt => 
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (appointmentFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === appointmentFilter);
    }

    return filtered;
  };

  const getFilteredClients = () => {
    let filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );

    if (clientFilter !== 'all') {
      filtered = filtered.filter(user => user.status === clientFilter);
    }

    return filtered;
  };

  const getFilteredInvoices = () => {
    let filtered = invoices.filter(inv => 
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (invoiceFilter !== 'all') {
      filtered = filtered.filter(inv => inv.status === invoiceFilter);
    }

    return filtered;
  };

  const getFilteredServices = () => {
    let filtered = services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (serviceFilter !== 'all') {
      filtered = filtered.filter(service => 
        serviceFilter === 'all' || service.category.toLowerCase() === serviceFilter.toLowerCase()
      );
    }

    return filtered;
  };

  const getFilteredPets = () => {
    let filtered = pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (petFilter !== 'all') {
      filtered = filtered.filter(pet => pet.species.toLowerCase() === petFilter.toLowerCase());
    }

    return filtered;
  };

  const getFilteredFeedbacks = () => {
    let filtered = feedbacks.filter(feedback => 
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (feedbackFilter !== 'all') {
      filtered = filtered.filter(feedback => feedback.status === feedbackFilter);
    }

    return filtered;
  };

  // Statistics
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);
  const todayAppointments = appointments.filter(a => a.date === '2025-11-15').length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalPets = pets.filter(p => p.status === 'active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
      case 'active':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'overdue':
      case 'cancelled':
      case 'no-show':
      case 'inactive':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-primary">PawCare Admin</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="pets">Pet Patients</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Quick stats and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary">${totalRevenue.toFixed(2)}</div>
                  <p className="text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pending Revenue</span>
                    <Clock className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary">${pendingRevenue.toFixed(2)}</div>
                  <p className="text-muted-foreground mt-1">{invoices.filter(i => i.status !== 'paid').length} unpaid invoices</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-muted-foreground">Today's Appointments</span>
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary">{todayAppointments}</div>
                  <p className="text-muted-foreground mt-1">{appointments.filter(a => a.status === 'scheduled').length} scheduled total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Clients</span>
                    <Users className="w-4 h-4 text-purple-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary">{activeUsers}</div>
                  <p className="text-muted-foreground mt-1">{users.length} total clients</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pet Patients</span>
                    <PawPrint className="w-4 h-4 text-orange-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary">{totalPets}</div>
                  <p className="text-muted-foreground mt-1">{pets.length} total pets</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Latest scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {appointments.slice(0, 5).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>{apt.clientName} - {apt.petName}</p>
                            <p className="text-muted-foreground">{apt.service}</p>
                            <p className="text-muted-foreground">{apt.date} at {apt.time}</p>
                          </div>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Pet Visits</CardTitle>
                  <CardDescription>Latest pet patient visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {pets.slice(0, 5).map((pet) => (
                        <div key={pet.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>{pet.name} - {pet.species}</p>
                            <p className="text-muted-foreground">Owner: {pet.ownerName}</p>
                            <p className="text-muted-foreground">Last visit: {new Date(pet.lastVisit).toLocaleDateString()}</p>
                          </div>
                          <Badge className={getStatusColor(pet.status)}>
                            {pet.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Appointments Management</h2>
                <p className="text-muted-foreground">View and manage all appointments</p>
              </div>
              <Button onClick={() => {
                setEditingAppointment(null);
                setAppointmentForm({ clientId: '', petId: '', service: '', date: '', time: '', status: 'scheduled', amount: '' });
                setAppointmentDialogOpen(true);
              }}>
                <Calendar className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={appointmentFilter} onValueChange={setAppointmentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportToCSV(getFilteredAppointments(), 'appointments')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredAppointments().map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{apt.clientName}</TableCell>
                        <TableCell>{apt.petName}</TableCell>
                        <TableCell>{apt.service}</TableCell>
                        <TableCell>
                          {new Date(apt.date).toLocaleDateString()} {apt.time}
                        </TableCell>
                        <TableCell>${apt.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Select
                            value={apt.status}
                            onValueChange={(value) => updateAppointmentStatus(apt.id, value as AdminAppointment['status'])}
                          >
                            <SelectTrigger className={`w-[140px] ${getStatusColor(apt.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="no-show">No Show</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditAppointment(apt)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('appointment', apt.id, `${apt.clientName} - ${apt.petName}`)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pet Patients Tab */}
          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Pet Patients Management</h2>
                <p className="text-muted-foreground">View and manage all pet patients</p>
              </div>
              <Button onClick={() => {
                setEditingPet(null);
                setPetForm({ name: '', species: '', breed: '', age: '', weight: '', ownerId: '', medicalNotes: '', status: 'active' });
                setPetDialogOpen(true);
              }}>
                <PawPrint className="w-4 h-4 mr-2" />
                Add Pet
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={petFilter} onValueChange={setPetFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportToCSV(getFilteredPets(), 'pets')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pet Name</TableHead>
                      <TableHead>Species</TableHead>
                      <TableHead>Breed</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Weight (lbs)</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPets().map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell>{pet.name}</TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>{pet.age} yrs</TableCell>
                        <TableCell>{pet.weight}</TableCell>
                        <TableCell>{pet.ownerName}</TableCell>
                        <TableCell>{new Date(pet.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={pet.status}
                            onValueChange={(value) => updatePetStatus(pet.id, value as Pet['status'])}
                          >
                            <SelectTrigger className={`w-[120px] ${getStatusColor(pet.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditPet(pet)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('pet', pet.id, pet.name)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Client Management</h2>
                <p className="text-muted-foreground">View and manage all clients</p>
              </div>
              <Button onClick={() => {
                setEditingClient(null);
                setClientForm({ name: '', email: '', phone: '', status: 'active' });
                setClientDialogOpen(true);
              }}>
                <Users className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportToCSV(getFilteredClients(), 'clients')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredClients().map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={user.status}
                            onValueChange={(value) => updateClientStatus(user.id, value as AdminUser['status'])}
                          >
                            <SelectTrigger className={`w-[120px] ${getStatusColor(user.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditClient(user)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('client', user.id, user.name)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Invoice Management</h2>
                <p className="text-muted-foreground">View and manage all invoices</p>
              </div>
              <Button onClick={() => {
                setEditingInvoice(null);
                setInvoiceForm({ clientId: '', amount: '', status: 'pending', date: '', dueDate: '' });
                setInvoiceDialogOpen(true);
              }}>
                <FileText className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={invoiceFilter} onValueChange={setInvoiceFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportToCSV(getFilteredInvoices(), 'invoices')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredInvoices().map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell>{inv.invoiceNumber}</TableCell>
                        <TableCell>{inv.clientName}</TableCell>
                        <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>${inv.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Select
                            value={inv.status}
                            onValueChange={(value) => updateInvoiceStatus(inv.id, value as AdminInvoice['status'])}
                          >
                            <SelectTrigger className={`w-[120px] ${getStatusColor(inv.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(inv)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('invoice', inv.id, inv.invoiceNumber)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Services Management</h2>
                <p className="text-muted-foreground">Manage available services and pricing</p>
              </div>
              <Button onClick={() => {
                setEditingService(null);
                setServiceForm({ name: '', category: '', price: '', duration: '', status: 'active' });
                setServiceDialogOpen(true);
              }}>
                <Heart className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration (min)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredServices().map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>${service.price.toFixed(2)}</TableCell>
                        <TableCell>{service.duration}</TableCell>
                        <TableCell>
                          <Select
                            value={service.status}
                            onValueChange={(value) => updateServiceStatus(service.id, value as AdminService['status'])}
                          >
                            <SelectTrigger className={`w-[120px] ${getStatusColor(service.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditService(service)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('service', service.id, service.name)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="mb-2">Customer Feedback</h2>
                <p className="text-muted-foreground">View and manage customer feedback and reviews</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportToCSV(getFilteredFeedbacks(), 'feedback')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredFeedbacks().map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div>
                            <p>{feedback.userName}</p>
                            <p className="text-muted-foreground">{feedback.userEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{feedback.category.replace('-', ' ')}</TableCell>
                        <TableCell>{feedback.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: feedback.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(feedback.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={feedback.status}
                            onValueChange={(value) => updateFeedbackStatus(feedback.id, value as Feedback['status'])}
                          >
                            <SelectTrigger className={`w-[120px] ${getStatusColor(feedback.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                toast.info(`Message: ${feedback.message}`);
                              }}
                            >
                              View
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick('feedback', feedback.id, feedback.subject)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Dialog */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
            <DialogDescription>
              {editingAppointment ? 'Update appointment details below' : 'Create a new appointment for a client'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Client</Label>
              <Select
                value={appointmentForm.clientId}
                onValueChange={(value) => {
                  setAppointmentForm({ ...appointmentForm, clientId: value, petId: '' });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {getActiveClients().map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {appointmentForm.clientId && (
              <div className="space-y-2">
                <Label>Select Pet</Label>
                <Select
                  value={appointmentForm.petId}
                  onValueChange={(value) => setAppointmentForm({ ...appointmentForm, petId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {getClientPets(appointmentForm.clientId).map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} - {pet.species} ({pet.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getClientPets(appointmentForm.clientId).length === 0 && (
                  <p className="text-muted-foreground">No pets registered for this client</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Service</Label>
              <Input
                placeholder="Enter service"
                value={appointmentForm.service}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, service: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={appointmentForm.amount}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={appointmentForm.status}
                onValueChange={(value) => setAppointmentForm({ ...appointmentForm, status: value as AdminAppointment['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAppointmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAppointmentSubmit}>
              {editingAppointment ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pet Dialog */}
      <Dialog open={petDialogOpen} onOpenChange={setPetDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPet ? 'Edit Pet' : 'Add Pet Patient'}</DialogTitle>
            <DialogDescription>
              {editingPet ? 'Update pet information below' : 'Add a new pet patient to the system'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pet Name</Label>
              <Input
                placeholder="Enter pet name"
                value={petForm.name}
                onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Species</Label>
                <Select
                  value={petForm.species}
                  onValueChange={(value) => setPetForm({ ...petForm, species: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Breed</Label>
                <Input
                  placeholder="Enter breed"
                  value={petForm.breed}
                  onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age (years)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={petForm.age}
                  onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Weight (lbs)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={petForm.weight}
                  onChange={(e) => setPetForm({ ...petForm, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Owner</Label>
              <Select
                value={petForm.ownerId}
                onValueChange={(value) => setPetForm({ ...petForm, ownerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} - {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Medical Notes</Label>
              <Textarea
                placeholder="Enter medical history, allergies, etc."
                value={petForm.medicalNotes}
                onChange={(e) => setPetForm({ ...petForm, medicalNotes: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={petForm.status}
                onValueChange={(value) => setPetForm({ ...petForm, status: value as Pet['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPetDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePetSubmit}>
              {editingPet ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Dialog */}
      <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingClient ? 'Edit Client' : 'Add Client'}</DialogTitle>
            <DialogDescription>
              {editingClient ? 'Update client information below' : 'Add a new client to the system'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name"
                value={clientForm.name}
                onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={clientForm.email}
                onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                placeholder="Enter phone number"
                value={clientForm.phone}
                onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={clientForm.status}
                onValueChange={(value) => setClientForm({ ...clientForm, status: value as AdminUser['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClientDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleClientSubmit}>
              {editingClient ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Create Invoice'}</DialogTitle>
            <DialogDescription>
              {editingInvoice ? 'Update invoice details below' : 'Create a new invoice for a client'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Client</Label>
              <Select
                value={invoiceForm.clientId}
                onValueChange={(value) => setInvoiceForm({ ...invoiceForm, clientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {getActiveClients().map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={invoiceForm.amount}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={invoiceForm.date}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={invoiceForm.dueDate}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={invoiceForm.status}
                onValueChange={(value) => setInvoiceForm({ ...invoiceForm, status: value as AdminInvoice['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvoiceSubmit}>
              {editingInvoice ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Update service details below' : 'Add a new service to the catalog'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input
                placeholder="Enter service name"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={serviceForm.category}
                onValueChange={(value) => setServiceForm({ ...serviceForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Dental">Dental</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                  <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration (min)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={serviceForm.status}
                onValueChange={(value) => setServiceForm({ ...serviceForm, status: value as AdminService['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleServiceSubmit}>
              {editingService ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{deleteItem?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
