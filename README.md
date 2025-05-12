
# CallShield - Scam Call Detection Application

CallShield is an AI-powered application designed to detect and protect users from scam and fraudulent phone calls. Using advanced machine learning algorithms, it analyzes call patterns, transcriptions, and voice characteristics to identify potential scams in real-time.

## Features

- **Real-time Call Analysis**: Record and analyze ongoing calls for scam indicators
- **AI-powered Scam Detection**: Utilizes NLP models to identify common scam patterns
- **Call History**: View detailed logs of past calls with risk assessment
- **Analytics Dashboard**: Visualize call patterns and scam statistics
- **Text Analysis**: Paste call transcripts to analyze them for potential scam attempts

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualization
- React Query for state management

### Backend
- Python (FastAPI or Flask) for API development
- Supabase for database, authentication, and file storage
- PostgreSQL for data persistence
- WebSocket support for real-time features

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- Supabase account

### Frontend Setup
1. Clone this repository
```bash
git clone https://github.com/yourusername/callshield.git
cd callshield
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the project root with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

### Backend Setup
1. Navigate to the backend directory
```bash
cd backend
```

2. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your Supabase credentials and other API keys
```

5. Start the backend server
```bash
python main.py
```

## Connecting with Supabase

### Database Schema
1. Create the following tables in your Supabase project:
   - `calls`: For storing call logs and analysis results
   - `users`: For user authentication (managed by Supabase Auth)
   - `analysis_results`: For storing detailed analysis of calls
   - `voice_patterns`: For storing voice liveness detection data

2. Set up Row-Level Security policies for data protection

### Authentication
- The application uses Supabase Authentication
- Implement email/password and social login options
- Set up proper RLS policies to protect user data

### API Integration
1. The Python backend connects to Supabase using the official Python client
2. Authentication is handled via JWTs between frontend, backend, and Supabase
3. Real-time updates use Supabase's real-time features or WebSockets

## API Integration

### Call Recording
- Integration with Twilio API for handling phone calls
- Audio processing pipeline for recording and analyzing calls

### Speech-to-Text
- Whisper API integration for high-quality transcription
- Real-time transcription capabilities

### NLP Analysis
- Fine-tuned BERT models for scam detection
- Pattern recognition for common scam techniques

### Voice Liveness Detection
- Voice biometrics to detect synthetic or recorded voices
- Anti-spoofing measures to protect against pre-recorded scams

## Deployment

### Frontend
- Deploy to Vercel, Netlify, or similar platforms
- Configure environment variables for production

### Backend
- Deploy to cloud providers like AWS, GCP, or Railway
- Set up proper CORS and security headers

## Future Enhancements
- Mobile application development (React Native)
- Chrome extension for VoIP call protection
- Integration with phone carriers for automatic call screening
- Advanced analytics and reporting features

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors
- [Your Name](https://github.com/yourusername)
