import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, Clock, Heart, CheckCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface Appointment {
  id?: string;
  date: string;
  time: string;
  services: Service[];
  pet: Pet;
  total: number;
}

interface CheckoutPageProps {
  appointment: Partial<Appointment>;
  user: User | null;
  onPaymentComplete: () => void;
  onNavigate: (page: 'booking' | 'services') => void;
}

export function CheckoutPage({ appointment, user, onPaymentComplete, onNavigate }: CheckoutPageProps) {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    onPaymentComplete();
  };
  
  const handleFreeBooking = () => {
    onPaymentComplete();
  };

  const servicesTotal = appointment.total || 0;
  const isBookingOnly = !appointment.services || appointment.services.length === 0;
  const depositAmount = isBookingOnly ? 0 : servicesTotal * 0.5;
  const balanceDue = servicesTotal - depositAmount;

  if (!appointment.date || !appointment.time || !appointment.pet || !appointment.services) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3>Incomplete Booking</h3>
            <p className="text-muted-foreground mb-6">
              Please complete your service selection and booking details first.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => onNavigate('services')}>Select Services</Button>
              <Button variant="outline" onClick={() => onNavigate('booking')}>
                Update Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1>Checkout</h1>
        <p className="text-muted-foreground">Review and confirm your appointment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Appointment Details */}
        <div className="space-y-6">
          {/* Appointment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-muted-foreground">Pet</p>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p>{appointment.pet.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.pet.breed} • {appointment.pet.age} years old
                    </p>
                  </div>
                  <Badge variant="outline">{appointment.pet.species}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Services</CardTitle>
            </CardHeader>
            <CardContent>
              {isBookingOnly ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3>Booking Only - Free</h3>
                  <p className="text-muted-foreground">
                    No services selected. Your appointment is free of charge.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointment.services?.map((service) => (
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
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Services Total:</span>
                    <span>${servicesTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-start border-t pt-3">
                    <div>
                      <p>50% Deposit Required</p>
                      <p className="text-sm text-muted-foreground">Non-refundable</p>
                    </div>
                    <p className="text-lg">${depositAmount.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Balance Due (at appointment):</span>
                    <span>${balanceDue.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment */}
        <div className="space-y-6">
          {isBookingOnly ? (
            // Free Booking - No Payment Required
            <Card>
              <CardHeader>
                <CardTitle>Confirm Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3>No Payment Required</h3>
                  <p className="text-muted-foreground mb-6">
                    Your appointment booking is free. Click below to confirm.
                  </p>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleFreeBooking}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Free Booking
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    By confirming, you agree to our terms of service and booking policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Pay 50% deposit (${depositAmount.toFixed(2)}) to secure your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                    <p className="text-sm">
                      <strong>Note:</strong> The deposit is non-refundable. Remaining balance (${balanceDue.toFixed(2)}) is due at your appointment.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="Name on card"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confirm Payment */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-muted-foreground">Deposit Amount</p>
                      <p style={{ fontSize: '1.5rem' }}>${depositAmount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (50% of ${servicesTotal.toFixed(2)} total)
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handlePayment}
                      disabled={processing}
                    >
                      {processing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm & Pay ${depositAmount.toFixed(2)}
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By confirming, you agree to our terms of service and booking policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}