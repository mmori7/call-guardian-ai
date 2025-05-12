
import { useEffect, useState } from "react";
import { Call } from "@/lib/types";
import CallListItem from "./CallListItem";
import { Input } from "./ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { fetchCalls } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const CallList = () => {
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [filterText, setFilterText] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  
  const { data: calls = [], isLoading, error } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls
  });
  
  useEffect(() => {
    if (!calls) return;
    
    let filtered = [...calls];
    
    // Apply text filter
    if (filterText) {
      const searchTerm = filterText.toLowerCase();
      filtered = filtered.filter(call => 
        (call.caller?.toLowerCase().includes(searchTerm) || false) || 
        call.phoneNumber.toLowerCase().includes(searchTerm) ||
        (call.transcription?.toLowerCase().includes(searchTerm) || false)
      );
    }
    
    // Apply risk filter
    if (filterRisk !== "all") {
      filtered = filtered.filter(call => {
        if (filterRisk === "low") return call.scamProbability < 30;
        if (filterRisk === "medium") return call.scamProbability >= 30 && call.scamProbability < 60;
        if (filterRisk === "high") return call.scamProbability >= 60 && call.scamProbability < 85;
        if (filterRisk === "critical") return call.scamProbability >= 85;
        return true;
      });
    }
    
    setFilteredCalls(filtered);
  }, [filterText, filterRisk, calls]);
  
  if (isLoading) {
    return <div className="text-center py-8">Loading calls...</div>;
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading calls: {(error as Error).message}</div>;
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by caller, number, or content..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="critical">Critical Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        {filteredCalls.length > 0 ? (
          filteredCalls.map(call => (
            <CallListItem key={call.id} call={call} />
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            No calls matching your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default CallList;
