# RAD Final Project Backend

A complete backend API built with Express.js, MongoDB, and JWT authentication.

## Features

- ✅ User Authentication (Register/Login)
- ✅ JWT Token-based Authorization
- ✅ Password Hashing with Bcrypt
- ✅ MongoDB Integration with Mongoose
- ✅ User Profiles with Seller Support
- ✅ Posts Management (CRUD)
- ✅ Likes & Comments System
- ✅ Error Handling Middleware
- ✅ TypeScript Support

## Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

## Installation

1. **Clone and Navigate**
   ```bash
   cd BackEnd
   npm install
   ```

2. **Configure Environment Variables**
   
   Create `.env` file with:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   BCRYPT_SALT=10
   ```

   **Get MongoDB URI:**
   1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   2. Create a free account and cluster
   3. Click "Connect" → "Drivers"
   4. Copy the connection string and replace username/password/dbname

3. **Install Dependencies**
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset

### User Management

- `GET /api/user/profile` - Get current user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `GET /api/user/all` - Get all users/sellers
- `GET /api/user/:userId` - Get specific user

### Posts

- `POST /api/post` - Create new post (requires auth)
- `GET /api/post` - Get all posts
- `GET /api/post/user/:userId` - Get user's posts
- `GET /api/post/:postId` - Get specific post
- `PUT /api/post/:postId` - Update post (requires auth)
- `DELETE /api/post/:postId` - Delete post (requires auth)
- `POST /api/post/:postId/like` - Like/unlike post (requires auth)
- `POST /api/post/:postId/comment` - Add comment to post (requires auth)

### Health Check

- `GET /api/health` - Server status

## Request/Response Examples

### Register
```json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "fullName": "John Doe"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepass123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Create Post
```json
POST /api/post
Headers: Authorization: Bearer <token>
{
  "title": "My First Post",
  "description": "This is a great post about selling items",
  "image": "https://example.com/image.jpg"
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Project Structure

```
BackEnd/
├── src/
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   └── jwt.ts           # JWT utilities
│   ├── controllers/         # (Ready for expansion)
│   ├── middleware/
│   │   ├── auth.ts          # Authentication middleware
│   │   └── errorHandler.ts  # Error handling
│   ├── models/
│   │   ├── User.ts          # User schema
│   │   └── Post.ts          # Post schema
│   ├── routes/
│   │   ├── auth.ts          # Auth endpoints
│   │   ├── user.ts          # User endpoints
│   │   └── post.ts          # Post endpoints
│   └── index.ts             # Main server file
├── .env                     # Environment variables
├── package.json
└── tsconfig.json
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **TypeScript** - Type safety
- **Nodemon** - Development auto-reload

## Error Handling

All errors return consistent JSON format:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

## Security Features

- ✅ Password hashing with Bcrypt
- ✅ JWT token validation
- ✅ Input validation
- ✅ Authorization checks
- ✅ CORS enabled
- ✅ Environment variables for sensitive data

## Next Steps

1. Update `.env` with your MongoDB credentials
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Test endpoints with Postman or Thunder Client
5. Connect to frontend when ready

## Troubleshooting

**MongoDB Connection Error:**
- Check MongoDB URI in `.env`
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username and password

**JWT Token Errors:**
- Ensure token is included in Authorization header
- Check token format: `Bearer <token>`
- Verify JWT_SECRET in `.env`

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

## License

ISC

---

Built with ❤️ for RAD Final Project
