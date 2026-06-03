# Portfolio — Kunal Suvo Saha

Professional portfolio website built with Next.js (App Router) and Tailwind CSS. This repository powers a personal portfolio that showcases projects, skills, academic background, and a small admin console for content and media management.

## Highlights

- Responsive, accessible UI with Tailwind CSS and Framer Motion.
- Projects persisted in MongoDB with Mongoose models and rank ordering.
- Admin panel for managing projects and uploading images to Cloudinary.
- UX niceties: click-to-copy email, tap-to-call, animated toasts, and polished hover states.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Mongoose + MongoDB
- Cloudinary (image hosting)
- React Icons

## Quick Start (Local)

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the repository root with these variables:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME= username
ADMIN_PASSWORD=changeme
ADMIN_SESSION_SECRET=some-long-secret
```

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Environment Variables

- `MONGODB_URI` — MongoDB connection string (required for projects and settings).
- `CLOUDINARY_*` — Cloudinary credentials for image uploads (required for admin upload features).
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` — credentials and signing secret for the admin console.

## Admin Panel

- Access: The admin panel is hidden behind an owner tap on the site title in the navbar. Configure the admin env vars to set your username/password.
- Features: Create/update/delete projects, upload/delete media assets, and update site settings stored in the `SiteSettings` model.

API endpoints are under `src/app/api/admin/*` and are protected with a signed admin session cookie.

## Project Layout

- `src/app` — Next.js routes and server/API handlers
- `src/components` — UI components (Hero, Navbar, Projects, Contact, AdminPanel, etc.)
- `src/models` — Mongoose models (`Project`, `SiteSettings`)
- `src/lib` — Utilities (MongoDB connection, Cloudinary helpers, auth, serialization)

## Deployment

Recommended: Vercel. Make sure to populate environment variables in your deployment settings.

## Accessibility & UX

- Interactive elements are keyboard accessible and include focus styles.
- Email copy and call actions include clear feedback using animated toasts.

## Contributing

Contributions are welcome. Typical workflow:

1. Fork and create a feature branch
2. Open a pull request with a description of your changes

## License

This repo does not include an open-source license by default. Add a `LICENSE` file if you intend to release it publicly under a license.

## Contact

Kunal Suvo Saha — kunalsuvosaha@gmail.com


