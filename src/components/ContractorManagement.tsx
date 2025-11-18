import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Contractor } from '../types/financial';
import { Eye, FileText, AlertCircle } from 'lucide-react';

interface ContractorManagementProps {
  contractors: Contractor[];
  onViewDetails?: (contractor: Contractor) => void;
  onGenerateInvoice?: (contractor: Contractor) => void;
}

export function ContractorManagement({ 
  contractors, 
  onViewDetails, 
  onGenerateInvoice 
}: ContractorManagementProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Pending': return 'secondary';
      case 'Completed': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contractor Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contract Value</TableHead>
                <TableHead>Invoiced</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((contractor) => {
                const invoicedPercentage = ((contractor.invoiced / contractor.totalContract) * 100).toFixed(0);
                
                return (
                  <TableRow key={contractor.id}>
                    <TableCell>
                      <div>
                        <div>{contractor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contractor.startDate} - {contractor.endDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contractor.department}</TableCell>
                    <TableCell>${(contractor.totalContract / 1000).toFixed(0)}K</TableCell>
                    <TableCell>
                      <div>
                        <div>${(contractor.invoiced / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">{invoicedPercentage}%</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {contractor.outstanding > 0 && (
                          <AlertCircle className="size-4 text-orange-500" />
                        )}
                        ${(contractor.outstanding / 1000).toFixed(0)}K
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(contractor.status)}>
                        {contractor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(contractor.priority)}>
                        {contractor.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onViewDetails?.(contractor)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => onGenerateInvoice?.(contractor)}
                          disabled={contractor.outstanding === 0}
                        >
                          <FileText className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
