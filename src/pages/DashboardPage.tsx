import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import KPICard from '@/components/KPICard';
import RecentActivityItem from '@/components/RecentActivityItem';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, ShoppingCart, Users, Activity, TrendingUp } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Feb', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mar', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Apr', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'May', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jun', sales: Math.floor(Math.random() * 5000) + 1000 },
];

const recentActivities = [
  { actorName: 'Alice Johnson', actionDescription: 'placed a new order #ORD789', timestamp: '2 minutes ago', actorImageUrl: 'https://i.pravatar.cc/150?img=1' },
  { actorName: 'System', actionDescription: 'updated product "Wireless Mouse"', timestamp: '15 minutes ago' },
  { actorName: 'Bob Williams', actionDescription: 'registered a new account', timestamp: '1 hour ago', actorImageUrl: 'https://i.pravatar.cc/150?img=2' },
  { actorName: 'Carol Davis', actionDescription: 'submitted a support ticket', timestamp: '3 hours ago', actorImageUrl: 'https://i.pravatar.cc/150?img=3' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="text-sm text-gray-600 hover:text-gray-900">User Profile</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="text-sm text-gray-600 hover:text-gray-900">Logout</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="flex-grow p-6 space-y-6">
          {/* KPI Cards Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Total Sales" value="$12,345" icon={DollarSign} description="Last 30 days" trend="up" trendValue="+12.5%" />
              <KPICard title="New Orders" value="152" icon={ShoppingCart} description="Today" trend="up" trendValue="+5" />
              <KPICard title="Active Customers" value="87" icon={Users} description="Online now" trend="neutral" trendValue="Steady" />
              <KPICard title="Conversion Rate" value="3.45%" icon={TrendingUp} description="This week" trend="down" trendValue="-0.2%" />
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend This Month</CardTitle>
                <CardDescription>Monthly sales performance.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                      <RechartsTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentActivities.map((activity, index) => (
                    <RecentActivityItem
                      key={index}
                      actorName={activity.actorName}
                      actorImageUrl={activity.actorImageUrl}
                      actionDescription={activity.actionDescription}
                      timestamp={activity.timestamp}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent Orders Table (Example) */}
           <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A quick look at the latest orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#ORD789</TableCell>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell>Processing</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#ORD788</TableCell>
                      <TableCell>Bob Williams</TableCell>
                      <TableCell>Shipped</TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;