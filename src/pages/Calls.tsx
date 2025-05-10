
import Layout from "@/components/Layout";
import CallList from "@/components/CallList";

const Calls = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Call Log</h1>
        <p className="text-slate-600">
          View and analyze your recent calls with AI-powered scam detection
        </p>
      </div>
      
      <CallList />
    </Layout>
  );
};

export default Calls;
