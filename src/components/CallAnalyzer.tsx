
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Mic, MicOff, Shield, ShieldCheck, Volume, VolumeX } from "lucide-react";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { mockTranscriptionResults } from "@/lib/mock-data";
import { TranscriptionResult } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const CallAnalyzer = () => {
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [transcriptionIndex, setTranscriptionIndex] = useState(0);
  const [currentTranscription, setCurrentTranscription] = useState<TranscriptionResult | null>(null);
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const startRecording = () => {
    setRecording(true);
    toast({
      title: "Recording started",
      description: "CallShield is now listening to your conversation."
    });
    
    // Simulate recording for 3 seconds then auto-transcribe
    setTimeout(() => {
      setRecording(false);
      startTranscription();
    }, 3000);
  };

  const stopRecording = () => {
    setRecording(false);
    toast({
      title: "Recording stopped",
      description: "Recording has been saved."
    });
  };

  const startTranscription = () => {
    setTranscribing(true);
    
    // Simulate transcription processing
    setTimeout(() => {
      setTranscribing(false);
      startAnalysis();
    }, 2000);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    
    // Simulate analysis processing
    setTimeout(() => {
      setAnalyzing(false);
      setCurrentTranscription(mockTranscriptionResults[transcriptionIndex]);
      setTranscriptionIndex((transcriptionIndex + 1) % mockTranscriptionResults.length);
    }, 1500);
  };

  const analyzeManualInput = () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate analysis processing
    setTimeout(() => {
      setAnalyzing(false);
      const randomIndex = Math.floor(Math.random() * mockTranscriptionResults.length);
      const result = {
        ...mockTranscriptionResults[randomIndex],
        text: inputText
      };
      setCurrentTranscription(result);
    }, 1500);
  };

  const resetAnalysis = () => {
    setCurrentTranscription(null);
    setInputText("");
  };

  const getProgressColorClass = (probability: number): string => {
    if (probability > 70) return "bg-scam-critical";
    if (probability > 40) return "bg-scam-medium";
    return "bg-scam-low";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mic className="mr-2 h-5 w-5 text-app-teal" />
            Real-time Call Analysis
          </CardTitle>
          <CardDescription>
            Record a phone call to analyze for potential scam attempts
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {recording ? (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-app-teal flex items-center justify-center">
                  <Volume className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-app-teal animate-pulse-ring"></div>
              </div>
              
              <div className="flex space-x-1 h-8 items-end mb-2">
                <div className="w-1 bg-app-teal h-3 animate-wave-1 rounded"></div>
                <div className="w-1 bg-app-teal h-5 animate-wave-2 rounded"></div>
                <div className="w-1 bg-app-teal h-7 animate-wave-3 rounded"></div>
                <div className="w-1 bg-app-teal h-4 animate-wave-4 rounded"></div>
                <div className="w-1 bg-app-teal h-6 animate-wave-5 rounded"></div>
                <div className="w-1 bg-app-teal h-3 animate-wave-1 rounded"></div>
                <div className="w-1 bg-app-teal h-5 animate-wave-2 rounded"></div>
              </div>
              
              <p className="text-sm text-slate-500 mb-4">Recording in progress...</p>
              
              <Button 
                variant="outline" 
                className="border-app-crimson text-app-crimson hover:bg-app-crimson/10"
                onClick={stopRecording}
              >
                <MicOff className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            </div>
          ) : transcribing ? (
            <div className="p-6 flex flex-col items-center">
              <p className="text-slate-700 mb-3">Transcribing audio...</p>
              <Progress value={65} className="w-full mb-2" />
            </div>
          ) : analyzing ? (
            <div className="p-6 flex flex-col items-center">
              <Shield className="h-10 w-10 text-app-teal mb-3 animate-pulse" />
              <p className="text-slate-700 mb-3">Analyzing for scam patterns...</p>
              <Progress value={80} className="w-full mb-2" />
            </div>
          ) : currentTranscription ? (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Transcription Result</h3>
              <p className="text-slate-600 text-sm mb-4 bg-slate-50 p-2 rounded">
                {currentTranscription.text}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Scam Probability:</span>
                <div className="flex items-center">
                  <Progress 
                    value={currentTranscription.scamProbability} 
                    className={`w-24 mr-2 ${getProgressColorClass(currentTranscription.scamProbability)}`}
                  />
                  <span className="text-sm font-medium">
                    {currentTranscription.scamProbability}%
                  </span>
                </div>
              </div>
              
              {currentTranscription.flags && currentTranscription.flags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Detected Flags:</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentTranscription.flags.map((flag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Button variant="outline" size="sm" onClick={resetAnalysis}>
                Analyze Another
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-lg">
              <ShieldCheck className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-slate-500 mb-3 text-center">
                Click the button below to start recording a call for analysis
              </p>
              <Button onClick={startRecording}>
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-app-teal" />
            Text Analysis
          </CardTitle>
          <CardDescription>
            Paste a call transcript to analyze it for potential scam attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyzing ? (
            <div className="p-6 flex flex-col items-center">
              <Shield className="h-10 w-10 text-app-teal mb-3 animate-pulse" />
              <p className="text-slate-700 mb-3">Analyzing text for scam patterns...</p>
              <Progress value={80} className="w-full mb-2" />
            </div>
          ) : currentTranscription ? (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Analysis Result</h3>
              <p className="text-slate-600 text-sm mb-4 bg-slate-50 p-2 rounded">
                {currentTranscription.text}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Scam Probability:</span>
                <div className="flex items-center">
                  <Progress 
                    value={currentTranscription.scamProbability} 
                    className={`w-24 mr-2 ${getProgressColorClass(currentTranscription.scamProbability)}`}
                  />
                  <span className="text-sm font-medium">
                    {currentTranscription.scamProbability}%
                  </span>
                </div>
              </div>
              
              {currentTranscription.flags && currentTranscription.flags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Detected Flags:</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentTranscription.flags.map((flag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Button variant="outline" size="sm" onClick={resetAnalysis}>
                Analyze Another
              </Button>
            </div>
          ) : (
            <div>
              <Textarea 
                placeholder="Paste a call transcript here or type an example..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[150px] mb-4"
              />
              <Button 
                onClick={analyzeManualInput}
                className="w-full bg-app-teal hover:bg-app-teal/80"
              >
                <Shield className="h-4 w-4 mr-2" />
                Analyze Text
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CallAnalyzer;
