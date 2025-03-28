
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Download, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart2,
  PieChart,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

// Sample finance data
const transactions = [
  {
    id: "1",
    date: "2023-10-15",
    description: "Equipment Purchase - Mass Spectrometer",
    type: "Expense",
    amount: 45000,
    category: "Equipment",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "2",
    date: "2023-10-10",
    description: "Q4 2023 Grant Payment",
    type: "Income",
    amount: 175000,
    category: "Grant Payment",
    project: "Novel Biomarkers for Early Cancer Detection",
  },
  {
    id: "3",
    date: "2023-10-05",
    description: "Lab Supplies - Reagents",
    type: "Expense",
    amount: 12500,
    category: "Supplies",
    project: "Immunotherapy Response in Pediatric Patients",
  },
  {
    id: "4",
    date: "2023-09-30",
    description: "Research Assistant Salary",
    type: "Expense",
    amount: 18000,
    category: "Personnel",
    project: "Machine Learning in Precision Medicine",
  },
  {
    id: "5",
    date: "2023-09-25",
    description: "Conference Registration Fees",
    type: "Expense",
    amount: 2500,
    category: "Travel",
    project: "Cardiovascular Health in Urban Populations",
  },
  {
    id: "6",
    date: "2023-09-15",
    description: "Q3 2023 Grant Payment",
    type: "Income",
    amount: 125000,
    category: "Grant Payment",
    project: "Machine Learning in Precision Medicine",
  },
  {
    id: "7",
    date: "2023-09-10",
    description: "Data Storage Services",
    type: "Expense",
    amount: 5000,
    category: "IT Services",
    project: "Neurological Impacts of COVID-19",
  },
];

const monthlyData = [
  { month: 'Jan', income: 250000, expenses: 75000 },
  { month: 'Feb', income: 180000, expenses: 110000 },
  { month: 'Mar', income: 210000, expenses: 145000 },
  { month: 'Apr', income: 190000, expenses: 130000 },
  { month: 'May', income: 220000, expenses: 105000 },
  { month: 'Jun', income: 260000, expenses: 195000 },
  { month: 'Jul', income: 200000, expenses: 170000 },
  { month: 'Aug', income: 180000, expenses: 145000 },
  { month: 'Sep', income: 300000, expenses: 175000 },
  { month: 'Oct', income: 175000, expenses: 78000 },
  { month: 'Nov', income: 0, expenses: 0 },
  { month: 'Dec', income: 0, expenses: 0 },
];

const spendingData = [
  { name: 'Personnel', value: 450000 },
  { name: 'Equipment', value: 220000 },
  { name: 'Supplies', value: 180000 },
  { name: 'Travel', value: 85000 },
  { name: 'IT Services', value: 65000 },
  { name: 'Other', value: 50000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F39C12'];

const Finances = () => {
  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Finances</h1>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Record Transaction
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold mt-1 text-green-500">${totalIncome.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold mt-1 text-red-500">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                  <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                    ${balance.toLocaleString()}
                  </p>
                </div>
                <div className={`h-10 w-10 rounded-full ${balance >= 0 ? 'bg-blue-100' : 'bg-red-100'} flex items-center justify-center`}>
                  <DollarSign className={`h-5 w-5 ${balance >= 0 ? 'text-blue-500' : 'text-red-500'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="charts">Financial Charts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Recent financial transactions across all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "Income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {transaction.type}
                          </span>
                        </TableCell>
                        <TableCell className={transaction.type === "Income" ? "text-green-600" : "text-red-600"}>
                          {transaction.type === "Income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={transaction.project}>
                          {transaction.project}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="charts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Monthly Income vs. Expenses (2023)</CardTitle>
                    <CardDescription>
                      Comparison of monthly income and expenses
                    </CardDescription>
                  </div>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#0088FE" />
                      <Bar dataKey="expenses" name="Expenses" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>
                      Distribution of expenses across categories
                    </CardDescription>
                  </div>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Budget Trends</CardTitle>
                    <CardDescription>
                      Rolling 12-month view of financial activity
                    </CardDescription>
                  </div>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        name="Income" 
                        stroke="#0088FE" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        name="Expenses"
                        stroke="#FF8042" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Finances;
