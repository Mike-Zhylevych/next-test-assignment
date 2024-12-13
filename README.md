# next-test-assignment

Test assignment repository for A-Safe Digital.

https://next-test-assignment.vercel.app

The project is built with the usage of the following libraries and frameworks:

- [NextJs](https://nextjs.org/) for ssr and routing
- [Tailwind](https://tailwindcss.com/) CSS for styling
- [Next UI](https://nextui.org/) as a react components library
- [Next Themes](https://www.npmjs.com/package/next-themes) for theme switching
- [Next Auth](https://authjs.dev/) for authentification
- [React Apex](https://apexcharts.com/) Chart for drawing charts
- [Prisma ORM](https://www.prisma.io/) to work with Database
- [Zod](https://zod.dev/) to validate user autentification data

# Requirements

Before starting a local development we have to make sure we have installed the following soft

- [Docker](https://www.docker.com/products/docker-desktop/)
- [NodeJs](https://nodejs.org/en)

We gonna need Doker to run a container with [PostgreSQL Database](https://www.postgresql.org/) and NodeJs is our main platform to develop an application upon.

## Getting Started

Alright, now we have Docker and NodeJS installed we need to create new the `.env.local` file inside the root directory.

```
next-test-assignment/
├── prisma/
├── public/
├── src/
├── .env.local
├── .gitignore
├── next.config.js
└── ... # Other project files
```

Add the following lines to the `.env.local` file, please note that in this case GitHub and Google auth won't work for you, if you need to make them work locally you need to put real ID's and Secrets. If it's not important you can just copy the following snippet:

```shell
# Github OAuth credentials
GITHUB_CLIENT_ID = "test";
GITHUB_CLIENT_SECRET = "test";

# Google OAuth credentials
GOOGLE_CLIENT_ID = "test";
GOOGLE_CLIENT_SECRET = "test";

# A key to sign the JWT token in NextAuth.js
AUTH_SECRET = "test";
# Database URL
DATABASE_URL = "postgresql://postgres@localhost:5432/postgres?schema=public";
```

## Run project

Before starting the project make sure your docker daemon is working otherwise we would not be able to use local database.

After this let's install all the dependencies:

```bash
npm i
```

Next let's start a database instance inside a Docker container

```bash
npm run start:db
```

The following steps are necessary only if you run this application for the first time. In a separate terminal window run:

```bash
npm run prisma:migrate:local # Will aplly the migration and will create needed DB Tables
npm run populate:db:dev # Populate tables with random generated data
```

The last step is to start the application by running

```bash
npm run dev
```

It will start a devlopment server on http://localhost:3000 so you can enjoy development.

## Testing

To run a tests simply run

```bash
npm run test
```
