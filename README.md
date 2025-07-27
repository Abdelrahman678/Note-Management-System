# Note Management System

A full-stack note-taking application with AI-powered summarization features, built with Node.js, Express, MongoDB, and Cohere AI.

## Features

- User authentication (JWT)
- CRUD operations for notes
- AI-powered note summarization
- GraphQL API for flexible data querying
- RESTful API endpoints
- Secure user authentication and authorization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Cohere API key (for AI features)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdelrahman678/Note-Management-System.git
   cd Note-Management-System
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   COHERE_API_KEY=your_cohere_api_key
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /auth/sign-up` - Register a new user
- `POST /auth/sign-in` - Login user
- `POST /auth/sign-out` - Logout user
- `PATCH /auth/forgot-password` - Request password reset
- `PUT /auth/reset-password` - Reset password

### user (REST API)

- `PATCH /user/upload-profile-pic` - Upload profile picture

### Notes (REST API)

- `POST /note/create-note` - Create a new note
- `DELETE /note/delete-note/:id` - Delete a note

### GraphQL Endpoint

- `/graphql` - GraphQL API endpoint

### Get All Notes

```graphql
query {
  listAllNotes {
    _id
    title
    content
    ownerId {
      _id
      username
      email
      age
      gender
    }
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `JWT_EXPIRES_IN` - JWT expiration time
- `JWT_COOKIE_EXPIRES_IN` - Cookie expiration time in days
- `COHERE_API_KEY` - API key for Cohere AI services
- `NODE_ENV` - Application environment (development/production)

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **AI**: Cohere API
- **API**: REST & GraphQL
- **Environment**: dotenv
