# GymPass
GymPass style app 

## Description 
This project allows you to find nearby gyms and check in to them.

### Tech Stack
<div>
  <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
</div>

## Install Dependencies

```bash
npm install
```

## Usage

To run:
```bash
npm run 
```

## Run in docker

```bash
docker compose -up --build -d
```

## Requirements (RFs)

- [x] User registration
- [x] User authentication
- [x] Get profile of logged-in user
- [x] Get number of check-ins by logged-in user
- [x] Get check-in history of user
- [x] Search nearby gyms (within 10km)
- [x] Search for gym by name
- [x] Check in to a gym
- [x] Validate user check-in
- [x] Register a gym

## Rules (RNs)

- [x] User cannot register with a duplicate email
- [x] User cannot make 2 check-ins on the same day
- [x] User cannot check in if not near (within 100m) of the gym
- [x] Check-in can only be validated within 20 minutes of creation
- [x] Check-in validation can only be done by administrators
- [x] Gym can only be registered by administrators

## Non-functional Requirements (RNFs)

- [x] User password must be encrypted
- [x] Application data must persist in a PostgreSQL database
- [x] All data lists must be paginated with 20 items per page
- [x] User must be identified by JWT (JSON Web Token)
