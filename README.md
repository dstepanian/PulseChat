# PulseChat

Real-time chat app with a React + Vite client and an Express + Socket.IO server.

## Requirements
- Node.js 18+
- MongoDB running locally or a `MONGODB_URI`

## Setup
1) Install dependencies
```bash
cd server
npm install
cd ../client
npm install
```

2) Configure server env
Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=change-me
CLIENT_ORIGIN=http://localhost:5173
```

3) Run the app
```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

## Notes
- Client API base can be set with `VITE_API_URL` in `client/.env`.
- Profile updates are available from the sidebar.
