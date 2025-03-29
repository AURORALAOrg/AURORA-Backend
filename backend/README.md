# AURORA Backend

## 🚀 Project Overview

AURORA is a cutting-edge backend application designed to provide robust authentication and wallet management services. Built with TypeScript, Express, and PostgreSQL, the project offers secure user registration, email verification, and blockchain wallet integration.

## 📋 Table of Contents

- [AURORA Backend](#aurora-backend)
  - [🚀 Project Overview](#-project-overview)
  - [📋 Table of Contents](#-table-of-contents)
  - [🌟 Features](#-features)
  - [💻 Technologies](#-technologies)
  - [🛠 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
  - [📝 Configuration](#-configuration)
    - [Environment Variables](#environment-variables)
  - [💾 Database Setup (GUI)](#-database-setup-gui)
  - [🛠️ Setting up the Database in pgAdmin](#️-setting-up-the-database-in-pgadmin)
    - [Launch pgAdmin](#launch-pgadmin)
    - [Connect to a Server](#connect-to-a-server)
  - [Create a New Database](#create-a-new-database)
  - [🔨 Create Tables in pgAdmin with SQL Query Tool](#-create-tables-in-pgadmin-with-sql-query-tool)
  - [🧪 Verify Your Setup](#-verify-your-setup)
  - [💾 Database Setup (CLI)](#-database-setup-cli)
    - [Option 1: Local PostgreSQL](#option-1-local-postgresql)
    - [Option 2: Docker (Recommended)](#option-2-docker-recommended)
    - [Database Migrations](#database-migrations)
  - [🚀 Running the Application](#-running-the-application)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
  - [🧪 Testing](#-testing)
    - [Run Tests](#run-tests)
    - [Run Tests with Coverage](#run-tests-with-coverage)
  - [🔒 Security Features](#-security-features)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📞 Contact](#-contact)

## 🌟 Features

- 🔐 Secure User Authentication
- 📧 Email Verification System
- 🏦 Wallet Address Validation
- 🔒 JWT-based Authorization
- 💾 PostgreSQL Database Integration
- 🧪 Comprehensive Test Coverage

## 💻 Technologies

- **Language**: TypeScript
- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, Bcrypt
- **Wallet Validation**: ethers.js
- **Testing**: Jest, Supertest

## 🛠 Prerequisites

- Node.js (v18+)
- PostgreSQL (v13+)
- npm or yarn
- Docker (optional)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/AURORALAOrg/AURORA-Backend.git
cd AURORA-Backend
```

2. Install dependencies:

```bash
npm install
```

## 📝 Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/aurora_db?schema=public"

# Authentication
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRATION=1d
BCRYPT_SALT_ROUNDS=10

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Application Settings
APP_PORT=3000

# A .env.example file contain all the keys and some of the values mentioned above
```

## 💾 Database Setup (GUI)

Install Postgres
Download and install Postgres from: <https://www.postgresql.org/download/>

## 🛠️ Setting up the Database in pgAdmin

### Launch pgAdmin

```app
Open the pgAdmin application on your computer.
Log in with your PostgreSQL credentials (default username: postgres).
```

### Connect to a Server

```pgAdmin
In the left sidebar, locate Servers.
Right-click on "Servers" and choose Create > Server.

```

```Fill out the following

## General tab
- Enter a name for the server (e.g., MyDBServer).

## Connection tab
- Host: localhost (or your server’s IP address).
- Port: 5432 (default PostgreSQL port).
- Username: postgres.
- Password: Your PostgreSQL password.
- Click Save to establish the connection.

```

## Create a New Database

```pgAdmin
- Expand the connected server in the left sidebar.
- Right-click on Databases and select Create > Database.
- Enter the database name (e.g., aurora_db).
- Leave the other settings as default and click Save.
```

## 🔨 Create Tables in pgAdmin with SQL Query Tool

1. Open the SQL Query Tool

   ```pgAdmin
   - Expand the server and database you created.
   - Right-click on your database (e.g., aurora_db) and select Query Tool.
   ```

2. Run SQL COMMAND

   ```pgAdmin
    CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    Or Copy and paste from the prisma Schema models one model at a time then press f5 to execute.
   ```

## 🧪 Verify Your Setup

```pgAdmin
- List all tables:
- Navigate to Schemas > Public > Tables to view your tables.
- View table contents:
- Right-click on a table (e.g., users) and choose View/Edit Data > All Rows.
```

## 💾 Database Setup (CLI)

### Option 1: Local PostgreSQL

1. Create the database:

```bash
createdb aurora_db
```

### Option 2: Docker (Recommended)

1. Start PostgreSQL container:

```bash
docker run --name aurora-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres
```

2. Create the database:

```bash
docker exec -it aurora-postgres psql -U postgres -c "CREATE DATABASE aurora_db;"
```

### Database Migrations

1. Generate Prisma Client:

```bash
npx prisma generate
```

2. Run Migrations:

```bash
npx prisma migrate dev --name init
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Email verification
- Wallet address validation
- Custom error handling middleware

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/AURORALAOrg/AURORA-Backend](https://github.com/AURORALAOrg/AURORA-Backend)
