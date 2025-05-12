
import { Call, ScamStats, TranscriptionResult } from './types';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchCalls(): Promise<Call[]> {
  try {
    const response = await fetch(`${API_URL}/api/calls`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch calls:', error);
    toast.error('Failed to fetch calls');
    return [];
  }
}

export async function createCall(callData: Omit<Call, 'id' | 'scamProbability' | 'transcription' | 'flags'>): Promise<Call | null> {
  try {
    const response = await fetch(`${API_URL}/api/calls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to create call:', error);
    toast.error('Failed to create call');
    return null;
  }
}

export async function analyzeCall(callId: string): Promise<TranscriptionResult | null> {
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ call_id: callId }),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to analyze call:', error);
    toast.error('Failed to analyze call');
    return null;
  }
}

export async function fetchStats(): Promise<ScamStats | null> {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    toast.error('Failed to fetch statistics');
    return null;
  }
}
