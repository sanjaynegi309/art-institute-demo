# Project Conventions

## Image Performance
To ensure optimal image performance and follow project standards, adhere to the following rules:

- **Use `next/image` only**: All images must be rendered using the `next/image` component. Standard `<img>` tags are not permitted.
- **Optimized Formats**: The project is configured to serve images in **AVIF** and **WebP** formats only.
- **Local Images Only**: No remote images are allowed. All images must be hosted locally within the project.
- **Static Optimization**: Use static image optimization via Vercel.
- **No Experimental Flags**: Do not use any experimental or unstable Next.js flags in `next.config.js`.

## Architecture
- **App Router**: Use the App Router (`app/` directory) for all routes. The `pages/` directory is not used.
- **TypeScript**: All code must be written in TypeScript with strict type checking.
- **Minimalist Defaults**: Avoid unnecessary dependencies like Tailwind, animations, or mock data unless explicitly requested.
