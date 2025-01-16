# My Authentication App

A secure authentication system built with Next.js 13+, TypeScript, and Spring Boot JWT authentication.

## Features

- JWT Authentication
- Role-based Authorization
- User Registration & Login
- Protected Routes
- Dynamic Navigation
- Responsive Design
- TypeScript Support
- MySQL Database Integration

## Project Structure

```
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── auth.ts
│   └── utils/
│       └── auth.ts
│
└── backend/
    └── src/
        ├── main/
        │   ├── java/com/bezkoder/springjwt/
        │   │   ├── controllers/
        │   │   ├── models/
        │   │   ├── repository/
        │   │   └── security/
        │   └── resources/
        │       └── application.properties
```

## Prerequisites

- Node.js 16.8 or later
- Java 17 or later
- MySQL 8.0 or later
- Maven 3.6 or later

## Backend Setup

1. Create MySQL database
```sql
CREATE DATABASE testdb_spring;
```

2. Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/testdb_spring
spring.datasource.username=<your_username>
spring.datasource.password=<your_password>

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update

# App Properties
bezkoder.app.jwtSecret=======================YashKolte=Spring===========================
bezkoder.app.jwtExpirationMs=86400000
```

3. Build and run the Spring Boot application:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env.local` file in the frontend root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

3. Run the development server:
```bash
npm run dev
```

The frontend application will start at `http://localhost:3000`

## API Endpoints

### Auth Endpoints
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Test Endpoints
- `GET /api/test/all` - Public content
- `GET /api/test/user` - User content (requires authentication)
- `GET /api/test/mod` - Moderator content (requires MODERATOR role)
- `GET /api/test/admin` - Admin content (requires ADMIN role)

## User Roles

The system supports three roles:
- ROLE_USER
- ROLE_MODERATOR
- ROLE_ADMIN

New users are assigned ROLE_USER by default. Roles can be specified during registration.

## Available Scripts

Backend:
```bash
mvn clean install    # Build the project
mvn test            # Run tests
mvn spring-boot:run # Start the server
```

Frontend:
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Authentication Flow

1. User registers with username, email, and password
2. User logs in with username and password
3. Server generates JWT token
4. Client stores token in localStorage
5. Token is included in Authorization header for protected requests
6. Server validates token for protected routes

## Security Measures

- Passwords are encrypted using BCrypt
- JWT tokens for stateless authentication
- CORS configuration
- Role-based access control
- Protected routes in frontend and backend
- Input validation
- Error handling

## Environment Configuration

### Production
Update `.env.production`:
```
NEXT_PUBLIC_API_URL=your-production-api-url
```

Update `application-prod.properties`:
```properties
spring.datasource.url=your-production-database-url
```

## Troubleshooting

1. Database Connection Issues:
   - Verify MySQL service is running
   - Check database credentials
   - Ensure database exists

2. JWT Token Issues:
   - Clear browser localStorage
   - Check token expiration
   - Verify JWT secret matches

3. CORS Issues:
   - Check CORS configuration in Spring Boot
   - Verify API URL in frontend

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the [MIT LICENCE](LICENSE) License.
