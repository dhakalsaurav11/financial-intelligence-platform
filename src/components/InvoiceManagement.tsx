import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Invoice } from '../types/financial';
import { Download, Send, CheckCircle } from 'lucide-react';

interface InvoiceManagementProps {
  invoices: Invoice[];
  onDownloadInvoice?: (invoice: Invoice) => void;
  onSendInvoice?: (invoice: Invoice) => void;
  onMarkPaid?: (invoice: Invoice) => void;
}

export function InvoiceManagement({ 
  invoices, 
  onDownloadInvoice, 
  onSendInvoice,
  onMarkPaid 
}: InvoiceManagementProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'default';
      case 'Pending': return 'secondary';
      case 'Overdue': return 'destructive';
      default: return 'default';
    }
  };

  const isOverdue = (invoice: Invoice) => {
    const dueDate = new Date(invoice.dueDate);
    const today = new Date();
    return invoice.status !== 'Paid' && dueDate < today;
  };

  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
            <div className="text-2xl text-green-600">${(totalPaid / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Pending Payment</div>
            <div className="text-2xl text-orange-600">${(totalPending / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Overdue</div>
            <div className="text-2xl text-red-600">${(totalOverdue / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className={isOverdue(invoice) ? 'bg-red-50' : ''}>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div>{invoice.contractor}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.department}</TableCell>
                    <TableCell>${(invoice.amount / 1000).toFixed(1)}K</TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onDownloadInvoice?.(invoice)}
                        >
                          <Download className="size-4" />
                        </Button>
                        {invoice.status !== 'Paid' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onSendInvoice?.(invoice)}
                            >
                              <Send className="size-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => onMarkPaid?.(invoice)}
                            >
                              <CheckCircle className="size-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
