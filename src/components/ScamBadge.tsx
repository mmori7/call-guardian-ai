
import { cn } from "@/lib/utils";
import { getScamIndicators } from "@/lib/mock-data";

interface ScamBadgeProps {
  probability: number;
  size?: "sm" | "md" | "lg";
}

const ScamBadge = ({ probability, size = "md" }: ScamBadgeProps) => {
  const { level, color, text } = getScamIndicators(probability);
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5"
  };
  
  return (
    <div className="flex items-center">
      <span 
        className={cn(
          "rounded-full font-medium text-white", 
          color, 
          sizeClasses[size]
        )}
      >
        {text}
      </span>
      <span className="ml-2 text-gray-600 text-sm">{Math.round(probability)}%</span>
    </div>
  );
};

export default ScamBadge;
