# Traffic Webcams App

A universal React Native application built with [Expo](https://expo.dev) that allows users to browse and view traffic webcams across different platforms.

## 🚀 Features

- **Cross-Platform Support**: Seamlessly runs on Web, Android, and iOS.
- **Modern Navigation**: Implements file-based routing with Expo Router and custom drawer navigation.
- **State & Data Management**: Leverages `zustand` for efficient global state and `@tanstack/react-query` for asynchronous data handling.
- **Styling**: Beautiful and responsive UI crafted with `nativewind` (Tailwind CSS for React Native).
- **Robust Testing**: Comprehensive testing strategy including unit tests and end-to-end (E2E) tests.
- **Offline/Local Data Management**: Built-in scripts to fetch, parse, and store webcam data locally for fast access.

## 🛠️ Technologies Used

- **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Styling**: [Nativewind](https://www.nativewind.dev/) (Tailwind CSS 3.x)
- **Testing**: [Jest](https://jestjs.io/) (Unit) & [Playwright](https://playwright.dev/) (E2E)
- **Build Service**: [EAS Build](https://expo.dev/eas)

## 📦 Installation

1. Ensure you have Node.js and npm installed.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies:

```bash
npm install
```

## 🎮 Usage

### Development Server

To start the Expo development server, run:

```bash
npm start
```

### Running on Specific Platforms

- **Web**: `npm run web` (Starts the app in the browser)
- **Android**: `npm run android` (Requires an Android emulator or connected device)
- **iOS**: `npm run ios` (Requires macOS and Xcode simulator)

### Fetching Webcam Data

To synchronize or update the local `webcams.json` file with the most recent remote data, run:

```bash
npm run fetch-webcams
```

## 🧪 Testing

The project is highly tested to ensure code reliability across the board.

- **Run all tests** (Unit + E2E simultaneously):
  ```bash
  npm run test:all
  ```

- **Run Unit Tests (Jest)**:
  ```bash
  npm run test
  # To run tests in watch mode:
  npm run test:watch
  ```

- **Run End-to-End Tests (Playwright)**:
  ```bash
  npm run test:e2e
  # To run E2E tests with the Playwright UI:
  npm run test:e2e:ui
  ```

## 🏗️ Building for Production

This project is configured to use Expo Application Services (EAS) for building.

To build an Android APK:

- **Local Build** (Requires local Android SDK environment):
  ```bash
  npm run build:apk:local
  ```

- **Remote Build (EAS)**:
  ```bash
  npm run build:apk:remote
  ```

## 📂 Project Structure Overview

- `/app` - Contains the screens and file-based routing logic (Expo Router).
- `/components` - Reusable UI components used throughout the application.
- `/e2e` - Playwright configuration and End-to-End test suites.
- `/scripts` - Utilities such as the `fetch-webcams.ts` script for managing data.
- `/tests` - Jest configuration and unit tests.
- `/assets` - Static resources like images, icons, and fonts.
