# Sportz - Real-Time Sports WebSocket API

A real-time sports API built with Express.js and WebSocket, featuring live match updates and commentary broadcasting.

## Features

- **Real-time WebSocket communication** for live match updates
- **RESTful API** for managing matches and commentary
- **PostgreSQL database** with Drizzle ORM
- **Security middleware** with Arcjet (rate limiting, bot detection, shield protection)
- **Input validation** using Zod schemas
- **Automatic match status calculation** based on start/end times
- **Broadcast system** for real-time event notifications

## Tech Stack

- **Runtime**: Node.js
- **Web Framework**: Express.js
- **WebSocket**: ws library
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Security**: Arcjet (shield, bot detection, rate limiting)
- **Environment**: dotenv

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sportz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=8000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sportz

# Arcjet Security (optional - if not set, security middleware will be skipped)
ARCJET_KEY=your_arcjet_key_here
ARCJET_MODE=LIVE  # or DRY_RUN for testing
```

4. Set up the database:
```bash
# Generate database migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

## Running the Project

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on:
- **HTTP**: `http://localhost:8000`
- **WebSocket**: `ws://127.0.0.1:8000/ws`

## API Endpoints

### Matches

#### List Matches
```http
GET /matches?limit=50
```

#### Create Match
```http
POST /matches
Content-Type: application/json

{
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "startTime": "2026-09-17T14:00:00Z",
  "endTime": "2026-09-17T16:00:00Z",
  "homeScore": 0,
  "awayScore": 0
}
```

### Commentary

#### List Commentary for a Match
```http
GET /matches/:id/commentary?limit=10
```

#### Create Commentary
```http
POST /matches/:id/commentary
Content-Type: application/json

{
  "minute": 45,
  "text": "Goal! Team A scores!",
  "author": "Commentator"
}
```

## WebSocket Usage

### Connecting
Use `wscat` or any WebSocket client:

```bash
wscat -c ws://127.0.0.1:8000/ws
```

### Subscribe to Match Updates
Send a JSON message to subscribe to specific match updates:

```json
{
  "type": "subscribe",
  "matchId": 1
}
```

### Unsubscribe
```json
{
  "type": "unsubscribe",
  "matchId": 1
}
```

### WebSocket Events

- **welcome**: Connection established
- **subscribed**: Successfully subscribed to a match
- **unsubscribed**: Successfully unsubscribed from a match
- **match_created**: New match created (broadcast to all)
- **commentary**: New commentary added (broadcast to match subscribers)

## Database Management

### Open Drizzle Studio (GUI)
```bash
npm run db:studio
```

### Generate New Migration
```bash
npm run db:generate
```

### Run Migrations
```bash
npm run db:migrate
```

## Project Structure

```
sportz/
├── src/
│   ├── db/
│   │   ├── db.js          # Database connection
│   │   └── schema.js      # Drizzle schemas
│   ├── routes/
│   │   ├── matches.js     # Match routes
│   │   └── commentary.js  # Commentary routes
│   ├── validations/
│   │   ├── matches.js     # Match validation schemas
│   │   └── commentary.js  # Commentary validation schemas
│   ├── utils/
│   │   └── match-status.js # Match status utilities
│   ├── ws/
│   │   └── server.js      # WebSocket server
│   ├── arcjet.js          # Security middleware
│   └── index.js           # Application entry point
├── drizzle/               # Database migrations
├── .env                   # Environment variables
├── drizzle.config.js      # Drizzle configuration
└── package.json
```

## Security

The application uses Arcjet for security protection:
- **Shield**: Protection against common attacks
- **Bot Detection**: Blocks malicious bots while allowing search engines
- **Rate Limiting**: Prevents abuse with sliding window rate limits

Rate limits:
- HTTP: 50 requests per 10 seconds
- WebSocket: 5 connections per 2 seconds

## License

ISC
