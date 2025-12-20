# 🚀 Lewis's Project Hub

A modern, full-stack project portfolio management system built with React, TypeScript, and Supabase. This application allows developers to showcase their projects, sync repositories from GitHub, and manage their development portfolio with a beautiful, responsive UI.

## ✨ Features

### 🎯 Core Features
- **🔐 Authentication**: Secure user authentication powered by Supabase Auth
- **📊 Dashboard**: Comprehensive overview of all your projects with stats and analytics
- **🗂️ Project Management**: Full CRUD operations for managing your development projects
- **⭐ Featured Projects**: Highlight your best work on a public portfolio page
- **🔄 GitHub Integration**: Automatically sync and import repositories from GitHub
- **🏷️ Smart Categorization**: Organize projects by status (Idea, In Progress, Completed) and category (Practice, School, Startup, Open Source)
- **🔍 Advanced Filtering**: Search and filter projects by name, tech stack, status, and category
- **📈 Project Analytics**: Track stars, forks, and other GitHub metrics

### 🎨 User Interface
- **✨ Modern Design**: Beautiful glassmorphic UI with smooth animations using Framer Motion
- **🌓 Theme Support**: Built-in dark/light mode support with next-themes
- **📱 Responsive**: Fully responsive design that works on all device sizes
- **🎭 Accessible**: Built with accessibility in mind using Radix UI primitives
- **🎨 Gradient Accents**: Eye-catching gradient effects and modern styling

### 🛠️ Developer Experience
- **⚡ Fast Development**: Lightning-fast HMR with Vite
- **🔒 Type Safety**: Full TypeScript support throughout the application
- **🎯 Code Quality**: ESLint configured for consistent code style
- **📦 Component Library**: Pre-built UI components with shadcn-ui
- **🔄 Real-time Updates**: Live updates using Supabase Realtime
- **🧪 React Query**: Efficient data fetching and caching

## 🏗️ Tech Stack

### Frontend
- **[React 18.3](https://react.dev/)** - Modern UI library
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 5.4](https://vitejs.dev/)** - Next-generation frontend tooling
- **[React Router 6.30](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12](https://www.framer.com/motion/)** - Production-ready animations

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication & authorization

### State Management & Data Fetching
- **[TanStack Query (React Query)](https://tanstack.com/query/)** - Powerful async state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** - Package manager (comes with Node.js)
- **Git** - Version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lewiii254/lewiii-s-project-hub.git
cd lewiii-s-project-hub
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

**Getting Supabase Credentials:**
1. Create a free account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the Project URL and anon/public key

### 4. Set Up the Database

Run the database migration to create the necessary tables:

```bash
# If you have Supabase CLI installed
supabase db push

# Or manually run the migration file in your Supabase SQL editor:
# Copy contents from: supabase/migrations/20251220070518_656fdb76-5e2c-4a90-a938-d49f2fa293a5.sql
```

The migration will create:
- `profiles` table - User profile information
- `projects` table - Project data with GitHub integration
- Row Level Security (RLS) policies for data protection
- Triggers for auto-updating timestamps
- Function for handling new user signups

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏃 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development environment |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📁 Project Structure

```
lewiii-s-project-hub/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── auth/       # Authentication components
│   │   ├── dashboard/  # Dashboard-specific components
│   │   ├── layout/     # Layout components
│   │   ├── projects/   # Project-related components
│   │   └── ui/         # shadcn-ui components
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.tsx          # Authentication hook
│   │   ├── useProjects.ts       # Projects data management
│   │   └── use-toast.ts         # Toast notifications
│   ├── integrations/   # Third-party integrations
│   │   └── supabase/   # Supabase client configuration
│   ├── lib/            # Utility functions and helpers
│   ├── pages/          # Page components (routes)
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Projects.tsx         # Projects list view
│   │   ├── ProjectDetail.tsx    # Individual project view
│   │   ├── NewProject.tsx       # Create new project
│   │   ├── Portfolio.tsx        # Public portfolio page
│   │   ├── Featured.tsx         # Featured projects page
│   │   ├── Settings.tsx         # User settings
│   │   ├── Login.tsx           # Authentication page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── supabase/
│   └── migrations/     # Database migrations
├── .env                # Environment variables (not in git)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── README.md          # This file
```

## 🗄️ Database Schema

### Projects Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- title: TEXT (Project name)
- description: TEXT (Project description)
- tech_stack: TEXT[] (Technologies used)
- github_url: TEXT (GitHub repository URL)
- live_url: TEXT (Live demo URL)
- status: ENUM ('idea', 'in-progress', 'completed')
- category: ENUM ('practice', 'school', 'startup', 'opensource')
- featured: BOOLEAN (Show on portfolio)
- stars: INTEGER (GitHub stars)
- forks: INTEGER (GitHub forks)
- language: TEXT (Primary language)
- github_repo_id: BIGINT (GitHub repository ID)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Profiles Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- display_name: TEXT
- avatar_url: TEXT
- github_username: TEXT
- bio: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## 🔐 Security

The application implements several security best practices:

- **Row Level Security (RLS)**: All database tables use RLS policies to ensure users can only access their own data
- **Public Portfolio Access**: Featured projects are publicly accessible for portfolio display
- **Authentication**: Powered by Supabase Auth with secure session management
- **Environment Variables**: Sensitive data stored in environment variables
- **Type Safety**: TypeScript prevents common runtime errors

## 🎨 Customization

### Update Personal Information
Edit the following files to customize for your use:
- `src/pages/Portfolio.tsx` - Update name, bio, GitHub username, email
- `src/pages/Dashboard.tsx` - Update GitHub username in sync function
- `.env` - Configure your Supabase credentials

### Styling
- Colors and themes: `tailwind.config.ts`
- Global styles: `src/index.css`
- Component styles: Individual component files using Tailwind classes

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com/)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy!

### Other Platforms
The application can be deployed to any platform that supports static sites:
- Cloudflare Pages
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Run `npm run lint` before committing
- Write meaningful commit messages
- Test your changes thoroughly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Lewis (@lewiii254)**
- GitHub: [@lewiii254](https://github.com/lewiii254)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Lucide](https://lucide.dev/) for the icon set
- The React and TypeScript communities

## 📞 Support

If you have any questions or run into issues:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the [Supabase documentation](https://supabase.com/docs)
- Review the [React documentation](https://react.dev/)

---

**Built with ❤️ using React, TypeScript, and Supabase**
