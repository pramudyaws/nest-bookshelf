# Nest Bookshelf API

**Nest Bookshelf API** is developed by **pramudyaws**. It provides a backend solution for managing bookshelf operations, such as user & admin auth, books management, book loans management, etc.

## Project setup

```bash
$ npm install
```

## Environment setup
Please ensure to create `.env` file in the root directory and populate it with the required attributes as specified in `.env.example` file.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# e2e tests
$ npm run test:e2e
```

## API Documentation

After running the project, visit `http://localhost:{PORT}/api/v1` to see the Swagger API Documentation. 
> **Note:** Replace `{PORT}` with the actual port number defined in your `.env` file.

## Design Patterns

This project utilizes three main design patterns: **Module Pattern**, **Dependency Injection**, and **Repository Pattern**. These patterns are used in combination to create a clean, scalable, and maintainable project structure, making it easier for other developers to understand and contribute.
- **Module Pattern**: Each feature in the application is organized into separate modules, which helps in keeping the codebase modular and maintainable. This allows for easier scaling and isolation of concerns between different parts of the system.
- **Dependency Injection**: Dependency injection is used to efficiently manage dependencies between components such as services, repositories, and controllers. It promotes loose coupling and enhances testability.
- **Repository Pattern**: This pattern is implemented using TypeORM to manage all database interactions in a clean and abstract way. By separating data access logic into repositories, the code remains modular and easier to maintain, as well as simplifying future changes to the database structure.

## Technologies

- **Typescript**: Backend programming language
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications
- **TypeORM**: Object Relational Mapping (ORM) library for database interactions
- **JWT**: JSON Web Tokens for authentication and authorization
- **Supabase (PostgreSQL)**: Used for database management, powered by PostgreSQL via Supabase
- **Swagger**: Used for API documentations
