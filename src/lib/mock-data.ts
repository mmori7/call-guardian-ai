
import { Call, ScamStats } from "./types";

export const mockCalls: Call[] = [
  {
    id: "c1",
    phoneNumber: "+1 (555) 123-4567",
    caller: "Unknown",
    duration: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    scamProbability: 89,
    transcription: "Hello, this is the IRS calling about your tax refund. We need your social security number to process your payment immediately.",
    flags: ["IRS impersonation", "Requests SSN", "Creates urgency"],
    recording: "/sample1.mp3"
  },
  {
    id: "c2",
    phoneNumber: "+1 (555) 987-6543",
    caller: "Bank of America",
    duration: 126,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    scamProbability: 12,
    transcription: "Hi, this is Bank of America customer service. We're calling to confirm your recent transaction at Target for $52.37.",
    flags: ["Legitimate business", "No personal data requested"],
    recording: "/sample2.mp3"
  },
  {
    id: "c3",
    phoneNumber: "+1 (555) 444-3333",
    caller: "Unknown",
    duration: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    scamProbability: 76,
    transcription: "Congratulations! You've won a free cruise vacation! Press 1 now to claim your prize before it expires.",
    flags: ["Prize notification", "Creates urgency", "Press number request"],
    recording: "/sample3.mp3"
  },
  {
    id: "c4",
    phoneNumber: "+1 (555) 222-1111",
    caller: "Amazon Customer Service",
    duration: 198,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    scamProbability: 94,
    transcription: "Hello this is Amazon security. We detected suspicious activity on your account. We need to verify your credit card number immediately to prevent unauthorized charges.",
    flags: ["Amazon impersonation", "Requests card details", "Creates fear"],
    recording: "/sample4.mp3"
  },
  {
    id: "c5",
    phoneNumber: "+1 (555) 777-8888",
    caller: "Dr. Smith Office",
    duration: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    scamProbability: 3,
    transcription: "Hi, this is Sarah from Dr. Smith's office calling to remind you about your appointment tomorrow at 2:30 PM. Please call us back if you need to reschedule.",
    flags: ["Appointment reminder", "Known business"],
    recording: "/sample5.mp3"
  },
  {
    id: "c6",
    phoneNumber: "+1 (555) 999-0000",
    caller: "Tech Support",
    duration: 312,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    scamProbability: 98,
    transcription: "Hello, we've detected a virus on your Windows computer. I'm calling from Microsoft technical support and need remote access to your computer to remove it immediately.",
    flags: ["Tech support scam", "Microsoft impersonation", "Creates fear", "Requests remote access"],
    recording: "/sample6.mp3"
  }
];

export const mockStats: ScamStats = {
  totalCalls: 127,
  scamCalls: 43,
  blockedCalls: 31,
  commonScamTypes: [
    { type: "Tech Support", count: 12 },
    { type: "IRS Impersonation", count: 9 },
    { type: "Bank Security", count: 8 },
    { type: "Prize Notification", count: 7 },
    { type: "Amazon Support", count: 7 }
  ],
  riskByDay: [
    { date: "2025-05-03", count: 3 },
    { date: "2025-05-04", count: 5 },
    { date: "2025-05-05", count: 9 },
    { date: "2025-05-06", count: 4 },
    { date: "2025-05-07", count: 7 },
    { date: "2025-05-08", count: 12 },
    { date: "2025-05-09", count: 3 },
    { date: "2025-05-10", count: 0 }
  ]
};

export const mockTranscriptionResults = [
  {
    text: "Hello, this is the IRS calling about your tax refund. We need your social security number to process your payment immediately.",
    scamProbability: 89,
    flags: ["IRS impersonation", "Requests SSN", "Creates urgency"]
  },
  {
    text: "Hi, this is Bank of America customer service. We're calling to confirm your recent transaction at Target for $52.37.",
    scamProbability: 12,
    flags: ["Legitimate business", "No personal data requested"]
  },
  {
    text: "Congratulations! You've won a free cruise vacation! Press 1 now to claim your prize before it expires.",
    scamProbability: 76,
    flags: ["Prize notification", "Creates urgency", "Press number request"]
  }
];

export const getScamIndicators = (probability: number) => {
  if (probability < 30) return { level: 'low', color: 'bg-scam-low', text: 'Low Risk' };
  if (probability < 60) return { level: 'medium', color: 'bg-scam-medium', text: 'Medium Risk' };
  if (probability < 85) return { level: 'high', color: 'bg-scam-high', text: 'High Risk' };
  return { level: 'critical', color: 'bg-scam-critical', text: 'Critical Risk' };
};
