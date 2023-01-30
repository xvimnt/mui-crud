import { Box, CssBaseline, Grid } from '@mui/material';
import LeftBar from './components/LeftBar';
import Products from './features/products';

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