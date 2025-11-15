import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Users, Calendar, DollarSign, Activity, 
  Search, Filter, Download, Edit, Trash2,
  CheckCircle, XCircle, Clock, TrendingUp,
  FileText, Heart, LogOut
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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
  clientName: string;
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

  const [appointments, setAppointments] = useState<AdminAppointment[]>([
    { id: '1', clientName: 'John Doe', petName: 'Buddy', service: 'Annual Checkup', date: '2025-11-10', time: '10:00 AM', status: 'scheduled', amount: 75.00 },
    { id: '2', clientName: 'Jane Smith', petName: 'Whiskers', service: 'Dental Cleaning', date: '2025-11-10', time: '11:30 AM', status: 'scheduled', amount: 200.00 },
    { id: '3', clientName: 'Bob Johnson', petName: 'Max', service: 'Vaccination', date: '2025-11-09', time: '2:00 PM', status: 'completed', amount: 50.00 },
    { id: '4', clientName: 'Alice Williams', petName: 'Luna', service: 'Grooming', date: '2025-11-09', time: '3:30 PM', status: 'completed', amount: 60.00 },
    { id: '5', clientName: 'John Doe', petName: 'Charlie', service: 'X-Ray', date: '2025-11-08', time: '1:00 PM', status: 'cancelled', amount: 150.00 },
  ]);

  const [invoices, setInvoices] = useState<AdminInvoice[]>([
    { id: '1', invoiceNumber: 'INV-2025-001', clientName: 'John Doe', amount: 150.00, status: 'paid', date: '2025-01-15', dueDate: '2025-02-15' },
    { id: '2', invoiceNumber: 'INV-2025-002', clientName: 'Jane Smith', amount: 200.00, status: 'pending', date: '2025-02-20', dueDate: '2025-03-20' },
    { id: '3', invoiceNumber: 'INV-2025-003', clientName: 'Bob Johnson', amount: 450.00, status: 'overdue', date: '2024-11-01', dueDate: '2024-12-01' },
    { id: '4', invoiceNumber: 'INV-2025-004', clientName: 'Alice Williams', amount: 75.00, status: 'paid', date: '2025-03-05', dueDate: '2025-04-05' },
  ]);

  const [services, setServices] = useState<AdminService[]>([
    { id: '1', name: 'Annual Checkup', category: 'Wellness', price: 75.00, duration: 30, status: 'active' },
    { id: '2', name: 'Vaccination', category: 'Wellness', price: 50.00, duration: 15, status: 'active' },
    { id: '3', name: 'Dental Cleaning', category: 'Dental', price: 200.00, duration: 60, status: 'active' },
    { id: '4', name: 'Grooming', category: 'Grooming', price: 60.00, duration: 45, status: 'active' },
    { id: '5', name: 'X-Ray', category: 'Diagnostic', price: 150.00, duration: 30, status: 'active' },
    { id: '6', name: 'Surgery Consultation', category: 'Surgery', price: 100.00, duration: 45, status: 'inactive' },
  ]);

  // Status update handlers
  const updateAppointmentStatus = (id: string, newStatus: AdminAppointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const updateClientStatus = (id: string, newStatus: AdminUser['status']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const updateInvoiceStatus = (id: string, newStatus: AdminInvoice['status']) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    ));
  };

  const updateServiceStatus = (id: string, newStatus: AdminService['status']) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, status: newStatus } : service
    ));
  };

  // Statistics
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);
  const todayAppointments = appointments.filter(a => a.date === '2025-11-10').length;
  const activeUsers = users.filter(u => u.status === 'active').length;

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
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Quick stats and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest invoice activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {invoices.slice(0, 5).map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>{inv.invoiceNumber}</p>
                            <p className="text-muted-foreground">{inv.clientName}</p>
                            <p className="text-muted-foreground">${inv.amount.toFixed(2)}</p>
                          </div>
                          <Badge className={getStatusColor(inv.status)}>
                            {inv.status}
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
              <Button>
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
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
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
                    {appointments.map((apt) => (
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
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
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
                      <TableHead>Pets</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.pets}</TableCell>
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
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
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
                    {invoices.map((inv) => (
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
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
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
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
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
                    {services.map((service) => (
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
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
    </div>
  );
}