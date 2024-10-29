import { createContext } from 'react';

export enum RequestType {
  WEB = 'WEB',
  GET = 'GET',
  POST = 'POST',
}

// Define the shape of the context
interface RequestContextType {
  url: string;
  setUrl: (text: string) => void;
  requestType: RequestType;
  setRequestType: (requestType: RequestType) => void;
  data: string;
  setData: (data: string) => void;
}

// Create a Context with a default value
export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
);
