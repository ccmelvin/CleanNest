# CleanNest Setup Guide

**Author:** Cassia

## Backend Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Name your project "CleanNest"
5. Create a strong database password and save it
6. Select a region close to you
7. Click "Create new project"

### 2. Get Your Credentials
1. Once your project is created, go to Settings → API
2. Copy your "Project URL" and "anon public" API key
3. Update `.env.local` with these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Set Up Database
1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste it into a new query and run it
4. This creates the necessary tables and security policies

### 4. Configure Authentication
1. In Supabase dashboard, go to Authentication → Settings
2. Under "Site URL", add: `http://localhost:3000`
3. Under "Redirect URLs", add: `http://localhost:3000`

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your App
Navigate to [http://localhost:3000](http://localhost:3000)

## Features

### Authentication
- Email/password signup and login
- Secure user sessions
- User-specific data isolation

### Cleaning Tasks
- Create, read, update, delete tasks
- Categorize as daily, weekly, or monthly
- Mark tasks as complete
- Set due dates
- Filter by category

### Grocery List
- Add cleaning products with optional brand and quantity
- Mark items as purchased
- Edit item details
- Delete items

### Dashboard
- Overview statistics
- Progress tracking
- Tabbed interface
- Responsive design

## Database Schema

### cleaning_tasks
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `title` (VARCHAR, Required)
- `description` (TEXT, Optional)
- `category` (ENUM: daily, weekly, monthly)
- `completed` (BOOLEAN, Default: false)
- `due_date` (DATE, Optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### grocery_items
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `name` (VARCHAR, Required)
- `brand` (VARCHAR, Optional)
- `quantity` (INTEGER, Default: 1)
- `purchased` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication with Supabase Auth
- Environment variables for sensitive data

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase redirect URLs to include your production domain

### Other Platforms
- Update environment variables
- Update Supabase authentication settings with production URLs
- Ensure all dependencies are installed

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check environment variables are set correctly
   - Verify Supabase project URL and API key
   - Check redirect URLs in Supabase settings

2. **Database errors**
   - Ensure SQL schema was run successfully
   - Check RLS policies are enabled
   - Verify user is authenticated

3. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify all imports are correct

### Getting Help
- Check Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs
