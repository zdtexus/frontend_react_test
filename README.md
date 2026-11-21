# Social Network Client

React front end for a small social network: a post feed, comments, likes, user profiles, and followers and following lists.

Server: [backend_nodejs_test](https://github.com/zdtexus/backend_nodejs_test)

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)

## Features

- Sign up and log in; the JWT is stored in the browser
- Post feed where you can create, like, comment on and delete posts
- A page for each post with its comments
- User profiles you can edit, including uploading an avatar
- Follow and unfollow, with followers and following lists
- Light and dark theme

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, NextUI, Tailwind CSS, Framer Motion |
| State and data | Redux Toolkit, RTK Query |
| Forms | React Hook Form |
| Routing | React Router 6 |
| Build and test | Vite, TypeScript, Vitest |

## Getting started

### Prerequisites

- Node.js 18 or later
- [backend_nodejs_test](https://github.com/zdtexus/backend_nodejs_test) running on `http://localhost:3000`

### Installation

```bash
git clone https://github.com/zdtexus/frontend_react_test.git
cd frontend_react_test
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run tests with Vitest |

## Project structure

```text
src/
  app/          Redux store and RTK Query services (posts, users, comments, likes, follows)
  components/   Reusable UI components
  features/     User slice, login and register forms
  pages/        Auth, feed, post, profile, followers, following
  utils/        Helpers
```
