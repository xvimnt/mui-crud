import { Box, CssBaseline, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from '.././components/LeftBar';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/slice';

export default function AdminLayout(props: any) {

  const user = useAppSelector(selectUser);
  const navigate = useNavigate()
  
  useEffect(() => {
    // redirect authenticated user to profile screen
    if (!user.email_verified) navigate('/')
  }, [navigate, user])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <LeftBar></LeftBar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
                <Grid container>
                    {props.children}
                </Grid>
            </Box>
        </Box>
    );
}
