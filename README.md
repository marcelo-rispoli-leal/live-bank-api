# Live Bank API - Bank As A Service

## Overview

A Node.js API built with Express and MongoDB, featuring:

- JWT authentication
- Brazilian CPF/CNPJ validation
- Transaction management system
- Nodemailer integration for email services
- Swagger OpenAPI 3 documentation
- Multer uploads PDF files

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-repo/live-bank-api.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Copy `.sample_env` to `.env`
- Set your MongoDB credentials and email service details

4. Start the server:

```bash
npm run server # development mode
npm start # production mode
```

## API Documentation

Access interactive documentation at [https://live-bank-api.onrender.com/docs](https://live-bank-api.onrender.com/docs) using Swagger UI.

## Database Configuration

The included MongoDB user in `.env` has restricted privileges:

- Read/write access only to the `live-bank-api` database user
- Limited to specific collections required by the API

## Testing Guidelines

1. Use interactive documentation, Postman, or a similar tool for endpoint testing
2. Sample test credentials available in `.sample_env`
3. All endpoints require JWT authentication except `/auth` routes

## Project Structure

```
├── server/
│   ├── app/          # Core application logic
│   ├── docs/         # Swagger documentation
│   ├── models/       # MongoDB schemas
│   └── routes/       # API endpoints
├── .env              # Environment configuration
├── .gitignore        # Version control exclusions
└── package.json      # Dependencies and scripts
```

## Project Purpose

This API serves as a technical demonstration of full-stack development skills, implementing banking service concepts for portfolio purposes. While following production-grade practices, it is not meant for real financial operations.
