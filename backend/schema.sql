
-- Create calls table
CREATE TABLE IF NOT EXISTS public.calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "phoneNumber" TEXT NOT NULL,
  caller TEXT,
  duration INTEGER NOT NULL,
  "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "scamProbability" FLOAT DEFAULT 0,
  transcription TEXT,
  flags TEXT[] DEFAULT '{}',
  recording TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analysis_results table for detailed analysis data
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create voice_patterns table
CREATE TABLE IF NOT EXISTS public.voice_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  pattern_data JSONB NOT NULL,
  is_human BOOLEAN,
  confidence FLOAT,
  markers TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Setup RLS policies
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_patterns ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own calls
CREATE POLICY "Users can view own calls"
  ON public.calls FOR SELECT
  USING (auth.uid() = user_id);

-- Allow authenticated users to view analysis results for their own calls
CREATE POLICY "Users can view own analysis results"
  ON public.analysis_results FOR SELECT
  USING ((SELECT user_id FROM public.calls WHERE id = call_id) = auth.uid());

-- Allow authenticated users to view voice patterns for their own calls
CREATE POLICY "Users can view own voice patterns"
  ON public.voice_patterns FOR SELECT
  USING ((SELECT user_id FROM public.calls WHERE id = call_id) = auth.uid());

-- Allow service role (backend) to have full access
CREATE POLICY "Service role has full access to calls"
  ON public.calls FOR ALL
  USING (true);

CREATE POLICY "Service role has full access to analysis results"
  ON public.analysis_results FOR ALL
  USING (true);

CREATE POLICY "Service role has full access to voice patterns"
  ON public.voice_patterns FOR ALL
  USING (true);
