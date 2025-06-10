import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Search, UserPlus, Eye } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  lifetimeValue: number;
  lastSeen: string;
  avatarUrl?: string;
}

const sampleCustomers: Customer[] = [
  { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', totalOrders: 12, lifetimeValue: 1250.75, lastSeen: '2 days ago', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
  { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', totalOrders: 5, lifetimeValue: 670.00, lastSeen: '5 hours ago', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
  { id: 'CUST003', name: 'Mike Brown', email: 'mike.brown@example.com', totalOrders: 25, lifetimeValue: 3400.50, lastSeen: '1 week ago', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
  { id: 'CUST004', name: 'Sarah Wilson', email: 'sarah.wilson@example.com', totalOrders: 2, lifetimeValue: 150.20, lastSeen: 'Online', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
  { id: 'CUST005', name: 'David Lee', email: 'david.lee@example.com', totalOrders: 8, lifetimeValue: 980.00, lastSeen: '1 day ago', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
];

const CustomersPage = () => {
  console.log('CustomersPage loaded');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Customer Management</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add New Customer
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="flex-grow p-6 space-y-6">
          {/* Summary Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
                <CardDescription>All registered customers.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{sampleCustomers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New This Month</CardTitle>
                <CardDescription>Customers registered in last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p> {/* Placeholder */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average LTV</CardTitle>
                <CardDescription>Average lifetime value.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$
                  {(sampleCustomers.reduce((acc, curr) => acc + curr.lifetimeValue, 0) / sampleCustomers.length).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Filters and Table Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Customer List</CardTitle>
                  <CardDescription>Browse and manage your customers.</CardDescription>
                </div>
                <Input
                  placeholder="Search customers..."
                  icon={<Search className="h-4 w-4 text-gray-400" />}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableCaption>A list of your customers.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Orders</TableHead>
                    <TableHead className="text-right">Lifetime Value</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell className="text-center">{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">${customer.lifetimeValue.toFixed(2)}</TableCell>
                      <TableCell>{customer.lastSeen}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" /> View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Pagination Section */}
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;