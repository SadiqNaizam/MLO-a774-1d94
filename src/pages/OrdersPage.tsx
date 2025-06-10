import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import OrderStatusIndicator from '@/components/OrderStatusIndicator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded' | 'On Hold';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: string;
}

const sampleOrders: Order[] = [
  { id: 'ORD001', customerName: 'Alice Wonderland', customerEmail: 'alice@example.com', date: '2024-07-20', status: 'Delivered', total: 120.50, items: [{name: 'Magic Potion', quantity: 1, price: 120.50}], shippingAddress: '123 Rabbit Hole, Wonderland' },
  { id: 'ORD002', customerName: 'Bob The Builder', customerEmail: 'bob@example.com', date: '2024-07-21', status: 'Shipped', total: 75.00, items: [{name: 'Toolkit', quantity: 1, price: 75.00}], shippingAddress: '456 Fixit Lane, Builderville' },
  { id: 'ORD003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', date: '2024-07-22', status: 'Processing', total: 30.25, items: [{name: 'Kite', quantity: 1, price: 30.25}], shippingAddress: '789 Comic Strip, USA' },
  { id: 'ORD004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', date: '2024-07-23', status: 'Pending', total: 250.00, items: [{name: 'Lasso of Truth', quantity: 1, price: 250.00}], shippingAddress: 'Themyscira Island' },
  { id: 'ORD005', customerName: 'Edward Scissorhands', customerEmail: 'edward@example.com', date: '2024-07-23', status: 'Cancelled', total: 55.00, items: [{name: 'Topiary Shears', quantity: 1, price: 55.00}], shippingAddress: 'Gothic Mansion, Suburbia' },
];

const OrdersPage = () => {
  console.log('OrdersPage loaded');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Orders Management</h1>
          <NavigationMenu>
            <NavigationMenuList>
              {/* Add relevant navigation items for orders page if any */}
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="flex-grow p-6 space-y-6">
          {/* Filters Section */}
          <section className="p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-1">
                <label htmlFor="searchOrder" className="text-sm font-medium text-gray-700">Search Order</label>
                <Input id="searchOrder" placeholder="Order ID, Customer..." icon={<Search className="h-4 w-4 text-gray-400" />} />
              </div>
              <div className="space-y-1">
                <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Status</label>
                <Select>
                  <SelectTrigger id="statusFilter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                 <label htmlFor="datePicker" className="text-sm font-medium text-gray-700">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                      id="datePicker"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="w-full md:w-auto self-end">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </section>

          {/* Orders Table Section */}
          <section className="bg-white rounded-lg shadow overflow-x-auto">
            <Table>
              <TableCaption>A list of recent customer orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell><OrderStatusIndicator status={order.status} /></TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>View Details</Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Order Details Dialog */}
            {selectedOrder && (
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                    <DialogDescription>
                      Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail})
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p><strong>Date:</strong> {selectedOrder.date}</p>
                    <p><strong>Status:</strong> <OrderStatusIndicator status={selectedOrder.status} /></p>
                    <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                    <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
                    <div>
                      <strong>Items:</strong>
                      <ul className="list-disc pl-5">
                        {selectedOrder.items.map(item => (
                          <li key={item.name}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setSelectedOrder(null)}>Close</Button>
                    <Button type="button">Update Status</Button>
                  </DialogFooter>
                </DialogContent>
            )}
          </section>
          
          {/* Pagination Section */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
      {/* Dialog component needs to be wrapped in its parent for trigger to work, so we use Dialog root here */}
      <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}> 
        {/* Content is rendered above */}
      </Dialog>
    </div>
  );
};

export default OrdersPage;