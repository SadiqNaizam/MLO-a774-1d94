import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Search, Filter, PlusCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const sampleProducts: Product[] = [
  { id: 'PROD001', name: 'Eco-Friendly Water Bottle', sku: 'ECO-WB-001', category: 'Drinkware', price: 25.99, stock: 150, imageUrl: 'https://picsum.photos/seed/bottle/40/40' },
  { id: 'PROD002', name: 'Organic Cotton T-Shirt', sku: 'ORG-TS-002', category: 'Apparel', price: 39.99, stock: 200, imageUrl: 'https://picsum.photos/seed/tshirt/40/40' },
  { id: 'PROD003', name: 'Bluetooth Noise-Cancelling Headphones', sku: 'TECH-HP-003', category: 'Electronics', price: 199.50, stock: 75, imageUrl: 'https://picsum.photos/seed/headphones/40/40' },
  { id: 'PROD004', name: 'Artisan Coffee Beans', sku: 'FOOD-CB-004', category: 'Groceries', price: 18.75, stock: 300, imageUrl: 'https://picsum.photos/seed/coffee/40/40' },
  { id: 'PROD005', name: 'Yoga Mat Premium', sku: 'FIT-YM-005', category: 'Fitness', price: 45.00, stock: 120, imageUrl: 'https://picsum.photos/seed/yogamat/40/40' },
];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Products Catalog</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')} className="mr-2">
                Switch to {viewMode === 'table' ? 'Grid' : 'Table'} View
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="flex-grow p-6 space-y-6">
          {/* Filters Section */}
          <section className="p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="space-y-1">
                <label htmlFor="searchProduct" className="text-sm font-medium text-gray-700">Search Product</label>
                <Input id="searchProduct" placeholder="Name, SKU..." icon={<Search className="h-4 w-4 text-gray-400" />} />
              </div>
              <div className="space-y-1">
                <label htmlFor="categoryFilter" className="text-sm font-medium text-gray-700">Category</label>
                <Select>
                  <SelectTrigger id="categoryFilter">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="drinkware">Drinkware</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full md:w-auto self-end">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </section>

          {/* Products Display Section */}
          {viewMode === 'table' ? (
            <section className="bg-white rounded-lg shadow overflow-x-auto">
              <Table>
                <TableCaption>A list of all products.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={product.imageUrl} alt={product.name} />
                          <AvatarFallback>{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                   <CardHeader className="p-0">
                    <img src={product.imageUrl || `https://via.placeholder.com/300x200.png?text=${product.name.replace(/\s+/g, '+')}`} alt={product.name} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mb-2">SKU: {product.sku} | Category: {product.category}</CardDescription>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </section>
          )}
          
          {/* Pagination Section */}
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;