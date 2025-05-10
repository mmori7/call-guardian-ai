
import Layout from "@/components/Layout";
import CallStatistics from "@/components/CallStatistics";

const Analytics = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Call Analytics</h1>
        <p className="text-slate-600">
          Insights into your call patterns and scam detection statistics
        </p>
      </div>
      
      <CallStatistics />
    </Layout>
  );
};

export default Analytics;
