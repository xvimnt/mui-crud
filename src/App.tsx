import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Grid } from '@mui/material';
import LeftBar from './components/LeftBar';

import AWS from 'aws-sdk'
import env from "react-dotenv";

// Features
import Categories from "./features/categories";
import Products from './features/products';
import Dashboard from "./features/dashboard";

AWS.config.update({
  accessKeyId: env.ACCESS_KEY_ID,
  secretAccessKey: env.SECRET_ACCESS_KEY
})

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <LeftBar></LeftBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
          <Grid container>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </Grid>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;