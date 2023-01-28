import { Box, Grid } from '@mui/material';
import LeftBar from './components/LeftBar';
import TopBar from './components/TopBar';
import Products from './features/products';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <LeftBar></LeftBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container>
            <Products></Products>
          </Grid>
        </Box>
      </Box>

    </div>
  );
}

export default App;