import { useState, type ReactNode } from 'react';
import { RequestType, RequestContext } from '../contexts/RequestContext';

// Provider Component
export const RequestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState<string>('');
  const [requestType, setRequestType] = useState<RequestType>(RequestType.GET);
  const [data, setData] = useState<string>('');

  return (
    <RequestContext.Provider
      value={{ url, setUrl, requestType, setRequestType, data, setData }}
    >
      {children}
    </RequestContext.Provider>
  );
};
