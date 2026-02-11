# Game Search App

Web application with search functionality built with React and Node.js.

## Tech Stack

- Frontend: React + Bootstrap
- Backend: Node.js + Express
- Database: PostgreSQL (via Prisma)

## Running locally

### Prerequisites

- Node.js 18+

### Environment Variables

```bash
For server/.env
DATABASE_URL="connection-string"

For client/.env
VITE_API_URL="http://localhost:3001"
```

### Install dependencies

```bash
npm run install:all
```

### Running server and client

```bash
npm run build
npm run dev:server
npm run dev:client
```
