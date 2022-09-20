import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from 'react-query'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
            <App/>
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
