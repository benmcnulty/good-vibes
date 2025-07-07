# Claude Guide – Weather SPA Example

This file describes the vibe-coded plan for building the **Weather SPA Example** dashboard application.

## Purpose
- Demonstrate a comprehensive weather dashboard with modern UI design
- Showcase interactive data visualization and user experience patterns
- Provide a realistic example of API-driven application architecture
- Serve as a template for data-rich dashboard applications

## Key Features

### Design & User Experience
- **Modern Dashboard**: Clean, professional weather interface with intuitive navigation
- **Gradient Design**: Beautiful color schemes that reflect weather conditions
- **Responsive Layout**: Fully responsive design optimized for all devices
- **Weather Icons**: Emoji-based weather icons for universal understanding
- **Loading States**: Smooth loading animations and transitions for better UX

### Core Functionality
- **City Search**: Interactive search functionality with real-time results
- **Current Weather**: Detailed current conditions with comprehensive weather metrics
- **7-Day Forecast**: Extended forecast with daily weather predictions
- **Popular Cities**: Quick access to weather in major global cities
- **Location Services**: Geolocation integration for automatic local weather

### Weather Data Display
- **Current Conditions**: Temperature, description, feels-like temperature
- **Detailed Metrics**: Humidity, wind speed, pressure, visibility, UV index
- **Forecast Cards**: Daily forecasts with high/low temperatures and conditions
- **City Comparison**: Multiple city weather cards for easy comparison
- **Visual Indicators**: Color-coded weather conditions and status indicators

### Interactive Features
- **Search Functionality**: Real-time city search with validation and error handling
- **Quick Actions**: One-click access to popular cities and current location
- **Dynamic Updates**: Simulated live weather data updates with loading states
- **Navigation**: Smooth single-page application with section-based navigation
- **Hover Effects**: Interactive cards and buttons with visual feedback

### Technical Implementation
- **Weather Data Simulation**: Comprehensive mock weather data for 6+ cities
- **API Architecture**: Structured data handling that mimics real weather APIs
- **Error Handling**: Graceful error states for unavailable cities or location issues
- **Performance**: Optimized animations and transitions for smooth interactions
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

### Sample Cities
- **Global Coverage**: Pre-loaded data for New York, London, Tokyo, Sydney, Paris, Dubai, Rio de Janeiro, Mumbai
- **Diverse Conditions**: Various weather conditions from sunny to rainy to extreme heat
- **Complete Forecasts**: 7-day forecasts for each city with detailed daily predictions
- **Realistic Data**: Weather metrics that accurately represent real-world conditions

## Architecture

### Data Structure
- **Weather Objects**: Comprehensive weather data structure with current conditions and forecasts
- **City Management**: Efficient city data storage and retrieval system
- **State Management**: Clean state handling for current weather and forecast data
- **Error States**: Proper error handling and user feedback mechanisms

### User Interface
- **Component-Based Design**: Reusable weather cards, forecast items, and navigation components
- **Grid Layouts**: Responsive CSS Grid for weather cards and forecast displays
- **Animation System**: Consistent animation patterns for loading, transitions, and interactions
- **Theme System**: Weather-appropriate color schemes and visual styling

### Functionality
- **Search System**: Robust search functionality with input validation and suggestions
- **Location Services**: Geolocation API integration with fallback options
- **Data Updates**: Simulated real-time data updates with loading indicators
- **Navigation Router**: Single-page application routing between dashboard sections

## Styling Approach
- **CSS Custom Properties**: Consistent design system with weather-themed color variables
- **Weather Colors**: Specialized color schemes for different weather conditions
- **Modern CSS**: Advanced CSS features including gradients, transforms, and animations
- **Mobile-First**: Responsive design principles with progressive enhancement
- **Visual Hierarchy**: Clear information hierarchy with proper typography and spacing

## Interactive Elements
- **Search Input**: Enhanced search field with focus states and autocomplete styling
- **Weather Cards**: Interactive city cards with hover effects and click actions
- **Forecast Timeline**: Scrollable forecast display with smooth interactions
- **Quick Actions**: One-click buttons for common weather queries
- **Loading Animations**: Engaging loading spinners and state transitions

Follow the main project conventions in [CLAUDE.md](../../CLAUDE.md) when expanding this example.
