# Book Library Manager

> A simple Node.js + Express API for managing users and books with email-based verification and password reset flows.

## Features
- User signup, login with JWT
- Email verification (OTP)
- Password reset via OTP
- Role-protected endpoint to list users (admin)
- CRUD endpoints for books
- EJS email templates for notifications

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

- `DB_URL` - MongoDB connection string
- `PORT` - optional (defaults to `6000`)
- `JWT_SECRET` - secret for signing JWT tokens
- `EMAIL_HOST` - SMTP host for sending mail
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `EMAIL_FROM` - From address used in outgoing mail
- `FRONTEND_URL` - (optional) used to build reset links

3. Run in development

```bash
npm run dev
```

Server runs by default on `http://localhost:6000` (or `PORT`).

## API Endpoints (base: `/api/users`)

- `POST /signup` — Register a user. Body: `{ name, email, password }`
- `POST /login` — Login. Body: `{ email, password }` → returns `{ token }`
- `PUT /forget-password` — Request password reset OTP. Body: `{ email }`
- `PUT /reset-password` — Reset password using OTP. Body: `{ otp, newPassword }`
- `PUT /verify-otp` — Verify account with OTP. Body: `{ otp }`
- `PUT /resend-otp` — Resend verification OTP. Body: `{ email }`
- `GET /get-all-users` — (admin only) List all users. Requires `Authorization: Bearer <token>`

Book endpoints (require authentication):

- `POST /create-book` — Create a book. Body: `{ title, author, year, genre }`
- `GET /books` — List all books
- `GET /books/:id` — Get book by id
- `PATCH /books/:id` — Update a book
- `DELETE /books/:id` — Delete a book

## Authentication
All protected endpoints require the header:

```
Authorization: Bearer <your-jwt-token>
```

JWTs are issued on successful login and expire in 1 hour by default.

## Email templates

Templates live in `src/views/` as EJS files:

- `verify_account.ejs` — account verification OTP
- `forget_password.ejs` — password reset OTP
- `reset_password.ejs` — reset success notification
- `login_notification.ejs` — notify user of new login

The email sending helper is `src/config/email.js` and service wrappers are in `src/utils/emailService.js`.

## Models

- `src/models/user.models.js` — user schema (password, otp, isVerified, role)
- `src/models/book.models.js` — book schema (title, author, year, genre)

## Notes & Troubleshooting
- If you see `Cannot find module 'bcryptjs'` run `npm install bcryptjs` or `npm install` to restore dependencies.
- If you see `ReferenceError: app is not defined` ensure `app.use(...)` calls live in `app.js` and not in `src/config/db.js`.
- Malformed JSON errors indicate the client is sending invalid JSON; ensure `Content-Type: application/json` and valid JSON body (double quotes, no trailing commas).

## Contributing
Feel free to open issues or send PRs. For major changes, open an issue first to discuss what you’d like to change.

## License
MIT
