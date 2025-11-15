import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
import { CalendarIcon, Clock, ArrowRight, Heart, DollarSign, CheckCircle } from 'lucide-react';

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
  category: string;
}

interface BookingPageProps {
  pets: Pet[];
  onBookingComplete: (details: { 
    date: string; 
    time: string; 
    pet: Pet;
    services: Service[];
    notes: string;
  }) => void;
  onNavigate: (page: string) => void;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const availableServices: Service[] = [
  {
    id: '1',
    name: 'General Health Checkup',
    price: 75,
    duration: 30,
    description: 'Comprehensive physical examination including weight, temperature, and basic health assessment.',
    category: 'Wellness'
  },
  {
    id: '2',
    name: 'Vaccination',
    price: 45,
    duration: 15,
    description: 'Essential vaccinations to protect your pet from common diseases.',
    category: 'Prevention'
  },
  {
    id: '3',
    name: 'Dental Cleaning',
    price: 120,
    duration: 60,
    description: 'Professional dental cleaning under anesthesia to maintain oral health.',
    category: 'Dental'
  },
  {
    id: '4',
    name: 'Blood Work Panel',
    price: 95,
    duration: 20,
    description: 'Complete blood chemistry panel to assess organ function and overall health.',
    category: 'Diagnostics'
  },
  {
    id: '5',
    name: 'Microchipping',
    price: 35,
    duration: 10,
    description: 'Permanent identification chip implantation for pet safety and recovery.',
    category: 'Safety'
  },
  {
    id: '6',
    name: 'Spay/Neuter Surgery',
    price: 200,
    duration: 120,
    description: 'Surgical sterilization procedure performed by experienced veterinarians.',
    category: 'Surgery'
  },
  {
    id: '7',
    name: 'X-Ray Imaging',
    price: 85,
    duration: 25,
    description: 'Digital radiography for diagnosing bone, joint, and internal organ conditions.',
    category: 'Diagnostics'
  },
  {
    id: '8',
    name: 'Flea & Tick Treatment',
    price: 55,
    duration: 20,
    description: 'Professional treatment and prevention plan for external parasites.',
    category: 'Treatment'
  }
];

type BookingStep = 'details' | 'services' | 'confirmation';

export function BookingPage({ pets, onBookingComplete, onNavigate }: BookingPageProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  
  // Step 1: Booking Details
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [notes, setNotes] = useState('');
  
  // Step 2: Services
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  
  const handleNextFromDetails = () => {
    if (selectedDate && selectedTime && selectedPet) {
      setCurrentStep('services');
    }
  };

  const handleServiceToggle = (service: Service, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    }
  };

  const handleSkipServices = () => {
    setSelectedServices([]);
    setCurrentStep('confirmation');
  };

