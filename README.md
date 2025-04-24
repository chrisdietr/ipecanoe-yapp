# Canoe Yapp

A Next.js application for scheduling and processing payments using YODLPay SDK.

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` for development:

```
NEXT_PUBLIC_PARENT_URL=https://yodl.me
```

### Constants

Key application constants are defined in `src/constants/index.ts`:

- Payment settings
- Default values
- Scheduling parameters
- URLs

## Development

```bash
# Install dependencies
yarn install

# Run development server with Turbopack
yarn dev
```

The application will be available at http://localhost:3000 in development mode.

## Deployment

### Option 1: Vercel (Recommended)

Deploy directly to Vercel using their standard Next.js deployment.

### Option 2: Docker

```bash
# Build the Docker image
docker build -t canoe-yapp .

# Run the container
docker run -p 3000:3000 canoe-yapp
```

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- YODLPay SDK
- Tailwind CSS
- Radix UI
