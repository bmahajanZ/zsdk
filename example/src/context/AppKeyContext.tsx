import { createContext, useState, type ReactNode } from 'react';

// Define the shape of the context
interface AppKeyContextType {
  appKey: string;
  setAppKey: (text: string) => void;
}

// Create a Context with a default value
export const AppKeyContext = createContext<AppKeyContextType | undefined>(
  undefined
);

// Provider Component
export const AppKeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appKey, setAppKey] = useState<string>('');

  return (
    <AppKeyContext.Provider value={{ appKey, setAppKey }}>
      {children}
    </AppKeyContext.Provider>
  );
};

// export default { AppKeyProvider, AppKeyContext };
