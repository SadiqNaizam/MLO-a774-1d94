import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, ShoppingCart, Package, Users, Settings, BarChart3 } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 }, // Example additional item
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 space-y-4 hidden md:block fixed top-0 left-0 pt-20"> {/* Adjust pt if header height changes */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors",
              location.pathname.startsWith(item.href) ? "bg-gray-200 text-gray-900" : "text-gray-700"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar;