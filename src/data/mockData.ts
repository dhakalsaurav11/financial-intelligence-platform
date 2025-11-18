import { Department, Contractor, Invoice, BudgetAllocation, MonthlySpending, Report } from '../types/financial';

export const departments: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering',
    budget: 2500000,
    spent: 1850000,
    remaining: 650000,
    priority: 'High',
    head: 'Sarah Chen',
    color: '#3b82f6'
  },
  {
    id: 'dept-2',
    name: 'Marketing',
    budget: 1200000,
    spent: 980000,
    remaining: 220000,
    priority: 'High',
    head: 'Michael Torres',
    color: '#8b5cf6'
  },
  {
    id: 'dept-3',
    name: 'Operations',
    budget: 1800000,
    spent: 1200000,
    remaining: 600000,
    priority: 'Medium',
    head: 'Jennifer Park',
    color: '#10b981'
  },
  {
    id: 'dept-4',
    name: 'Sales',
    budget: 1500000,
    spent: 1150000,
    remaining: 350000,
    priority: 'High',
    head: 'David Williams',
    color: '#f59e0b'
  },
  {
    id: 'dept-5',
    name: 'HR & Admin',
    budget: 800000,
    spent: 620000,
    remaining: 180000,
    priority: 'Medium',
    head: 'Amanda Foster',
    color: '#ec4899'
  },
  {
    id: 'dept-6',
    name: 'Finance',
    budget: 600000,
    spent: 450000,
    remaining: 150000,
    priority: 'Low',
    head: 'Robert Kim',
    color: '#06b6d4'
  }
];

export const contractors: Contractor[] = [
  {
    id: 'cont-1',
    name: 'TechCorp Solutions',
    department: 'Engineering',
    totalContract: 450000,
    invoiced: 300000,
    outstanding: 150000,
    status: 'Active',
    priority: 'High',
    startDate: '2025-01-15',
    endDate: '2025-12-31'
  },
  {
    id: 'cont-2',
    name: 'Creative Digital Agency',
    department: 'Marketing',
    totalContract: 280000,
    invoiced: 180000,
    outstanding: 100000,
    status: 'Active',
    priority: 'High',
    startDate: '2025-02-01',
    endDate: '2025-11-30'
  },
  {
    id: 'cont-3',
    name: 'CloudOps Consulting',
    department: 'Operations',
    totalContract: 320000,
    invoiced: 320000,
    outstanding: 0,
    status: 'Completed',
    priority: 'Medium',
    startDate: '2024-06-01',
    endDate: '2025-05-31'
  },
  {
    id: 'cont-4',
    name: 'DataViz Pro',
    department: 'Finance',
    totalContract: 125000,
    invoiced: 75000,
    outstanding: 50000,
    status: 'Active',
    priority: 'Medium',
    startDate: '2025-03-01',
    endDate: '2025-09-30'
  },
  {
    id: 'cont-5',
    name: 'Workforce Dynamics',
    department: 'HR & Admin',
    totalContract: 180000,
    invoiced: 120000,
    outstanding: 60000,
    status: 'Active',
    priority: 'Low',
    startDate: '2025-01-01',
    endDate: '2025-12-31'
  },
  {
    id: 'cont-6',
    name: 'SalesBoost Inc',
    department: 'Sales',
    totalContract: 200000,
    invoiced: 150000,
    outstanding: 50000,
    status: 'Active',
    priority: 'High',
    startDate: '2025-04-01',
    endDate: '2025-10-31'
  },
  {
    id: 'cont-7',
    name: 'DevSecOps Partners',
    department: 'Engineering',
    totalContract: 380000,
    invoiced: 190000,
    outstanding: 190000,
    status: 'Pending',
    priority: 'High',
    startDate: '2025-05-01',
    endDate: '2026-04-30'
  }
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2025-001',
    contractor: 'TechCorp Solutions',
    department: 'Engineering',
    amount: 75000,
    status: 'Paid',
    issueDate: '2025-09-01',
    dueDate: '2025-09-30',
    description: 'Q3 Development Services - Phase 1'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2025-002',
    contractor: 'Creative Digital Agency',
    department: 'Marketing',
    amount: 45000,
    status: 'Pending',
    issueDate: '2025-10-01',
    dueDate: '2025-10-31',
    description: 'October Campaign Creative Assets'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2025-003',
    contractor: 'DataViz Pro',
    department: 'Finance',
    amount: 25000,
    status: 'Overdue',
    issueDate: '2025-08-15',
    dueDate: '2025-09-15',
    description: 'Dashboard Implementation - August'
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2025-004',
    contractor: 'SalesBoost Inc',
    department: 'Sales',
    amount: 50000,
    status: 'Paid',
    issueDate: '2025-09-15',
    dueDate: '2025-10-15',
    description: 'Sales Training Program - September'
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-2025-005',
    contractor: 'Workforce Dynamics',
    department: 'HR & Admin',
    amount: 30000,
    status: 'Pending',
    issueDate: '2025-10-10',
    dueDate: '2025-11-10',
    description: 'Recruitment Services - October'
  },
  {
    id: 'inv-6',
    invoiceNumber: 'INV-2025-006',
    contractor: 'TechCorp Solutions',
    department: 'Engineering',
    amount: 75000,
    status: 'Pending',
    issueDate: '2025-10-01',
    dueDate: '2025-10-31',
    description: 'Q4 Development Services - Phase 2'
  }
];

