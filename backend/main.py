
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import json
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(
    title="CallShield API",
    description="Backend API for CallShield - Scam Call Detection Application",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Models
class Call(BaseModel):
    phoneNumber: str
    caller: Optional[str] = None
    duration: int
    timestamp: str
    recording: Optional[str] = None

class CallAnalysisResult(BaseModel):
    scamProbability: float
    transcription: Optional[str] = None
    flags: List[str] = []

class CallResponse(BaseModel):
    id: str
    phoneNumber: str
    caller: Optional[str] = None
    duration: int
    timestamp: str
    scamProbability: float
    transcription: Optional[str] = None
    flags: List[str] = []
    recording: Optional[str] = None

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to CallShield API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/calls", response_model=List[CallResponse])
async def get_calls():
    try:
        response = supabase.table("calls").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch calls: {str(e)}")

@app.post("/api/calls", response_model=CallResponse)
async def create_call(call: Call):
    try:
        response = supabase.table("calls").insert(call.dict()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create call: {str(e)}")

@app.post("/api/analyze", response_model=CallAnalysisResult)
async def analyze_call(call_id: str):
    try:
        # In a real implementation, this would connect to ML services
        # For now, we'll return mock data
        import random
        
        # Get call details
        call_response = supabase.table("calls").select("*").eq("id", call_id).execute()
        if not call_response.data:
            raise HTTPException(status_code=404, detail="Call not found")
            
        # Mock analysis results
        scam_probability = round(random.uniform(0, 100), 2)
        flags = []
        
        if scam_probability > 80:
            flags = ["Urgent action required", "Threatening language", "Government impersonation"]
        elif scam_probability > 50:
            flags = ["Unsolicited offer", "Requesting personal information"]
        elif scam_probability > 30:
            flags = ["Unusual caller behavior"]
        
        transcription = "This is a mock transcription of the call content."
        
        # Update the call record with analysis results
        update_data = {
            "scamProbability": scam_probability,
            "flags": flags,
            "transcription": transcription
        }
        
        supabase.table("calls").update(update_data).eq("id", call_id).execute()
        
        return CallAnalysisResult(
            scamProbability=scam_probability,
            transcription=transcription,
            flags=flags
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/stats")
async def get_stats():
    try:
        # In a real implementation, this would fetch actual statistics from the database
        # For now, we return mock data similar to what's in the frontend
        from datetime import datetime, timedelta
        import random
        
        # Total calls in the system
        calls_response = supabase.table("calls").select("count", count="exact").execute()
        total_calls = calls_response.count if calls_response.count is not None else random.randint(50, 200)
        
        # Mock other statistics
        scam_calls = int(total_calls * random.uniform(0.15, 0.35))
        blocked_calls = int(scam_calls * random.uniform(0.6, 0.9))
        
        # Common scam types
        scam_types = [
            {"type": "Government Impersonation", "count": random.randint(10, 30)},
            {"type": "Bank Fraud", "count": random.randint(8, 25)},
            {"type": "Tech Support", "count": random.randint(5, 20)},
            {"type": "Lottery/Prize", "count": random.randint(3, 15)},
            {"type": "Investment Scam", "count": random.randint(2, 12)}
        ]
        
        # Risk by day for the past week
        risk_by_day = []
        today = datetime.now()
        for i in range(7):
            day = today - timedelta(days=i)
            risk_by_day.append({
                "date": day.strftime("%Y-%m-%d"),
                "count": random.randint(0, 8)
            })
        
        return {
            "totalCalls": total_calls,
            "scamCalls": scam_calls,
            "blockedCalls": blocked_calls,
            "commonScamTypes": scam_types,
            "riskByDay": risk_by_day
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch statistics: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
