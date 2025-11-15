import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Download, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  services: string[];
  petName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  paidDate?: string;
}

interface InvoicesPageProps {
  user: any;
  onNavigate: (page: any) => void;
}

export function InvoicesPage({ user, onNavigate }: InvoicesPageProps) {
  // Mock invoice data
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      date: '2025-01-15',
      dueDate: '2025-02-15',
      services: ['Annual Checkup', 'Vaccination'],
      petName: 'Buddy',
      amount: 150.00,
      status: 'paid',
      paymentMethod: 'Credit Card',
      paidDate: '2025-01-15'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      date: '2025-02-20',
      dueDate: '2025-03-20',
      services: ['Dental Cleaning'],
      petName: 'Whiskers',
      amount: 200.00,
      status: 'pending',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-089',
      date: '2024-11-01',
      dueDate: '2024-12-01',
      services: ['Emergency Visit', 'X-Ray'],
      petName: 'Buddy',
      amount: 450.00,
      status: 'overdue',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-003',
      date: '2025-03-05',
      dueDate: '2025-04-05',
      services: ['Grooming', 'Nail Trim'],
      petName: 'Whiskers',
      amount: 75.00,
      status: 'paid',
      paymentMethod: 'Debit Card',
      paidDate: '2025-03-05'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const filteredInvoices = invoices.filter(inv => 
    filterStatus === 'all' ? true : inv.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'overdue':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = filteredInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const handlePayInvoice = (invoice: Invoice) => {
    // This would integrate with payment processing
    alert(`Payment processing for ${invoice.invoiceNumber} - $${invoice.amount}`);
    // Navigate to checkout or payment page
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-primary mb-2">Invoices</h1>
          <p className="text-muted-foreground">
            Track and manage your veterinary invoices
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalAmount.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.length} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Paid</span>
                <DollarSign className="w-4 h-4 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalPaid.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'paid').length} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Pending</span>
                <Calendar className="w-4 h-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalPending.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'pending').length} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Overdue</span>
                <CreditCard className="w-4 h-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalOverdue.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'overdue').length} invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and manage your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)} className="mb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Invoices Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No invoices found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoiceNumber}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.petName}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {invoice.services.join(', ')}
                          </div>
                        </TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedInvoice(invoice)}
                                >
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Invoice Details</DialogTitle>
                                  <DialogDescription>
                                    Invoice {invoice.invoiceNumber}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedInvoice && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Invoice Number</Label>
                                        <p className="mt-1">{selectedInvoice.invoiceNumber}</p>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <div className="mt-1">
                                          <Badge className={getStatusColor(selectedInvoice.status)}>
                                            {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Date Issued</Label>
                                        <p className="mt-1">{new Date(selectedInvoice.date).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label>Due Date</Label>
                                        <p className="mt-1">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label>Pet</Label>
                                        <p className="mt-1">{selectedInvoice.petName}</p>
                                      </div>
                                      {selectedInvoice.paidDate && (
                                        <div>
                                          <Label>Paid Date</Label>
                                          <p className="mt-1">{new Date(selectedInvoice.paidDate).toLocaleDateString()}</p>
                                        </div>
                                      )}
                                      {selectedInvoice.paymentMethod && (
                                        <div>
                                          <Label>Payment Method</Label>
                                          <p className="mt-1">{selectedInvoice.paymentMethod}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div>
                                      <Label>Services</Label>
                                      <div className="mt-2 space-y-2">
                                        {selectedInvoice.services.map((service, idx) => (
                                          <div key={idx} className="flex justify-between p-2 bg-muted rounded">
                                            <span>{service}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="border-t pt-4">
                                      <div className="flex justify-between">
                                        <span>Total Amount</span>
                                        <span>${selectedInvoice.amount.toFixed(2)}</span>
                                      </div>
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                      <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                      </Button>
                                      {selectedInvoice.status !== 'paid' && (
                                        <Button onClick={() => handlePayInvoice(selectedInvoice)}>
                                          <CreditCard className="w-4 h-4 mr-2" />
                                          Pay Now
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {invoice.status !== 'paid' && (
                              <Button 
                                size="sm"
                                onClick={() => handlePayInvoice(invoice)}
                              >
                                Pay
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
