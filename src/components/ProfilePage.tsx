import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Plus, Edit, Calendar, Heart, Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  balance: number;
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

interface ProfilePageProps {
  user: User | null;
  pets: Pet[];
  appointments: Appointment[];
  onUpdateUser: (user: User) => void;
  onUpdatePets: (pets: Pet[]) => void;
  onNavigate: (page: 'booking' | 'balance' | 'invoices') => void;
}

export function ProfilePage({ user, pets, appointments, onUpdateUser, onUpdatePets, onNavigate }: ProfilePageProps) {
  const [editingUser, setEditingUser] = useState(false);
  const [editingPet, setEditingPet] = useState<string | null>(null);
  const [addingPet, setAddingPet] = useState(false);
  
  const [userForm, setUserForm] = useState(user || {
    id: '',
    email: '',
    name: '',
    phone: '',
    address: '',
    balance: 0
  });
  
  const [petForm, setPetForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0
  });

  const handleUserSave = () => {
    if (user) {
      onUpdateUser(userForm);
      setEditingUser(false);
    }
  };

  const handleAddPet = () => {
    const newPet = {
      id: Date.now().toString(),
      ...petForm
    };
    onUpdatePets([...pets, newPet]);
    setPetForm({ name: '', species: '', breed: '', age: 0 });
    setAddingPet(false);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1>My Profile</h1>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('booking')}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Button variant="outline" onClick={() => onNavigate('balance')}>
            <DollarSign className="w-4 h-4 mr-2" />
            Manage Balance
          </Button>
        </div>
      </div>

      {/* User Information */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Personal Information</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingUser(!editingUser)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {editingUser ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {editingUser ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={userForm.address}
                    onChange={(e) => setUserForm({...userForm, address: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleUserSave}>Save Changes</Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p>{user.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Address</p>
                <p>{user.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl">${user.balance.toFixed(2)}</p>
              <p className="text-muted-foreground">Available balance</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('balance')}>
              Manage Balance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate('invoices')}>
              View All Invoices
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {appointments.length > 0 ? (
            appointments
              .filter(apt => apt.status === 'upcoming')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appointment) => {
                const isBookingOnly = !appointment.services || appointment.services.length === 0;
                const depositAmount = isBookingOnly ? 0 : (appointment.total * 0.5);
                const balanceDue = appointment.total - (appointment.depositPaid || 0);
                
                return (
                  <Card key={appointment.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                              <h4>{new Date(appointment.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</h4>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={isBookingOnly ? "secondary" : "default"}>
                            {isBookingOnly ? 'Consultation' : 'With Services'}
                          </Badge>
                        </div>

                        <Separator />

                        {/* Pet Info */}
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Pet</p>
                          <div className="flex items-center gap-2">
                            <p>{appointment.pet.name}</p>
                            <Badge variant="outline">{appointment.pet.species}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {appointment.pet.breed} • {appointment.pet.age} years old
                            </span>
                          </div>
                        </div>

                        {/* Services */}
                        {!isBookingOnly && appointment.services.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Services</p>
                            <div className="space-y-2">
                              {appointment.services.map((service) => (
                                <div key={service.id} className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{service.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      ({service.duration} min)
                                    </span>
                                  </div>
                                  <span className="text-sm">${service.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {appointment.notes && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Notes</p>
                            <p className="text-sm bg-muted p-2 rounded">{appointment.notes}</p>
                          </div>
                        )}

                        <Separator />

                        {/* Payment Info */}
                        <div className="space-y-2">
                          {isBookingOnly ? (
                            <div className="flex items-center justify-between bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="text-sm">Free Consultation</p>
                                  <p className="text-xs text-muted-foreground">No payment required</p>
                                </div>
                              </div>
                              <p>$0.00</p>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Amount:</span>
                                <span>${appointment.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">Deposit Paid (50%):</span>
                                  {appointment.depositPaid && appointment.depositPaid >= depositAmount ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <AlertCircle className="w-4 h-4 text-amber-600" />
                                  )}
                                </div>
                                <span className={appointment.depositPaid && appointment.depositPaid >= depositAmount ? 'text-green-600' : 'text-amber-600'}>
                                  ${(appointment.depositPaid || 0).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <span>Balance Due:</span>
                                <span className={balanceDue > 0 ? '' : 'text-green-600'}>
                                  ${balanceDue.toFixed(2)}
                                </span>
                              </div>
                              {balanceDue > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Payable at your appointment
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3>No Upcoming Appointments</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any scheduled appointments yet.
              </p>
              <Button onClick={() => onNavigate('booking')}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Your First Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pets */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>My Pets</CardTitle>
              <CardDescription>Manage your pet information</CardDescription>
            </div>
            <Button onClick={() => setAddingPet(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {pets.map((pet) => (
            <div key={pet.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <h4>{pet.name}</h4>
                  <p className="text-muted-foreground">{pet.breed} • {pet.age} years old</p>
                </div>
                <Badge variant="outline">{pet.species}</Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {addingPet && (
            <div className="p-4 border rounded-lg bg-muted space-y-4">
              <h4>Add New Pet</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petName">Name</Label>
                  <Input
                    id="petName"
                    value={petForm.name}
                    onChange={(e) => setPetForm({...petForm, name: e.target.value})}
                    placeholder="Pet name"
                  />
                </div>
                <div>
                  <Label htmlFor="species">Species</Label>
                  <Input
                    id="species"
                    value={petForm.species}
                    onChange={(e) => setPetForm({...petForm, species: e.target.value})}
                    placeholder="Dog, Cat, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={petForm.breed}
                    onChange={(e) => setPetForm({...petForm, breed: e.target.value})}
                    placeholder="Pet breed"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={petForm.age}
                    onChange={(e) => setPetForm({...petForm, age: parseInt(e.target.value) || 0})}
                    placeholder="Age in years"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddPet}>Add Pet</Button>
                <Button variant="outline" onClick={() => setAddingPet(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}