
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  ...props
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 shadow-soft card-highlight",
        className
      )}
      {...props}
    >
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">
            {value}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  {
                    "bg-grant-green/10 text-grant-green": trend === "up",
                    "bg-grant-red/10 text-grant-red": trend === "down",
                    "bg-muted text-muted-foreground": trend === "neutral",
                  }
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "○"} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
