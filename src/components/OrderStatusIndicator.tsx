import React from 'react';
import { Badge } from "@/components/ui/badge"; // Using shadcn Badge for visual consistency
import { cn } from '@/lib/utils';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded' | 'On Hold';

interface OrderStatusIndicatorProps {
  status: OrderStatus;
}

const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Processing: "bg-blue-100 text-blue-800 border-blue-300",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Delivered: "bg-green-100 text-green-800 border-green-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
  Refunded: "bg-purple-100 text-purple-800 border-purple-300",
  'On Hold': "bg-gray-100 text-gray-800 border-gray-300",
};

const OrderStatusIndicator: React.FC<OrderStatusIndicatorProps> = ({ status }) => {
  console.log("Rendering OrderStatusIndicator with status:", status);

  const colorClasses = statusColors[status] || statusColors['On Hold']; // Default to 'On Hold' style if status is unknown

  return (
    <Badge variant="outline" className={cn("capitalize px-2.5 py-0.5 text-xs font-semibold", colorClasses)}>
      {status.toLowerCase()}
    </Badge>
  );
}
export default OrderStatusIndicator;