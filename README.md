# ChatAI

A full-stack AI Chatbot website with a design largely inspired by ChatGPT. It uses Gemini's free API and features full authentication, chat history per account, and proper rate limiting.

## Tech Stack

### Frontend

- React + Vite
- TailwindCSS

### Backend

- NestJS
- PostgreSQL

## Features

### Frontend

- Built with **React TS** and styled using **TailwindCSS** for a responsive design.
- Start a new chat or continue an old one from the sidebar or search modal.
- Watch as the AI writes their answer live.

### Backend

- Developed using **NestJS**, connected to a **PostgreSQL** database with Prisma.
- Implements full authentication with Passport (JWT-based login & session handling).
- Handles calls to Gemini's API for secure key storage in the .env file.
- Responses are streamed to the client using a readable HTTP stream.
- Stores chat history for user sessions.
- Rate limiting to prevent abuse with `nestjs-rate-limiter`.

## Deployement

[to do]
