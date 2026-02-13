# 💬 iQuote - Quote Sharing Platform

A modern, responsive web application for sharing and discovering inspiring quotes. Built with React and featuring a clean, professional dark theme design.

![iQuote Banner](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 📝 **Post Quotes** - Share your favorite quotes with the community
- ❤️ **Like System** - Show appreciation for quotes you love
- 👤 **User Profiles** - Manage your personal quote collection
- 📋 **Copy & Share** - Easily copy quotes or share them with others
- 🔐 **Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean, professional dark theme with teal accents
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## 🎨 Design System

### Color Palette
- **Primary Background**: Deep Navy (`#0F172A`)
- **Secondary Background**: Lighter Navy (`#1E293B`)
- **Primary Accent**: Teal (`#14B8A6`)
- **Secondary Accent**: Purple (`#8B5CF6`)
- **Text Primary**: Almost White (`#F8FAFC`)
- **Text Secondary**: Gray (`#94A3B8`)

### Typography
- **Font Family**: DM Sans (Google Fonts)
- **Spacing**: 8px grid system
- **Borders**: Subtle rounded corners (12px)
- **Shadows**: Soft, professional depth effects

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Otuja/quote_frontend.git
   cd quote_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://your-backend-api-url.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🛠️ Tech Stack

### Core
- **React 19.1.1** - UI library
- **Vite 7.1.0** - Build tool and dev server
- **React Router DOM 7.7.1** - Client-side routing

### Styling
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Custom CSS** - Design system with CSS variables

### State & Data
- **Axios 1.11.0** - HTTP client for API requests
- **React Toastify 11.0.5** - Toast notifications

### Icons & UI
- **React Icons 5.5.0** - Icon library (FontAwesome)

## 📁 Project Structure

```
quote_frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx   # Navigation header
│   │   └── Footer.jsx   # Page footer
│   ├── layouts/         # Layout components
│   │   ├── MainLayout.jsx
│   │   └── SecondaryLayout.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx      # Quote feed
│   │   ├── QuoteForm.jsx     # Create quote
│   │   ├── UpdatePage.jsx    # Edit quote
│   │   ├── ProfilePage.jsx   # User profile
│   │   ├── Login.jsx         # Login page
│   │   └── Register.jsx      # Registration page
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles & design system
│   └── main.jsx         # App entry point
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 🔑 Key Components

### Header
- Responsive navigation with mobile menu
- Authentication-aware (shows different options for logged-in users)
- Modern icons for all navigation items

### Quote Cards
- Clean card design with proper spacing
- Action buttons: Copy, Share, Like, Edit, Delete
- Author attribution
- Like counter with visual feedback

### Forms
- Spacious, user-friendly layouts
- Character counter for quote text
- Validation and error handling
- Loading states

## 🌐 API Integration

The frontend communicates with a Django REST API backend. Key endpoints:

- `GET /api/quotes/` - Fetch all quotes
- `POST /api/quotes/` - Create a new quote
- `PUT /api/quotes/{id}/` - Update a quote
- `DELETE /api/quotes/{id}/` - Delete a quote
- `POST /api/quotes/{id}/like/` - Toggle like on a quote
- `POST /api/account/login/` - User login
- `POST /api/account/register/` - User registration

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Features in Detail

### Authentication
- JWT token-based authentication
- Tokens stored in localStorage
- Protected routes for authenticated users
- Automatic redirect on logout

### Quote Management
- Create, read, update, delete (CRUD) operations
- Real-time updates after actions
- Toast notifications for user feedback
- Loading skeletons for better UX

### Like System
- One-click like/unlike functionality
- Visual feedback with toast messages
- Like count updates in real-time
- Requires authentication

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **iQuote Team** - Initial work

## 🙏 Acknowledgments

- Design inspired by modern web applications
- Icons from React Icons (FontAwesome)
- Font: DM Sans from Google Fonts

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Made with ❤️ by the iQuote Team**
