# AI Forester App

A mobile application for forestry field assessments using React Native.

## Project Overview

The AI Forester App is designed to help forest professionals collect data in the field using a modular, dynamic form system. The app allows users to:

- Create new field assessments
- Save assessments locally
- View and manage saved assessments
- Export assessment data

## Technologies

- **Frontend**: React Native (managed by Expo)
- **Backend**: Node.js
- **Storage**: AsyncStorage for local data persistence
- **Navigation**: React Navigation

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

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

3. Fix vulnerabilities (if needed):
   ```
   npm audit fix --force
   ```

4. Start the development server:
   ```
   npx expo start --clear
   ```
   
   Note: If you prefer to install Expo CLI globally:
   ```
   npm install -g expo-cli
   expo start --clear
   ```

5. Scan the QR code with Expo Go app on your mobile device.

## Project Structure

```
ai-forester-clean/
├── assets/                # Images, fonts, etc.
├── components/            # Reusable UI components
│   └── forms/             # Form-related components
├── config/                # Configuration files
├── navigation/            # Navigation configuration
├── screens/               # App screens
│   └── forms/             # Form-related screens
├── utils/                 # Utility functions
├── App.js                 # App entry point
├── app.json               # Expo configuration
└── package.json           # Project dependencies
```

## Features

- **Dynamic Form System**: Create customizable field assessment forms
- **Local Storage**: Save and manage forms on the device using AsyncStorage
- **Form Viewing**: View detailed form information
- **Form Management**: Create, view, and delete forms

## Working with the App

1. **Creating a New Assessment**:
   - Navigate to the "New Assessment" tab
   - Enter the required information
   - Click "Save Assessment"

2. **Viewing Saved Assessments**:
   - Navigate to the "Saved Assessments" tab
   - Tap on an assessment to view details

3. **Deleting an Assessment**:
   - From the Saved Assessments list, tap the trash icon on an assessment
   - Or open an assessment and use the delete button

## Troubleshooting

### Common Issues:

1. **"expo command not found"**: Use `npx expo start` instead, or install Expo CLI globally with `npm install -g expo-cli`

2. **Dependency vulnerabilities**: Run `npm audit fix --force` to address vulnerabilities

3. **Metro bundler issues**: Clear the cache with `npx expo start --clear`

4. **Bundling errors**: Make sure to check the Metro bundler console output for errors

## Changelog

### 2025-04-30
- ADDED: ViewFormScreen for viewing saved form details
- ADDED: SavedFormsScreen for managing saved forms
- UPDATED: Navigation system to handle all screens
- FIXED: Updated package.json with latest dependencies
- IMPROVED: Form handling with proper AsyncStorage functions

### 2025-04-29
- CREATED: Initial project setup with clean architecture
- ADDED: Basic navigation structure
- IMPLEMENTED: Project documentation

## License

This project is proprietary and confidential.
