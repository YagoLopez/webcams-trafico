import { WebcamData } from '../types/webcam';
import WEBCAMS_JSON from './webcams.json';

// Ensure the imported JSON matches the interface, or cast it if necessary.
// We are disabling the TS check for the import because json import might need configuration
// but usually in Expo/React Native projects importing JSON works out of the box with resolveJsonModule.
export const MOCK_DATA: WebcamData[] = WEBCAMS_JSON as WebcamData[];
