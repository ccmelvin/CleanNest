# CleanNest

CleanNest is a household management application built with Next.js that helps you organize cleaning tasks and shopping lists for cleaning products.

![CleanNest Dashboard](https://via.placeholder.com/800x450.png?text=CleanNest+Dashboard)

## Features

- **User Authentication**: Secure login and signup functionality
- **Cleaning Task Management**:
  - Create, edit, and delete cleaning tasks
  - Categorize tasks as daily, weekly, or monthly
  - Mark tasks as complete
  - Set due dates for tasks
  - Filter tasks by category
- **Cleaning Products Shopping List**:
  - Add cleaning products with brand and quantity
  - Mark items as purchased
  - Edit and delete shopping items
- **Dashboard**:
  - View progress statistics
  - Toggle between tasks and shopping list
  - Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend**: Supabase (Auth, Database)
- **Testing**: Playwright

## Getting Started

### Prerequisites

- Node.js 18.17 or later (for local development)
- npm or yarn (for local development)
- Docker and Docker Compose (for containerized setup)
- Supabase account (for production use)

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cleaning-nest.git
   cd cleaning-nest
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   > Note: For local development, the app uses mock data by default. You can skip this step if you're just testing locally.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
cleaning-nest/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions and mock data
├── .env.local          # Environment variables (create this file)
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies
├── SETUP.md            # Detailed setup instructions
└── tsconfig.json       # TypeScript configuration
```

## Deployment

### Using Docker

The project includes Docker configuration for both development and production:

#### For Development (with hot-reload)

1. Build and start the development container:
   ```bash
   docker-compose up dev
   ```

2. Access the application at [http://localhost:3000](http://localhost:3000)

3. Any changes you make to your code will automatically reload in the browser

#### For Production

1. Build and start the production container:
   ```bash
   docker-compose up app -d
   ```

2. Access the application at [http://localhost:3000](http://localhost:3000)

3. To stop any container:
   ```bash
   docker-compose down
   ```

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository
2. Import your project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Deployment Options

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Backend Setup

For production use, you'll need to set up a Supabase backend. Detailed instructions can be found in the [SETUP.md](./SETUP.md) file.

## Testing

The project uses Playwright for end-to-end testing. Playwright allows you to test your application in multiple browsers (Chromium, Firefox, and WebKit) with a single API.

### Setting Up Playwright

```bash
# Install Playwright and its browsers
./setup-playwright.sh

# Or manually with these commands:
npm install @playwright/test --save-dev
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Test Structure

Tests are located in the `tests` directory. Currently, there's a simple example test to demonstrate Playwright functionality.

### Writing Tests

To add new tests, create a new file in the `tests` directory following the naming convention `feature-name.spec.ts`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Supabase for the backend services