import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { selectUser, confirmUser } from './slice';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MilkyWare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (user.email_verified) navigate('/dashboard')
  }, [navigate, user])

  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verificacion de Email
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Codigo de Verificacion"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <ButtonGroup sx={{ mt: 3, mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color='success'
                onClick={forgotPassword}
              >
                Confirmar
              </Button>
            </ButtonGroup>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Ya tienes cuenta? Entra aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}