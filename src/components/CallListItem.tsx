
import { Call } from "@/lib/types";
import ScamBadge from "./ScamBadge";
import { formatDistanceToNow } from "date-fns";
import { Shield, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CallListItemProps {
  call: Call;
  onClick?: (call: Call) => void;
}

const CallListItem = ({ call, onClick }: CallListItemProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleClick = () => {
    setExpanded(!expanded);
    if (onClick) onClick(call);
  };
  
  const formattedTime = formatDistanceToNow(new Date(call.timestamp), { addSuffix: true });
  const formattedDuration = `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, '0')}`;
  
  return (
    <div 
      className={cn(
        "bg-white border rounded-lg shadow-sm mb-4 overflow-hidden transition-all duration-200",
        call.scamProbability > 70 && "border-scam-critical border-opacity-30",
        expanded ? "shadow-md" : "hover:shadow-md"
      )}
    >
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <div className={`rounded-full p-2 ${call.scamProbability > 70 ? 'bg-scam-high bg-opacity-10' : 'bg-slate-100'}`}>
              {call.scamProbability > 70 ? 
                <Shield className="h-6 w-6 text-app-crimson" /> : 
                <Phone className="h-6 w-6 text-app-darkBlue" />
              }
            </div>
          </div>
          
          <div>
            <div className="font-medium text-slate-900">{call.caller || "Unknown Caller"}</div>
            <div className="text-sm text-slate-500">{call.phoneNumber}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm text-slate-500">{formattedTime}</div>
            <div className="text-xs text-slate-400">{formattedDuration}</div>
          </div>
          
          <ScamBadge probability={call.scamProbability} />
        </div>
      </div>
      
      {expanded && call.transcription && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-slate-700 mb-1">Call Transcription</h4>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-100">
              {call.transcription}
            </p>
          </div>
          
          {call.flags && call.flags.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-slate-700 mb-1">Detected Flags</h4>
              <div className="flex flex-wrap gap-2">
                {call.flags.map((flag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">
              Report as Safe
            </Button>
            <Button variant="default" size="sm" className="bg-app-teal hover:bg-app-teal/80">
              Block Number
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallListItem;
