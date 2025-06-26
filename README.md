# AccounTech Pro - Modern Accounting SaaS

A comprehensive online accounting web application built with Next.js 15, React 18, and modern web technologies. Inspired by QuickBooks Online, AccounTech Pro provides all the essential tools for managing business finances.

## 🚀 Features

- **📊 Dashboard**: Comprehensive business overview with key metrics and interactive charts
- **📄 Invoices**: Create, manage, and track invoices with payment status
- **💰 Expenses**: Log and categorize business expenses with approval workflows
- **📈 Reports**: Generate detailed financial reports with interactive visualizations
- **👥 Customers**: CRM-style customer management with contact information
- **💼 Payroll**: Employee management and payroll processing
- **⚙️ Settings**: Comprehensive settings for company, profile, notifications, security, and billing
- **🌙 Dark Mode**: Full dark/light theme support
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔐 Secure**: Built with security best practices and authentication ready

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom properties
- **Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **TypeScript**: Full type safety throughout

## 🏗️ Project Structure

\`\`\`
accountech-pro/
├── app/                    # Next.js App Router pages
│   ├── customers/         # Customer management
│   ├── expenses/          # Expense tracking
│   ├── invoices/          # Invoice management
│   ├── payroll/           # Payroll system
│   ├── reports/           # Financial reports
│   ├── settings/          # Application settings
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components
│   ├── reports/           # Report components
│   ├── theme-provider.tsx # Theme provider
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── public/                # Static assets
├── Dockerfile            # Docker configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies and scripts
\`\`\`

## 🚀 Getting Started

## 🚀 Quick Setup with Supabase

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your database to be ready

### 2. Set up Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase project URL and keys from your Supabase dashboard

### 3. Run Database Setup
1. Go to your Supabase dashboard → SQL Editor
2. Copy and run the contents of `scripts/01-create-tables.sql`
3. After signing up your first user, run `scripts/02-seed-data.sql`

### 4. Start the Application
\`\`\`bash
npm install
npm run dev
\`\`\`

Your accounting application is now fully functional with:
- ✅ User authentication and registration
- ✅ Real database with all CRUD operations
- ✅ Multi-user support with data isolation
- ✅ All features working with persistent data
\`\`\`

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd accountech-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Build and run with Docker

\`\`\`bash
# Build the Docker image
docker build -t accountech-pro .

# Run the container
docker run -p 3000:3000 accountech-pro
\`\`\`

## ☁️ Cloud Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Other Platforms

The application is compatible with any platform that supports Next.js:
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

\`\`\`env
# Database (when you add one)
DATABASE_URL=your-database-url

# Authentication (when you add it)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# Email service (optional)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email
EMAIL_SERVER_PASSWORD=your-password
\`\`\`

### Customization

- **Colors**: Modify `app/globals.css` to change the color scheme
- **Components**: All UI components are in `components/ui/` and can be customized
- **Layout**: Modify `components/layout/` for navigation and header changes
- **Data**: Currently uses mock data - replace with your database integration

## 📊 Features Overview

### Dashboard
- Revenue overview with interactive charts
- Key performance indicators (KPIs)
- Recent transactions
- Quick access to all modules

### Invoice Management
- Create and send professional invoices
- Track payment status (paid, pending, overdue, draft)
- Customer billing information
- Invoice templates and customization

### Expense Tracking
- Categorize business expenses
- Approval workflows
- Receipt management
- Expense reporting and analytics

### Financial Reports
- Profit & Loss statements
- Cash flow analysis
- Expense breakdowns
- Interactive charts and visualizations

### Customer Management
- Contact information and communication history
- Invoice tracking per customer
- Outstanding balances
- Customer analytics

### Payroll System
- Employee management
- Salary and wage calculations
- Pay period configuration
- Payroll reporting

### Settings & Configuration
- Company information
- User profile management
- Notification preferences
- Security settings
- Billing and subscription management

## 🔐 Security Features

- Input validation and sanitization
- CSRF protection
- Secure headers
- Environment variable protection
- Authentication ready (integrate with NextAuth.js, Auth0, or Clerk)

## 🎨 UI/UX Features

- Modern, clean interface
- Responsive design for all screen sizes
- Dark/light theme support
- Accessible components (WCAG compliant)
- Smooth animations and transitions
- Intuitive navigation

## 🚀 Production Checklist

- [ ] **Database**: Integrate with PostgreSQL, MySQL, or MongoDB
- [ ] **Authentication**: Add NextAuth.js, Auth0, or Clerk
- [ ] **Environment Variables**: Configure production secrets
- [ ] **SSL/HTTPS**: Enable secure connections
- [ ] **Monitoring**: Add error tracking (Sentry, LogRocket)
- [ ] **Analytics**: Integrate usage analytics
- [ ] **Backups**: Set up automated database backups
- [ ] **Email**: Configure transactional emails (SendGrid, Resend)
- [ ] **Payment Processing**: Integrate Stripe or similar
- [ ] **Multi-tenancy**: Implement organization/tenant separation

## 🔄 Extending the Application

### Adding Authentication

\`\`\`bash
# Install NextAuth.js
npm install next-auth

# Configure providers in app/api/auth/[...nextauth]/route.ts
\`\`\`

### Adding a Database

\`\`\`bash
# Install Prisma (recommended)
npm install prisma @prisma/client

# Or use Drizzle ORM
npm install drizzle-orm
\`\`\`

### Adding Payment Processing

\`\`\`bash
# Install Stripe
npm install stripe @stripe/stripe-js
\`\`\`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

## 🎯 Roadmap

- [ ] Multi-language support (i18n)
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Advanced workflow automation
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Time tracking integration
- [ ] Document management system
- [ ] Advanced user permissions and roles

---

**AccounTech Pro** - Professional accounting software for the modern business. Built with ❤️ using Next.js and modern web technologies.
