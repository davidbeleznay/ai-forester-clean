# AI Forester App

A mobile application for forestry field assessments using React Native.

## Project Overview

The AI Forester App is designed to help forest professionals collect data in the field using a modular, dynamic form system. The app allows users to:

- Create new field assessments
- Save assessments locally
- View and manage saved assessments
- Export assessment data
- Size culverts for forest roads

## Technologies

- **Frontend**: React Native (managed by Expo)
- **Backend**: Node.js
- **Storage**: AsyncStorage for local data persistence
- **Navigation**: React Navigation

## Getting Started

### Prerequisites

- Node.js (v14+)
- Expo CLI
  - Install with: `npm install -g expo-cli`
  - If you don't want to install globally, use: `npx expo start`
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/davidbeleznay/ai-forester-clean.git
   cd ai-forester-clean
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx expo start --clear
   ```

4. Scan the QR code with Expo Go app on your mobile device.

## Project Structure

```
ai-forester-clean/
├── assets/                # Images, fonts, etc.
├── components/            # Reusable UI components
│   └── forms/             # Form-related components
├── navigation/            # Navigation configuration
│   ├── MainNavigator.js   # Main app navigation
│   └── CulvertToolNavigator.js # Culvert tool navigation
├── screens/               # App screens
│   ├── forms/             # Form-related screens
│   └── culvert/           # Culvert tool screens
├── src/                   # Source files
│   ├── components/        # Common components
│   ├── context/           # React context providers
│   └── styles/            # Global styles
├── utils/                 # Utility functions
├── config/                # Configuration files
├── App.js                 # App entry point
├── app.json               # Expo configuration
├── metro.config.js        # Metro bundler configuration
└── package.json           # Project dependencies
```

## Features

### Implemented
- **UI/UX Enhancements**:
  - Dark mode support with theme toggle
  - Improved visual design with modern card-based layout
  - Recent drafts section on home screen
- Basic navigation structure with tabs
- Home screen with app information
- New Assessment form with basic fields
- Saved assessments screen with list view
- Form deletion functionality
- Local storage using AsyncStorage
- Culvert Sizing Tool interface with:
  - Location capture using device GPS
  - Core required inputs based on specification:
    - Multiple top (W1) and bottom (W2) width measurements with averaging
    - Bankfull depth (D) input
    - Stream slope (S) input
    - Drainage area (A) input with switchable units (ha/km²)
    - Region value (fixed at 3.0)
  - Optional transport and climate consideration toggles
  - Detailed field descriptions matching standards

### Planned
- Dynamic form fields system
- Form templates for different assessment types
- Photo capture and management
- Location tracking
- Data export capabilities
- Culvert sizing calculations
- Visual culvert size representation

## Changelog

### 2025-05-13
- ADDED: Dark mode support with theme toggle button
- REDESIGNED: HomeScreen with modern UI/UX
- ADDED: Recent Drafts section to HomeScreen
- IMPLEMENTED: ThemeContext provider for app-wide theme state
- ENHANCED: Updated navigation components to support dark mode
- IMPROVED: Color scheme for better visual hierarchy

### 2025-05-09
- ADDED: Core required inputs based on specification table
- IMPLEMENTED: Top and bottom width collection with real-time averaging
- ADDED: Bankfull depth, stream slope, and drainage area input fields
- ENHANCED: Form field descriptions with proper formatting guidelines
- ADDED: Toggleable drainage area units (ha/km²)
- ADDED: Multiple stream width measurements with add/remove functionality
- IMPLEMENTED: Optional transport and climate consideration toggles
- ENHANCED: Culvert Tool form organization with improved section layout
- ADDED: Culvert Sizing Tool with basic input screen
- IMPLEMENTED: GPS location capture for culvert assessments
- CREATED: Navigation structure for Culvert Tool
- UPDATED: HomeScreen with Culvert Tool access button

### 2025-04-30
- REBUILT: Created new clean project structure to resolve bundling issues
- ADDED: SavedFormsScreen with simplified architecture
- FIXED: Asset resolution and bundling problems
- IMPLEMENTED: Navigation between all screens

### 2025-04-29
- CREATED: Initial project with basic form functionality
- ADDED: Form components with basic fields (text, toggle, textarea)
- IMPLEMENTED: Form data storage using AsyncStorage

## Troubleshooting

If you encounter bundling issues:

1. Make sure to use `expo start --clear` to clear the Metro bundler cache
2. Check metro.config.js if you need to exclude problematic files
3. Ensure all assets (icon.png, splash.png, etc.) exist in the assets folder

## License

This project is proprietary and confidential.
