import { Box, CssBaseline, Grid } from '@mui/material';
import LeftBar from './components/LeftBar';
import Products from './features/products';

import AWS from 'aws-sdk'
import env from "react-dotenv";

AWS.config.update({
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY
})

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <LeftBar></LeftBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
          <Grid container>
            <Products></Products>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default App;