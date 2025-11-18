export interface Department {
  id: string;
  name: string;
  budget: number;
  spent: number;
  remaining: number;
  priority: 'High' | 'Medium' | 'Low';
  head: string;
  color: string;
}

export interface Contractor {
  id: string;
  name: string;
  department: string;
  totalContract: number;
  invoiced: number;
  outstanding: number;
  status: 'Active' | 'Pending' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  startDate: string;
  endDate: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  contractor: string;
  department: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}

export interface BudgetAllocation {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string;
  budgeted: number;
  actual: number;
  forecast: number;
}

export interface Report {
  id: string;
  title: string;
  type: 'Monthly' | 'Quarterly' | 'Annual' | 'Custom';
  generatedDate: string;
  generatedBy: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  nextRun?: string;
}