  const handleContinueWithServices = () => {
    setCurrentStep('confirmation');
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime && selectedPet) {
      onBookingComplete({
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        pet: selectedPet,
        services: selectedServices,
        notes
      });
      onNavigate('checkout');
    }
  };

  const handleBackToDetails = () => {
    setCurrentStep('details');
  };

  const handleBackToServices = () => {
    setCurrentStep('services');
  };

  const isDetailsValid = selectedDate && selectedTime && selectedPet;
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const servicesTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const depositAmount = servicesTotal > 0 ? servicesTotal * 0.5 : 0;
  const categories = Array.from(new Set(availableServices.map(service => service.category)));

  // Step 1: Booking Details
  if (currentStep === 'details') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1>Book Appointment</h1>
          <p className="text-muted-foreground">Step 1 of 3: Select pet, date, and time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pet Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Pet</CardTitle>
                <CardDescription>Which pet is this appointment for?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPet?.id === pet.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedPet(pet)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4>{pet.name}</h4>
                          <p className="text-muted-foreground">{pet.breed} • {pet.age} years old</p>
                        </div>
                        <Badge variant="outline">{pet.species}</Badge>
                      </div>
                    </div>
                  ))}
                  
                  {pets.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No pets found. Please add a pet to your profile first.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < minDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Any special instructions or concerns?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={4}
                  placeholder="Tell us about any symptoms, concerns, or special requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Time</CardTitle>
                <CardDescription>
                  {selectedDate 
                    ? `Available slots for ${selectedDate.toLocaleDateString()}`
                    : 'Please select a date first'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a date to view available time slots</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pet:</span>
                    <span>{selectedPet?.name || 'Not selected'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{selectedDate?.toLocaleDateString() || 'Not selected'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime || 'Not selected'}</span>
                  </div>
                  
                  {selectedPet && (
                    <div className="pt-3 border-t">
                      <p className="text-muted-foreground mb-2">Pet Details:</p>
                      <p>{selectedPet.breed} • {selectedPet.age} years old</p>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full mt-6" 
                  onClick={handleNextFromDetails}
                  disabled={!isDetailsValid}
                >
                  Next: Add Services (Optional)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                {!isDetailsValid && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please select a pet, date, and time to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Services
  if (currentStep === 'services') {
    const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1>Add Services (Optional)</h1>
            <p className="text-muted-foreground">Step 2 of 3: Select additional services or skip for booking only</p>
          </div>
          
          {selectedServices.length > 0 && (
            <Card className="w-80">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Selected Services:</span>
                    <span>{selectedServices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Duration:</span>
                    <span>{totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Price:</span>
                    <span>${servicesTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServices
                .filter(service => service.category === category)
                .map((service) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  
                  return (
                    <Card key={service.id} className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                              />
                              {service.name}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {service.description}
                            </CardDescription>
                          </div>
                          <Heart className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span>${service.price}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{service.duration}min</span>
                            </div>
                          </div>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="flex gap-4 justify-between items-center pt-6">
          <Button variant="outline" onClick={handleBackToDetails}>
            Back to Details
          </Button>
          
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSkipServices}>
              Skip Services (Booking Only - Free)
            </Button>
            
            <Button 
              onClick={handleContinueWithServices}
              disabled={selectedServices.length === 0}
            >
              Continue with Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  if (currentStep === 'confirmation') {
    const isBookingOnly = selectedServices.length === 0;
    const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

    return (
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1>Confirm Booking</h1>
          <p className="text-muted-foreground">Step 3 of 3: Review your appointment details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Appointment Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>{selectedDate?.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedTime}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-muted-foreground">Pet</p>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <p>{selectedPet?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPet?.breed} • {selectedPet?.age} years old
                      </p>
                    </div>
                    <Badge variant="outline">{selectedPet?.species}</Badge>
                  </div>
                </div>

                {notes && (
                  <div className="border-t pt-4">
                    <p className="text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm">{notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedServices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedServices.map((service) => (
                      <div key={service.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p>{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.duration} minutes
                          </p>
                        </div>
                        <p>${service.price}</p>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span>Total Duration:</span>
                        <span>{totalDuration} minutes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isBookingOnly ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3>Booking Only - Free</h3>
                    <p className="text-muted-foreground">
                      No services selected. Your appointment booking is free of charge.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Services Total:</span>
                        <span>${servicesTotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p>50% Deposit Required</p>
                            <p className="text-sm text-muted-foreground">Non-refundable</p>
                          </div>
                          <p className="text-lg">${depositAmount.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Balance Due:</span>
                          <span>${(servicesTotal - depositAmount).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Payable at appointment
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                      <p className="text-sm">
                        <strong>Note:</strong> The 50% deposit (${depositAmount.toFixed(2)}) is non-refundable and secures your appointment.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {isBookingOnly ? (
                  <Button 
                    className="w-full" 
                    onClick={handleConfirmBooking}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleConfirmBooking}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Proceed to Payment (${depositAmount.toFixed(2)})
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleBackToServices}
                >
                  Back to Services
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By confirming, you agree to our terms of service and booking policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
