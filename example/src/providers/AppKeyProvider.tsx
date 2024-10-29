import { useState, type ReactNode } from 'react';
import { AppKeyContext } from '../contexts/AppKeyContext';

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
