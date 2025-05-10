
export interface Call {
  id: string;
  phoneNumber: string;
  caller: string | null;
  duration: number; // seconds
  timestamp: string;
  scamProbability: number; // 0-100
  transcription: string | null;
  flags: string[];
  recording: string | null; // URL to recording
}

export type ScamLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ScamStats {
  totalCalls: number;
  scamCalls: number;
  blockedCalls: number;
  commonScamTypes: {
    type: string;
    count: number;
  }[];
  riskByDay: {
    date: string;
    count: number;
  }[];
}

export interface TranscriptionResult {
  text: string;
  scamProbability: number;
  flags: string[];
}

export interface VoiceAnalysisResult {
  isHuman: boolean;
  confidence: number;
  markers: string[];
}
