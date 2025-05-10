
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, ShieldCheck, BarChart2, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CallAnalyzer from "@/components/CallAnalyzer";
import { mockCalls, mockStats } from "@/lib/mock-data";

const Index = () => {
  // Get count of high risk calls (scam probability > 70%)
  const highRiskCallCount = mockCalls.filter(call => call.scamProbability > 70).length;
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CallShield Dashboard</h1>
        <p className="text-slate-600">AI-powered protection from scam calls and fraud</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mockStats.scamCalls}</CardTitle>
            <CardDescription>Scam Calls Detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Total protection score
              </div>
              <div className="text-sm font-medium text-app-teal">
                {mockStats.totalCalls ? Math.round((mockStats.blockedCalls / mockStats.scamCalls) * 100) : 0}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-app-amber">{highRiskCallCount}</CardTitle>
            <CardDescription>High Risk Calls</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/calls">
              <Button variant="outline" size="sm" className="w-full">
                <ShieldCheck className="h-4 w-4 mr-2" />
                View High Risk Calls
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-app-teal">{mockStats.blockedCalls}</CardTitle>
            <CardDescription>Automatically Blocked</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/analytics">
              <Button variant="outline" size="sm" className="w-full">
                <BarChart2 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Try Call Analysis</h2>
        <CallAnalyzer />
      </div>
      
      <div className="bg-slate-50 -mx-4 px-4 py-8 mt-12 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">How CallShield Works</h2>
          <p className="text-slate-600 mb-8">
            CallShield uses advanced AI to protect you from scams, fraud, and unwanted calls
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-app-darkBlue flex items-center justify-center mb-4">
                <PhoneCall className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Call Recording</h3>
              <p className="text-sm text-slate-500">
                CallShield records incoming calls and processes the audio in real-time
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-app-teal flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Speech to Text</h3>
              <p className="text-sm text-slate-500">
                Advanced AI transcribes conversations with high accuracy
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-app-amber flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Scam Detection</h3>
              <p className="text-sm text-slate-500">
                NLP models analyze the content to identify scam patterns and fraudulent intent
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
