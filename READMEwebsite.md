# Porsche Website

This project is a modern, interactive website designed to showcase Porsche cars. It's built with a cutting-edge web stack, focusing on performance and a rich user experience.

## Tech Stack

-   **Framework**: React with TypeScript
-   **Build Tool**: Vite
-   **Runtime**: Bun
-   **Routing**: TanStack Router
-   **UI Components**: A comprehensive UI library (likely based on shadcn/ui)
-   **Styling**: Tailwind CSS
-   **Deployment**: Configured for Cloudflare Workers, enabling server-side rendering and edge deployment.

## Features

-   **Interactive Car Showcase**: A rich interface to explore different Porsche models.
-   **Modern & Responsive UI**: A sleek design that works seamlessly across all devices.
-   **Server-Side Rendering (SSR)**: The application is set up for SSR, providing fast initial page loads and good SEO.
-   **Component-Based Architecture**: A well-organized codebase with reusable React components.

## Project Structure

```
Website porsche/
├── src/
│   ├── components/
│   ├── routes/
│   ├── lib/
│   ├── hooks/
│   ├── assets/
│   ├── router.tsx
│   ├── server.ts
│   └── start.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
├── bun.lockb
└── wrangler.jsonc
```

## Setup and Installation

### Prerequisites

-   **Bun**: This project uses Bun as the JavaScript runtime and package manager. You can install it from the [official Bun website](https://bun.sh/).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd "Website porsche"
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    ```

## Running the Application

### Development

To start the Vite development server, run:

```bash
bun run dev
```

The application will be available at `http://localhost:5173` (or another port specified by Vite).

### Production Build

To build the application for production, run:

```bash
bun run build
```

This will create a production-ready build in the `dist` folder.

## Deployment

The project is configured for deployment on **Cloudflare Workers**, as indicated by the `wrangler.jsonc` file. To deploy the application, you will need to have the `wrangler` CLI installed and configured with your Cloudflare account.

1.  **Install Wrangler**:
    ```bash
    npm install -g wrangler
    ```

2.  **Login to Cloudflare**:
    ```bash
    wrangler login
    ```

3.  **Deploy**:
    ```bash
    wrangler deploy
    ```
