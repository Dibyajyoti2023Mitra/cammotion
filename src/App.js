// import logo from './logo.svg';
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
import { PublicRoute } from 'components/PublicRoute';
import { Toaster } from 'react-hot-toast';
import CateGoryPage from 'scenes/CategoryPage/CategoryPage';
import PrivateRoute from 'components/PrivateRoute';
import Category from 'components/Category/Category';
import SubCategory from 'components/SubCategory/SubCategory';
// import CategoryTable from 'components/Category/CategoryTable';
import SubCategoryPage from 'scenes/SubCategoryPage/SubCategoryPage';
import SubSubCategoryPage from 'scenes/SubSubCategoryPage/SubSubCategoryPage';
import SubSubCategory from 'components/SubSubCategory.js/SubSubCategory';
import Products from 'components/Products/Products';
import ProductsPage from 'scenes/ProductsPage/ProductsPage';
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
             
             <Route path="/" element={<Navigate to="/login" />}/>
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route element={<PrivateRoute/>}>
                  <Route element={<Layout />}>
                     <Route path="/dashboard" element={<Dashboard />} />  
                     {/* <Route path="/Products" element={<Dashboard />} /> */}
                     <Route path="/category" element={<CateGoryPage/>}/>
                     <Route path="/category/:id" element={<Category />}/>
                     <Route path="/subcategory" element={<SubCategoryPage/>}/>
                     <Route path="/subcategory/:id" element={<SubCategory/>}/>
                     <Route path="/sub-subcategory" element={<SubSubCategoryPage/>}/>
                     <Route path="/sub-subcategory/:id" element={<SubSubCategory/>}/>
                     {/* <Route path="/products" element={<Products/>}/> */}
                     <Route path="/products" element={<ProductsPage/>} />
                     {/* <Route path="/products/:id" element={<Products/>}/> */}
                     {/* <Route path="/CategoryDetails" element={<CategoryTable/>}></Route> */}
                  </Route>
              </Route>
          
              <Route element={<PublicRoute/>}>
                 <Route path='/login' element={<LoginPage />} />
              </Route>
          
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
