import { Building2, Download, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  onRefresh?: () => void;
  onExport?: () => void;
}

export function DashboardHeader({ 
  totalBudget, 
  totalSpent, 
  totalRemaining,
  onRefresh,
  onExport
}: DashboardHeaderProps) {
  const spentPercentage = ((totalSpent / totalBudget) * 100).toFixed(1);
  
  return (
    <div className="border-b bg-white p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Building2 className="size-6 text-white" />
          </div>
          <div>
            <h1>Financial Intelligence Platform</h1>
            <p className="text-muted-foreground">Real-time budget tracking and analysis</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="size-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={onExport}>
            <Download className="size-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">Total Budget</div>
          <div className="text-2xl text-blue-900">${(totalBudget / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-600 mb-1">Total Spent ({spentPercentage}%)</div>
          <div className="text-2xl text-orange-900">${(totalSpent / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 mb-1">Remaining Budget</div>
          <div className="text-2xl text-green-900">${(totalRemaining / 1000000).toFixed(2)}M</div>
        </div>
      </div>
    </div>
  );
}
