
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStats } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ScamStats } from "@/lib/types";
import { useState, useEffect } from "react";

const COLORS = ['#0A2647', '#159895', '#FF9F29', '#CE1212', '#0088FE'];

const CallStatistics = () => {
  const [stats, setStats] = useState<ScamStats | null>(null);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setStats(mockStats);
  }, []);
  
  if (!stats) {
    return <div>Loading statistics...</div>;
  }
  
  // Calculate percentage for scam calls
  const scamPercentage = Math.round((stats.scamCalls / stats.totalCalls) * 100);
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'Safe Calls', value: stats.totalCalls - stats.scamCalls },
    { name: 'Scam Calls', value: stats.scamCalls },
    { name: 'Blocked Calls', value: stats.blockedCalls },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{stats.totalCalls}</CardTitle>
          <CardDescription>Total Calls</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-app-amber">{stats.scamCalls}</CardTitle>
          <CardDescription>Detected Scams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {scamPercentage}% of total calls
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-app-crimson">{stats.blockedCalls}</CardTitle>
          <CardDescription>Blocked Calls</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-app-teal">{stats.commonScamTypes[0]?.type || "N/A"}</CardTitle>
          <CardDescription>Top Scam Type</CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Calls by Risk Level</CardTitle>
          <CardDescription>Distribution of calls detected in the past 30 days</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Scam Calls by Day</CardTitle>
          <CardDescription>Number of detected scam calls in the past week</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.riskByDay}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#159895" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Common Scam Types</CardTitle>
          <CardDescription>Distribution of different scam types detected</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.commonScamTypes}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="type" />
              <Tooltip />
              <Bar dataKey="count" fill="#0A2647" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStatistics;
