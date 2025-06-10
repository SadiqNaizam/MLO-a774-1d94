import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // Example icons for trend

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+5.2%"
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
}) => {
  console.log("Rendering KPICard:", title);

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-gray-500 pt-1">{description}</p>}
        {trend && trendValue && (
          <div className={`text-xs ${trendColor} flex items-center pt-1`}>
            <TrendIcon className="h-4 w-4 mr-1" />
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default KPICard;