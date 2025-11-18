import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Contractor } from '../types/financial';
import { FileText, Download, Send } from 'lucide-react';

interface InvoiceGeneratorProps {
  open: boolean;
  onClose: () => void;
  contractor?: Contractor;
  onGenerate: (invoiceData: InvoiceData) => void;
}

export interface InvoiceData {
  contractorName: string;
  department: string;
  amount: number;
  description: string;
  dueDate: string;
}

export function InvoiceGenerator({ open, onClose, contractor, onGenerate }: InvoiceGeneratorProps) {
  const [formData, setFormData] = useState<InvoiceData>({
    contractorName: contractor?.name || '',
    department: contractor?.department || '',
    amount: 0,
    description: '',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (action: 'generate' | 'send') => {
    onGenerate(formData);
    if (action === 'send') {
      // Simulate sending via Power Automate
      console.log('Sending invoice via Power Automate:', formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Generate Invoice
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractor">Contractor</Label>
              <Input
                id="contractor"
                value={formData.contractorName}
                onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                placeholder="Contractor name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR & Admin">HR & Admin</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter invoice description and line items..."
              rows={4}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded">
                <Send className="size-4 text-white" />
              </div>
              <div>
                <div className="text-sm mb-1">Power Automate Integration</div>
                <p className="text-sm text-muted-foreground">
                  When you click "Generate & Send", the invoice will be automatically created and sent 
                  via your configured Power Automate workflow to the contractor and finance team.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit('generate')}>
            <Download className="size-4 mr-2" />
            Generate Only
          </Button>
          <Button onClick={() => handleSubmit('send')}>
            <Send className="size-4 mr-2" />
            Generate & Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
