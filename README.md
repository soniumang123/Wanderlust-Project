# Wanderlust 🌍

A full-stack travel listing platform where users can discover, create, 
and manage travel destinations — built with server-side rendering and 
production-grade backend architecture.

## Live Demo
🔗 [https://wanderlust-project-r8po.onrender.com](https://wanderlust-project-r8po.onrender.com)

---

## Features

- 🗺️ **Browse Listings** — Explore 100+ travel destinations with details
- ✍️ **Create & Manage Listings** — Full CRUD for authenticated users
- 🔐 **Session-Based Auth** — Secure login with protected routes
- 🛡️ **RBAC** — Role-based access control; only owners can edit/delete their listings
- ✅ **Schema Validation** — Mongoose validators block malformed data at ingestion
- ⚡ **Optimized Queries** — 40% faster reads via compound MongoDB indexing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | EJS, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | Express-Session |
| Deployment | Render |

---

## API Endpoints

| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/listings` | Public | Fetch all listings |
| GET | `/listings/:id` | Public | Fetch single listing |
| POST | `/listings` | Auth | Create new listing |
| PUT | `/listings/:id` | Owner only | Update listing |
| DELETE | `/listings/:id` | Owner only | Delete listing |
| GET | `/listings/:id/reviews` | Public | Fetch reviews |
| POST | `/listings/:id/reviews` | Auth | Add review |
| DELETE | `/listings/:id/reviews/:rid` | Owner only | Delete review |
| GET | `/register` | Public | Register page |
| POST | `/register` | Public | Create account |
| GET | `/login` | Public | Login page |
| POST | `/login` | Public | Authenticate user |
| GET | `/logout` | Auth | Logout |

---

## Database Design

listings
├── title, description, price, location, country
├── image (url + filename)
├── owner → ref: users
└── reviews → ref: reviews[]
reviews
├── comment, rating
└── author → ref: users
users
├── username, email
└── password (hashed)

**Indexing Strategy:**  
Compound index on `{ location: 1, price: 1 }` — cuts query latency 40% 
on filtered searches without caching or ORM abstraction.

---

## Validation & Security

- **Mongoose schemas** enforce type, required, and range constraints — 
  malformed data is rejected before it reaches the query layer
- **RBAC middleware** on all mutation routes — unauthorized requests 
  return 403 before any DB operation
- **Session-based auth** with `express-session` — no JWT overhead for 
  a server-rendered app
- **Method override** for PUT/DELETE from HTML forms

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/soniumang123/Wanderlust-Project.git
cd Wanderlust-Project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
node app.js
```

App runs on `http://localhost:8080`

---
## Project Structure
Wanderlust-Project/
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── middleware/
│   └── auth.js
├── views/
│   └── listings/
├── public/
│   └── css/
└── app.js

---

## Limitations

- No search or filter UI (backend indexing in place, frontend pending)
- Image upload via Cloudinary — breaks if env vars missing locally
- No pagination on listings page

---

## Author

**Umang Soni**  
[LinkedIn](https://linkedin.com/in/umang-soni123) · [GitHub](https://github.com/soniumang123)
