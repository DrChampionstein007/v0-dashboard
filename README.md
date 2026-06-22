# User Analytics Application

## Overview

This project is a full-stack User Analytics Application built as part of the CausalFunnel Full Stack Engineer assignment.

The application tracks user interactions on a website, stores analytics events in MongoDB, and visualizes user behavior through a dashboard containing session analytics, user journeys, and click heatmaps.

## Features

### Event Tracking

* Tracks page views
* Tracks click events
* Stores session IDs using localStorage
* Captures page URL
* Records timestamps
* Records click coordinates (x, y)
* Sends events to backend APIs

### Backend APIs

* Receive and store analytics events
* Fetch sessions with event counts
* Fetch events for a specific session
* Fetch click data for heatmap visualization

### Dashboard

* Session Explorer
* User Journey Timeline
* KPI Metrics
* Recent Activity Feed
* Heatmap Visualization
* Page URL Selection for Heatmap Analysis

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

## Project Structure

frontend/
├── app/
├── components/
├── lib/

backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js

## API Endpoints

### Track Event

POST /api/events/track

### Dashboard Summary

GET /api/events/dashboard

### Session Events

GET /api/events/session/:sessionId

### Heatmap Data

GET /api/events/heatmap?pageUrl=/

## Setup Instructions

### Clone Repository

git clone <repository-url>

### Install Backend Dependencies

cd backend

npm install

### Install Frontend Dependencies

cd frontend

npm install

### Configure Environment Variables

Create a .env file inside backend:

PORT=5000

MONGODB_URI=<your_mongodb_connection_string>

### Run Backend

npm run dev

### Run Frontend

npm run dev

## Live Deployment

Frontend:
https://v0-dashboard-p98o5in2f-amitsingh72436-3901s-projects.vercel.app/

Backend:
https://analytics-backend-8jae.onrender.com

## Assumptions and Trade-offs

* localStorage is used for session identification.
* Click heatmap currently visualizes recorded click coordinates directly.
* Authentication was not included as it was outside assignment scope.
* Focus was placed on analytics functionality and data flow rather than advanced UI customization.

## Future Improvements

* Real-time analytics updates
* User authentication
* Advanced heatmap rendering
* Funnel analysis
* Session replay functionality
* Device and browser analytics

## Author

Amit Singh
