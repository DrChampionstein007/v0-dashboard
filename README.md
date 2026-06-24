# User Analytics Application

A full-stack application built for the CausalFunnel assignment that tracks user interactions, stores analytics events, and visualizes behavior via a dashboard.

## 🚀 Live Demo
* **Frontend Dashboard:** [Vercel Link](https://v0-dashboard-p98o5in2f-amitsingh72436-3901s-projects.vercel.app/)
* **Backend API:** [Render Link](https://analytics-backend-8jae.onrender.com)

---

## ✨ Features
* **Event Tracking:** Captures page views, click events (with x/y coordinates), URLs, and timestamps using `localStorage` for session IDs.
* **Analytics Dashboard:** Includes a Session Explorer, User Journey Timeline, KPI Metrics, and a Click Heatmap.
* **REST API:** Endpoints to ingest events and fetch structured session/heatmap data.

## 🛠️ Tech Stack
* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)

---

## 📌 API Endpoints
* `POST /api/events/track` - Track a new event
* `GET /api/events/dashboard` - Fetch dashboard summary & KPIs
* `GET /api/events/session/:sessionId` - Get timeline events for a specific session
* `GET /api/events/heatmap?pageUrl=/` - Get coordinates for heatmap visualization

---

## ⚙️ Setup Instructions

### 1. Backend Setup
1. Navigate to `/backend` and run `npm install`.
2. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
