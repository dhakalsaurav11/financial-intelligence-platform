import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { DashboardHeader } from './components/DashboardHeader';
import { DepartmentOverview } from './components/DepartmentOverview';
import { BudgetCharts } from './components/BudgetCharts';
import { ContractorManagement } from './components/ContractorManagement';
import { InvoiceManagement } from './components/InvoiceManagement';
import { ReportingAutomation } from './components/ReportingAutomation';
import { InvoiceGenerator, InvoiceData } from './components/InvoiceGenerator';
import { departments, contractors, invoices, budgetAllocations, monthlySpending, reports } from './data/mockData';
import { Department, Contractor, Invoice, Report } from './types/financial';
import { BarChart3, Users, FileText, Calendar, LayoutDashboard } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [invoiceGeneratorOpen, setInvoiceGeneratorOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | undefined>();

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = departments.reduce((sum, dept) => sum + dept.spent, 0);
  const totalRemaining = departments.reduce((sum, dept) => sum + dept.remaining, 0);

  const handleRefresh = () => {
    toast.success('Data refreshed successfully');
  };

  const handleExport = () => {
    toast.success('Exporting comprehensive financial report...');
  };

  const handleDepartmentClick = (dept: Department) => {
    toast.info(`Viewing details for ${dept.name} department`);
  };

  const handleViewContractorDetails = (contractor: Contractor) => {
    toast.info(`Viewing details for ${contractor.name}`);
  };

  const handleGenerateInvoice = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setInvoiceGeneratorOpen(true);
  };

  const handleInvoiceGenerated = (invoiceData: InvoiceData) => {
    toast.success(`Invoice generated for ${invoiceData.contractorName}`, {
      description: `Amount: $${invoiceData.amount.toLocaleString()} | Due: ${invoiceData.dueDate}`
    });
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Downloading ${invoice.invoiceNumber}`);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    toast.success(`Sending ${invoice.invoiceNumber} via Power Automate`);
  };

  const handleMarkPaid = (invoice: Invoice) => {
    toast.success(`Marked ${invoice.invoiceNumber} as paid`);
  };

  const handleDownloadReport = (report: Report) => {
    toast.success(`Downloading ${report.title}`);
  };

  const handleScheduleReport = (report: Report) => {
    toast.success(`Scheduling ${report.title} via Power Automate`);
  };

  const handleEditReport = (report: Report) => {
    toast.info(`Editing ${report.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <DashboardHeader
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        totalRemaining={totalRemaining}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <div className="max-w-[1600px] mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="size-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contractors" className="flex items-center gap-2">
              <Users className="size-4" />
              Contractors
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="size-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Calendar className="size-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BudgetCharts
                  departments={departments}
                  budgetAllocations={budgetAllocations}
                  monthlySpending={monthlySpending}
                />
              </div>
              <div>
                <DepartmentOverview
                  departments={departments}
                  onDepartmentClick={handleDepartmentClick}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <BudgetCharts
              departments={departments}
              budgetAllocations={budgetAllocations}
              monthlySpending={monthlySpending}
            />
          </TabsContent>

          <TabsContent value="contractors" className="space-y-6">
            <ContractorManagement
              contractors={contractors}
              onViewDetails={handleViewContractorDetails}
              onGenerateInvoice={handleGenerateInvoice}
            />
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <InvoiceManagement
              invoices={invoices}
              onDownloadInvoice={handleDownloadInvoice}
              onSendInvoice={handleSendInvoice}
              onMarkPaid={handleMarkPaid}
            />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportingAutomation
              reports={reports}
              onDownloadReport={handleDownloadReport}
              onScheduleReport={handleScheduleReport}
              onEditReport={handleEditReport}
            />
          </TabsContent>
        </Tabs>
      </div>

      <InvoiceGenerator
        open={invoiceGeneratorOpen}
        onClose={() => setInvoiceGeneratorOpen(false)}
        contractor={selectedContractor}
        onGenerate={handleInvoiceGenerated}
      />
    </div>
  );
}