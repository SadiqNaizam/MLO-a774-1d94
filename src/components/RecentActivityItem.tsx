import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For user/item image
import { Clock } from 'lucide-react'; // For timestamp

interface RecentActivityItemProps {
  actorName?: string; // e.g., Customer name or "System"
  actorImageUrl?: string;
  actionDescription: string; // e.g., "placed a new order #12345"
  timestamp: string; // e.g., "5 minutes ago" or a formatted date
  details?: React.ReactNode; // Optional further details or links
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({
  actorName,
  actorImageUrl,
  actionDescription,
  timestamp,
  details,
}) => {
  console.log("Rendering RecentActivityItem:", actionDescription);
  const fallbackInitials = actorName ? actorName.split(' ').map(n => n[0]).join('').toUpperCase() : 'S';

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
      {actorName && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={actorImageUrl} alt={actorName} />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 space-y-1">
        <p className="text-sm text-gray-700">
          {actorName && <span className="font-medium">{actorName}</span>}
          {actorName ? ' ' : ''}{actionDescription}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          {timestamp}
        </div>
        {details && <div className="text-sm text-gray-600 pt-1">{details}</div>}
      </div>
    </div>
  );
}
export default RecentActivityItem;