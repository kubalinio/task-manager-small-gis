import { createContext } from 'react';
import { IndexDBClient } from 'api/indexdb';

export interface IndexDBContextType {
  client: IndexDBClient | null;
  isLoading: boolean;
  error: Error | null;
}

const initialContextValue: IndexDBContextType = {
  client: null,
  isLoading: true,
  error: null,
};

export const IndexDBContext = createContext<IndexDBContextType>(initialContextValue);
