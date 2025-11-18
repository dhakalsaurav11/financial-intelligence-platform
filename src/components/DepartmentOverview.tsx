import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Department } from '../types/financial';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DepartmentOverviewProps {
  departments: Department[];
  onDepartmentClick?: (dept: Department) => void;
}

export function DepartmentOverview({ departments, onDepartmentClick }: DepartmentOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => {
            const spentPercentage = (dept.spent / dept.budget) * 100;
            const isOverBudget = spentPercentage > 90;
            
            return (
              <div 
                key={dept.id} 
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onDepartmentClick?.(dept)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <span>{dept.name}</span>
                      <Badge variant={
                        dept.priority === 'High' ? 'destructive' : 
                        dept.priority === 'Medium' ? 'default' : 
                        'secondary'
                      }>
                        {dept.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Head: {dept.head}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {isOverBudget ? (
                        <TrendingUp className="size-4 text-red-500" />
                      ) : (
                        <TrendingDown className="size-4 text-green-500" />
                      )}
                      <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
                        {spentPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${(dept.spent / 1000).toFixed(0)}K / ${(dept.budget / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
                
                <Progress value={spentPercentage} className="h-2" />
                
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className={dept.remaining < dept.budget * 0.2 ? 'text-orange-600' : 'text-green-600'}>
                    ${(dept.remaining / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
