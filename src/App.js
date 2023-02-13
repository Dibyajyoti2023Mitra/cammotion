import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from 'scenes/dashboard';
import Layout from 'scenes/layout';
import LoginPage from 'scenes/loginpage/LoginPage';
import { PublicRoute } from 'components/login/PublicRoute';
import { Toaster } from 'react-hot-toast';
import CateGoryPage from 'scenes/CategoryPage/CategoryPage';

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
         <Toaster />
         <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Products" element={<Dashboard />} />
            <Route path="/category" element={<CateGoryPage/>}>
          </Route>  
          </Route>
          <Route element={<PublicRoute/>}>
              <Route path="/login" element={<LoginPage/>}/>
          </Route>
          
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
