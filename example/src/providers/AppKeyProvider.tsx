import { useState, type ReactNode } from 'react';
import { AppKeyContext } from '../contexts/AppKeyContext';

// Provider Component
export const AppKeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appKey, setAppKey] = useState<string>(
    'eyJhcHBfaWRlbnRpZmllcl9naWQiOjcyMDU3NzkxNjIzMjAwNzc1LCJvbmVfaWRlbnRpdHlfZnFkbiI6ImdyZWVuLWRldjIuemRrZGV2LnpzbG9naW5hbHBoYS5uZXQiLCJobWFjX3NlY3JldCI6IjRleVFvSng0QzFrNGJjbXZ4YkJkTkE5THhHMjc2aTFCSXd5NWZpOXBENVU9In0='
  );

  return (
    <AppKeyContext.Provider value={{ appKey, setAppKey }}>
      {children}
    </AppKeyContext.Provider>
  );
};
