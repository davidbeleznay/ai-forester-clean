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
- Expo CLI (`npm install -g expo-cli`)
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
   expo start
   ```

4. Scan the QR code with Expo Go app on your mobile device.

## Project Structure

```
ai-forester-clean/
├── assets/                # Images, fonts, etc.
├── components/            # Reusable UI components
│   └── forms/             # Form-related components
├── navigation/            # Navigation configuration
├── screens/               # App screens
│   └── forms/             # Form-related screens
├── utils/                 # Utility functions
├── App.js                 # App entry point
├── app.json               # Expo configuration
└── package.json           # Project dependencies
```

## Features

- Dynamic form fields system
- Local storage of assessments
- Form viewing and management

## Changelog

### 2025-04-29
- CREATED: Initial project setup with clean architecture
- ADDED: Basic navigation structure
- IMPLEMENTED: Project documentation

## License

This project is proprietary and confidential.
