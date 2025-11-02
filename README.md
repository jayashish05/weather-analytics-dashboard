# 🌦️ Weather Analytics Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.2-764abc?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.5.0-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A production-ready weather analytics platform with real-time data, cloud sync, and intelligent insights**

**Built for TapTalent.ai Internship Assignment**

[Live Demo](https://your-app.onrender.com) • [Report Bug](https://github.com/yourusername/weather-dashboard/issues) • [Request Feature](https://github.com/yourusername/weather-dashboard/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment-to-render)
- [Features Breakdown](#-features-breakdown)
- [API Integration](#-api-integration)
- [Firebase Setup](#-firebase-setup)
- [Assignment Requirements](#-assignment-requirements)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

A comprehensive, enterprise-grade weather analytics dashboard that provides real-time weather data, forecasts, and interactive visualizations for cities worldwide. Built with modern React patterns, Redux Toolkit for state management, and Firebase for authentication and cloud data sync.

### 🎓 Assignment Context

Developed as part of the **TapTalent.ai** internship technical assignment, demonstrating:
- Advanced React development with Hooks and functional components
- Complex state management with Redux Toolkit
- External API integration with caching strategies
- Real-time data synchronization
- Firebase Authentication and Firestore integration
- Responsive UI/UX design with Tailwind CSS
- Production deployment on Render

---

## ✨ Features

### 📍 Your Location Weather
- **One-Click Location Access**: Get weather for your current location instantly
- **Browser Geolocation**: Seamless integration with browser geolocation API
- **Beautiful Card Design**: Gradient blue card with prominent weather display
- **Real-Time Updates**: Auto-refresh every 60 seconds
- **Permission Handling**: User-friendly permission requests and error messages
- **Detailed Metrics**: Temperature, feels-like, humidity, wind, pressure

### 🕐 Recent Searches
- **Smart Tracking**: Automatically tracks last 5 searched cities
- **Quick Access**: Recently searched cities displayed with weather cards
- **One-Click Favorites**: Add to favorites with star button directly from recent searches
- **Persistent Storage**: Saved locally and synced to cloud for authenticated users
- **Visual Feedback**: Filled star (yellow) for favorites, outlined star for non-favorites

### ⭐ Your Favorites
- **Multi-City Dashboard**: Display weather for multiple favorite cities simultaneously
- **Real-Time Updates**: Automatic data refresh every 60 seconds
- **Dynamic Temperature**: Switch between Celsius and Fahrenheit
- **Weather Icons**: Visual condition indicators from OpenWeatherMap
- **Key Metrics**: Temperature, humidity, wind speed, pressure at a glance
- **Click-Through Navigation**: Tap any city card to view detailed analytics
- **Cloud Sync**: Favorites synced across devices for signed-in users

### 📈 Detailed City Analytics
- **5-Day Forecast**: Extended weather predictions with daily breakdowns
- **Hourly Forecast**: 24-hour detailed weather trends
- **Historical Trends**: Weather pattern analysis over time
- **Interactive Charts** (4+ Recharts visualizations):
  - **Temperature Line Chart**: Hourly temperature trends
  - **Precipitation Bar Chart**: Rainfall levels with humidity
  - **Wind Chart**: Speed and direction analysis
  - **Daily Forecast Area Chart**: Min/Max temperatures
- **Advanced Statistics**: Pressure, visibility, cloudiness, sunrise/sunset
- **Responsive Design**: Charts adapt seamlessly to all screen sizes

### 🔍 Smart Search
- **Autocomplete**: Real-time city suggestions as you type
- **Debounced Input**: Optimized API calls (300ms delay)
- **Geocoding API**: Accurate city name resolution worldwide
- **Geographic Details**: City, state, country information
- **Instant Addition**: Click to add to recent searches

### 🔐 Google Authentication (Bonus Feature)
- **Firebase Integration**: Secure Google Sign-In with popup
- **User Profiles**: Display user photo and name in header
- **Session Persistence**: Stay signed in after page refresh
- **Automatic State Restoration**: Auth state monitored with `onAuthStateChanged`
- **Clean Sign Out**: One-click logout functionality

### ☁️ Cloud Data Sync (Bonus Feature)
- **Firestore Integration**: Real-time database for user data
- **Auto-Save**: Favorites and searches automatically saved to cloud
- **Cross-Device Sync**: Access your data from any device
- **Smart Merging**: Cloud data loaded on sign-in, local data preserved
- **Offline Support**: Works without internet, syncs when online

### ⚙️ User Preferences
- **Temperature Toggle**: Seamless °C ↔ °F conversion
- **Global Updates**: All displays update instantly
- **Persistent Settings**: Saved to localStorage and cloud

### ⚡ Performance Optimizations
- **60-Second Cache**: Intelligent caching to reduce API calls
- **Data Freshness**: Automatic cache invalidation after 60 seconds
- **Debounced Search**: Prevents excessive API requests
- **Loading States**: Skeleton screens for better perceived performance
- **Error Boundaries**: Graceful error recovery
- **Lazy Loading**: Component-level code splitting

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0**: Modern UI library with Hooks
- **JSX**: Component-based architecture
- **Functional Components**: All components use React Hooks (useState, useEffect, useSelector, useDispatch)

### State Management
- **Redux Toolkit 2.9.2**: Predictable state container
- **Redux Thunks**: Async action handling with createAsyncThunk
- **Redux Slices**: weatherSlice, favoritesSlice, settingsSlice, authSlice, recentSearchesSlice

### Routing & Navigation
- **React Router DOM 7.9.5**: Client-side routing
- **Dynamic Routes**: City details with URL parameters

### Data Visualization
- **Recharts 3.3.0**: Interactive, responsive charts
- **Chart Types**: Line, Bar, Area charts with tooltips and legends

### Authentication & Database
- **Firebase 12.5.0**: Backend-as-a-Service
- **Firebase Auth**: Google Sign-In with popup
- **Cloud Firestore**: NoSQL database for user data sync
- **onAuthStateChanged**: Automatic auth state persistence

### API & Data Fetching
- **Axios 1.13.1**: HTTP client for API requests
- **OpenWeatherMap API**: Weather data provider
  - Current Weather API
  - 5-Day Forecast API
  - Hourly Forecast API
  - Geocoding API
- **Browser Geolocation API**: Current location detection

### Styling & UI
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom Components**: Reusable, styled components
- **Responsive Design**: Mobile-first approach

### Performance & Optimization
- **In-Memory Caching**: 60-second cache duration
- **Debouncing**: Input optimization (300ms delay)
- **localStorage**: Client-side data persistence
- **Code Splitting**: Lazy loading for optimal performance

### Development Tools
- **Create React App**: Project bootstrapping
- **Node.js & npm**: Package management
- **ESLint**: Code linting
- **Git**: Version control

### Deployment
- **Render**: Cloud hosting platform
- **serve**: Static file serving for production
- **Environment Variables**: Secure configuration management

---

## 📁 Project Structure

```
my-app/
├── public/
│   ├── index.html                      # Main HTML file
│   ├── manifest.json                   # PWA manifest
│   └── robots.txt                      # SEO robots file
│
├── src/
│   ├── components/
│   │   ├── AuthButton/
│   │   │   └── AuthButton.jsx          # Google Sign-In button
│   │   ├── CityCard/
│   │   │   └── CityCard.jsx            # Weather card with metrics
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx           # 3-section dashboard layout
│   │   ├── HistoricalTrends/
│   │   │   └── HistoricalTrends.jsx    # Weather pattern analysis
│   │   ├── LocationWeather/
│   │   │   └── LocationWeather.jsx     # Current location weather
│   │   ├── SearchBar/
│   │   │   └── SearchBar.jsx           # City search with autocomplete
│   │   ├── SettingsToggle/
│   │   │   └── SettingsToggle.jsx      # Celsius/Fahrenheit toggle
│   │   └── WeatherChart/
│   │       ├── TemperatureChart.jsx    # Hourly temp line chart
│   │       ├── PrecipitationChart.jsx  # Precipitation bar chart
│   │       ├── WindChart.jsx           # Wind speed/direction chart
│   │       └── DailyForecastChart.jsx  # 5-day forecast area chart
│   │
│   ├── features/
│   │   ├── authSlice.js                # Authentication state
│   │   ├── favoritesSlice.js           # Favorite cities management
│   │   ├── recentSearchesSlice.js      # Recent searches tracking
│   │   ├── settingsSlice.js            # User preferences
│   │   └── weatherSlice.js             # Weather data & async thunks
│   │
│   ├── pages/
│   │   ├── CityDetailsPage.jsx         # Detailed analytics page
│   │   └── DashboardPage.jsx           # Main dashboard page
│   │
│   ├── services/
│   │   ├── firebase.js                 # Firebase config & Firestore
│   │   └── weatherAPI.js               # OpenWeatherMap integration
│   │
│   ├── utils/
│   │   ├── dateFormat.js               # Date formatting utilities
│   │   ├── unitConversion.js           # Temperature conversion
│   │   └── weatherHelpers.js           # Weather icons & helpers
│   │
│   ├── App.js                          # Main app with routing & auth
│   ├── App.css                         # Global styles
│   ├── index.js                        # React entry point
│   ├── index.css                       # Tailwind CSS imports
│   └── store.js                        # Redux store configuration
│
├── .env                                # Environment variables (not in git)
├── .gitignore                          # Git ignore rules
├── package.json                        # Dependencies & scripts
├── tailwind.config.js                  # Tailwind configuration
├── postcss.config.js                   # PostCSS configuration
├── render.yaml                         # Render deployment config
├── DEPLOYMENT.md                       # Deployment instructions
└── README.md                           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn**
- **OpenWeatherMap API key** (free tier: https://openweathermap.org/api)
- **Firebase Project** (for authentication - free tier)
- **Git** (for version control)

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/weather-analytics-dashboard.git
   cd weather-analytics-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a \`.env\` file in the root directory with:
   
   \`\`\`env
   # OpenWeatherMap API
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   
   # Firebase Configuration  
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

5. **Open your browser**
   
   Navigate to http://localhost:3000

### Build for Production

\`\`\`bash
npm run build
\`\`\`

Creates an optimized production build in the \`build/\` directory.

---

## � Environment Variables

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| \`REACT_APP_OPENWEATHER_API_KEY\` | OpenWeatherMap API key | [Get API Key](https://openweathermap.org/api) |
| \`REACT_APP_FIREBASE_API_KEY\` | Firebase API key | Firebase Console → Project Settings |
| \`REACT_APP_FIREBASE_AUTH_DOMAIN\` | Firebase auth domain | Firebase Console → Project Settings |
| \`REACT_APP_FIREBASE_PROJECT_ID\` | Firebase project ID | Firebase Console → Project Settings |
| \`REACT_APP_FIREBASE_STORAGE_BUCKET\` | Firebase storage bucket | Firebase Console → Project Settings |
| \`REACT_APP_FIREBASE_MESSAGING_SENDER_ID\` | Firebase messaging sender ID | Firebase Console → Project Settings |
| \`REACT_APP_FIREBASE_APP_ID\` | Firebase app ID | Firebase Console → Project Settings |

### Getting API Keys

#### OpenWeatherMap API
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key
5. **Wait 10-15 minutes** for activation

#### Firebase Configuration
1. Go to https://console.firebase.google.com/
2. Create a new project
3. Add a web app
4. Copy configuration values
5. Enable Authentication → Google Sign-In
6. Enable Firestore Database

---

## 🌐 Deployment to Render

### Quick Deploy (Automated)

1. **Push code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Create new Web Service on Render**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure service**
   - **Name**: weather-analytics-dashboard
   - **Environment**: Node
   - **Build Command**: \`npm install && npm run build\`
   - **Start Command**: \`npx serve -s build -l $PORT\`
   - **Instance Type**: Free

4. **Add environment variables**
   
   Add all variables from your \`.env\` file in the Environment tab

5. **Deploy**
   
   Click "Create Web Service" and wait 5-10 minutes

### Manual Deploy with render.yaml

The \`render.yaml\` file is already configured. Just:

1. Connect repository to Render
2. Render will auto-detect the configuration
3. Add environment variables
4. Deploy!

### Important: Firebase Setup for Production

After deploying, add your Render domain to Firebase:

1. Firebase Console → Authentication → Settings
2. Authorized domains → Add domain
3. Add: \`your-app-name.onrender.com\`

### Deployment Checklist

- ✅ Environment variables configured
- ✅ Firebase authorized domains updated  
- ✅ OpenWeatherMap API key active (wait 15 min after creation)
- ✅ Git repository pushed to GitHub
- ✅ Render service created and deployed

---

## 📖 Usage Guide

### 1. Your Location Weather
1. Click "Enable Location" button
2. Allow browser location permission
3. View your current city's weather

### 2. Searching for Cities
1. Type city name in search bar (minimum 2 characters)
2. Select from autocomplete dropdown
3. City appears in "Recent Searches"

### 3. Managing Favorites
- **Add to favorites**: Click ⭐ star button on recent search cards
- **Remove from favorites**: Click ⭐ filled star to remove
- **View favorites**: All favorited cities shown in "Your Favorites" section

### 4. Viewing Detailed Analytics
1. Click any city card
2. Explore 4+ interactive charts
3. View 5-day forecast
4. Check historical trends
5. Click "← Back" to return

### 5. Temperature Units
- Click the Celsius/Fahrenheit toggle in header
- All temperatures update instantly

### 6. Google Sign-In
1. Click "Sign in with Google"
2. Select Google account
3. Your favorites & searches sync to cloud
4. Stay signed in after refresh

---

## ✅ Assignment Requirements

### Core Requirements
- ✅ **React with Hooks**: All components use functional components with useState, useEffect, useSelector, useDispatch
- ✅ **Redux Toolkit**: Centralized state management with 4 slices (weather, favorites, settings, auth)
- ✅ **Dashboard Page**: Multi-city weather display with real-time updates
- ✅ **Detailed View**: Comprehensive analytics with 4+ chart types
- ✅ **Search & Favorites**: City search with autocomplete and favorites management
- ✅ **Settings**: Temperature unit toggle (Celsius/Fahrenheit)
- ✅ **Real-time Data**: Auto-refresh every 60 seconds
- ✅ **Recharts Integration**: 4 different chart types (Line, Bar, Area)

### Bonus Features
- ✅ **Google Authentication**: Firebase-based Google Sign-In
- ✅ **Data Caching**: 60-second cache to reduce API calls
- ✅ **Data Freshness**: Real-time validation ensuring data is never older than 60 seconds
- ✅ **Location Weather**: Browser geolocation integration
- ✅ **Historical Trends**: Weather pattern analysis

### Technical Implementation
- ✅ **Responsive Design**: Mobile-first Tailwind CSS
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **Loading States**: Skeleton screens and spinners
- ✅ **Code Organization**: Modular component structure
- ✅ **Performance**: Optimized with caching and debouncing
- ✅ **Production Build**: Optimized bundle size

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data API
- [Recharts](https://recharts.org/) for beautiful chart components
- [Firebase](https://firebase.google.com/) for authentication services
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [TapTalent.ai](https://taptalent.ai/) for the internship opportunity

---

## 🔧 Configuration

### Customization Options

**Tailwind Config** (\`tailwind.config.js\`):
\`\`\`javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // Customize primary color
      secondary: '#10B981',   // Customize secondary color
    },
  },
}
\`\`\`

**Cache Duration** (\`src/services/weatherAPI.js\`):
\`\`\`javascript
const CACHE_DURATION = 60 * 1000; // Change refresh interval
\`\`\`

## 📊 State Management

### Redux Slices

1. **weatherSlice**: Weather data, forecasts, search results
2. **favoritesSlice**: Favorite cities list
3. **settingsSlice**: User preferences (temperature unit)

### Async Thunks

- \`fetchCurrentWeather\`: Get current weather for a city
- \`fetchForecast\`: Get 5-day forecast
- \`fetchHourlyForecast\`: Get hourly forecast
- \`searchCitiesThunk\`: Search for cities

## 🐛 Troubleshooting

## ✅ Assignment Requirements Checklist

### Core Requirements ✅
- ✅ **React with Hooks**: All components use functional components with useState, useEffect, useSelector, useDispatch
- ✅ **Redux Toolkit**: Centralized state management with 5 slices (weather, favorites, settings, auth, recentSearches)
- ✅ **Dashboard Page**: Multi-city weather display with 3 sections (Location, Recent, Favorites)
- ✅ **Detailed View**: Comprehensive analytics with 4+ chart types
- ✅ **Search & Favorites**: City search with autocomplete and favorites management
- ✅ **Settings**: Temperature unit toggle (Celsius/Fahrenheit)
- ✅ **Real-time Data**: Auto-refresh every 60 seconds
- ✅ **Recharts Integration**: 4 different chart types (Line, Bar, Area)
- ✅ **Responsive Design**: Mobile-first Tailwind CSS

### Bonus Features ✅
- ✅ **Google Authentication**: Firebase-based Google Sign-In with popup
- ✅ **Data Caching**: 60-second cache to reduce API calls
- ✅ **Data Freshness**: Real-time validation ensuring data is never older than 60 seconds
- ✅ **Location Weather**: Browser geolocation integration
- ✅ **Historical Trends**: Weather pattern analysis
- ✅ **Cloud Data Sync**: Firestore integration for favorites and searches
- ✅ **Session Persistence**: Auto sign-in on page refresh
- ✅ **Cross-Device Sync**: Access data from any device

### Technical Implementation ✅
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **Loading States**: Skeleton screens and spinners
- ✅ **Code Organization**: Modular component structure
- ✅ **Performance**: Optimized with caching and debouncing
- ✅ **Production Build**: Optimized bundle size
- ✅ **Deployment Ready**: Configured for Render


<div align="center">

**Built with ❤️ for TapTalent.ai Internship Assignment**

⭐ Star this repository if you found it helpful!

</div>