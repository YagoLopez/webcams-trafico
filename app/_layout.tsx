import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';

if (Platform.OS === 'web') {
  // Ignore specific noisy warnings from react-native-web
  LogBox.ignoreLogs([
    'nativeID',
    '[react-native-web]',
    'Accessibility',
    'createDOMProps',
    'pointerEvents'
  ]);

  // SSR / Node env filtering to keep terminal clean
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    const noisyPatterns = [
      'nativeID',
      '[react-native-web]',
      'Accessibility',
      'createDOMProps',
      'pointerEvents'
    ];

    if (noisyPatterns.some(pattern => message.includes(pattern))) {
      return;
    }
    originalWarn(...args);
  };
}

export const unstable_settings = {
  anchor: '(drawer)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
