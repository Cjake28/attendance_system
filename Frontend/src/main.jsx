import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx'; 
import {SnackbarProvider} from './context/SnackbarContext.jsx'

import CssBaseline from "@mui/material/CssBaseline";
import theme from './theme/theme.js'

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
