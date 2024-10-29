import { createContext } from 'react';

// Define the shape of the context
interface AppKeyContextType {
  appKey: string;
  setAppKey: (text: string) => void;
}

// Create a Context with a default value
export const AppKeyContext = createContext<AppKeyContextType | undefined>(
  undefined
);