export const budgetAllocations: BudgetAllocation[] = [
  { category: 'Personnel', amount: 4200000, percentage: 48.8 },
  { category: 'Contractors', amount: 1935000, percentage: 22.5 },
  { category: 'Infrastructure', amount: 1200000, percentage: 14.0 },
  { category: 'Marketing', amount: 800000, percentage: 9.3 },
  { category: 'Other', amount: 465000, percentage: 5.4 }
];

export const monthlySpending: MonthlySpending[] = [
  { month: 'Apr', budgeted: 650000, actual: 620000, forecast: 620000 },
  { month: 'May', budgeted: 680000, actual: 695000, forecast: 695000 },
  { month: 'Jun', budgeted: 720000, actual: 710000, forecast: 710000 },
  { month: 'Jul', budgeted: 700000, actual: 730000, forecast: 730000 },
  { month: 'Aug', budgeted: 690000, actual: 680000, forecast: 680000 },
  { month: 'Sep', budgeted: 710000, actual: 725000, forecast: 725000 },
  { month: 'Oct', budgeted: 740000, actual: 0, forecast: 750000 },
  { month: 'Nov', budgeted: 750000, actual: 0, forecast: 760000 },
  { month: 'Dec', budgeted: 800000, actual: 0, forecast: 820000 }
];

export const reports: Report[] = [
  {
    id: 'rep-1',
    title: 'Q3 2025 Financial Review',
    type: 'Quarterly',
    generatedDate: '2025-10-01',
    generatedBy: 'Robert Kim',
    status: 'Published'
  },
  {
    id: 'rep-2',
    title: 'September 2025 Budget Analysis',
    type: 'Monthly',
    generatedDate: '2025-10-05',
    generatedBy: 'System Auto',
    status: 'Published'
  },
  {
    id: 'rep-3',
    title: 'Contractor Performance Review',
    type: 'Custom',
    generatedDate: '2025-10-12',
    generatedBy: 'Sarah Chen',
    status: 'Draft'
  },
  {
    id: 'rep-4',
    title: 'October 2025 Budget Analysis',
    type: 'Monthly',
    generatedDate: '2025-11-01',
    generatedBy: 'System Auto',
    status: 'Scheduled',
    nextRun: '2025-11-01'
  },
  {
    id: 'rep-5',
    title: 'Annual Budget Forecast 2026',
    type: 'Annual',
    generatedDate: '2025-10-15',
    generatedBy: 'Robert Kim',
    status: 'Draft'
  }
];
