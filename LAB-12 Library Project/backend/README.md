Backend (Express + MongoDB)

1. Copy `.env.example` to `.env` and set `MONGODB_URI` if needed.
2. Install and run:

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000` by default. API endpoints:
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books` {title,author,isbn,copies}
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
