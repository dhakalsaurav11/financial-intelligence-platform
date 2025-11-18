import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Department, BudgetAllocation, MonthlySpending } from '../types/financial';

interface BudgetChartsProps {
  departments: Department[];
  budgetAllocations: BudgetAllocation[];
  monthlySpending: MonthlySpending[];
}

export function BudgetCharts({ departments, budgetAllocations, monthlySpending }: BudgetChartsProps) {
  const departmentData = departments.map(dept => ({
    name: dept.name,
    value: dept.budget,
    color: dept.color
  }));

  const priorityData = [
    {
      name: 'High Priority',
      value: departments.filter(d => d.priority === 'High').reduce((sum, d) => sum + d.budget, 0),
      color: '#ef4444'
    },
    {
      name: 'Medium Priority',
      value: departments.filter(d => d.priority === 'Medium').reduce((sum, d) => sum + d.budget, 0),
      color: '#f59e0b'
    },
    {
      name: 'Low Priority',
      value: departments.filter(d => d.priority === 'Low').reduce((sum, d) => sum + d.budget, 0),
      color: '#10b981'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-blue-600">
            ${(payload[0].value / 1000000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget by Priority Level</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Budget']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Spending Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="budgeted" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Budgeted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Actual"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Forecast"
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Overall Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetAllocations.map((allocation, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span>{allocation.category}</span>
                  <span className="text-muted-foreground">
                    ${(allocation.amount / 1000000).toFixed(2)}M ({allocation.percentage}%)
                  </span>
                </div>
                <Progress value={allocation.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}