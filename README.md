### 🚀Blog Backend
A backend API for a blog application built with NestJS and TypeORM. This project provides endpoints for managing blog posts and comments, with a PostgreSQL database for data persistence. The API supports CRUD operations and is designed to work with a frontend application.

### Features

- CRUD Operations: Create, read, update, and delete blog posts and comments.
- Database Integration: Uses PostgreSQL with TypeORM for data management.
- Validation: Implements class-validator and class-transformer for request validation.
- Configuration: Supports environment-based configuration with @nestjs/config.
- Linting & Formatting: Enforces code quality with ESLint and Prettier.

---

### Prerequisites
Before running the application, ensure you have the following installed:

- Node.js: Version 18 or higher
- npm: Version 9 or higher
- PostgreSQL: Version 13 or higher
- Git: For cloning the repository

### Setup Instructions
Follow these steps to set up and run the backend locally:

- 1. Clone the Repository
git clone https://github.com/PaninDmytro/blog-backend.git
cd blog-backend

- 2. Install Dependencies
Install the required dependencies using npm:
npm install

- 3. Configure Environment Variables
Create a .env file in the root of the project with the following variables:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=blog

Replace your_username, your_password, and blog with your PostgreSQL credentials and database name.

- 4. Set Up PostgreSQL Database
Ensure PostgreSQL is running and create a database for the application:
CREATE DATABASE blog;

TypeORM will automatically synchronize the database schema based on the entity definitions when the application starts. Alternatively, you can use migrations for production environments.

- 5. Run the Application
Start the development server:
npm run start:dev

The API will be available at http://localhost:3001.

- 6. Build for Production
To create a production build:
npm run build

To start the production server:
npm run start:prod

- 7. Run Tests
Run unit tests:
npm run test

Run end-to-end tests:
npm run test:e2e

Run tests with coverage:
npm run test:cov

- 8. Linting and Formatting
Run the linter to check for code quality issues:
npm run lint

Format the code with Prettier:
npm run format

### Assumptions

- A PostgreSQL database is available and accessible with the provided credentials.
- The frontend application is configured to communicate with the backend at http://localhost:3001.
- The database schema is synchronized automatically by TypeORM. For production, consider using migrations.
- The API is stateless and does not handle authentication (this can be added as needed).

### Important Notes

- Environment Variables: Ensure the .env file is correctly configured with valid PostgreSQL credentials. Missing or incorrect values will prevent the application from connecting to the database.
- Port Configuration: The backend runs on port 3001. Ensure this port is free or modify the port in the main.ts file if needed.
- Database Synchronization: TypeORM’s synchronize: true is enabled by default for development. Disable it in production to avoid unintended schema changes.

### Project Structure

- src/: Source code for the application.
- entities/: TypeORM entity definitions for database models.
- modules/: NestJS modules for posts and comments.
- main.ts: Application entry point.

dist/: Compiled output for production builds.
.env: Environment variables (not tracked in version control).

### Dependencies

- NestJS: Framework for building scalable server-side applications.
- TypeORM: ORM for PostgreSQL database interactions.
- pg: PostgreSQL driver for Node.js.
- class-validator & class-transformer: Request validation and transformation.
- Jest: Testing framework for unit and end-to-end tests.
- ESLint & Prettier: Code quality and formatting tools.

For a full list of dependencies, refer to package.json.

### API Endpoints
The API provides endpoints for managing posts and comments. Example endpoints (to be customized based on implementation):

- GET /posts: Retrieve a list of posts.
- POST /posts: Create a new post.
- GET /posts/:id: Retrieve a specific post.
- PUT /posts/:id: Update a post.
- DELETE /posts/:id: Delete a post.
- GET /comments: Retrieve comments for a post.
- POST /comments: Create a new comment.
- DELETE /comments/:id: Delete a comment.

Refer to the application code or use a tool like Postman to explore all available endpoints.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
License
This project is unlicensed. All rights are reserved.
