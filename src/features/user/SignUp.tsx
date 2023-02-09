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
import { loginUser, selectUser } from "./slice"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  var user = useSelector(selectUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [emptyField, setEmptyField] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    // redirect authenticated user to profile screen
    if (user.email_verified) navigate('/home')
    else if (user.username) navigate("/verify")
  }, [navigate, user])

  async function signUp() {
    if (verifyFields()) {
      const username = email
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            nickname,          // optional
            // other custom attributes 
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
            enabled: true,
          }
        });
        const newUser = {
          email: email,
          username: email,
          email_verified: false,
          jwt: null,
        }
        dispatch(loginUser(newUser))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const verifyFields = () => {
    setEmptyField(false)
    // Verify if required fields are valid
    if (email && password && (password === verifyPassword) && nickname) {
      return true
    }
    else {
      setEmptyField(true)
    }
    return false
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="Empresa"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  autoComplete="family-name"
                  error={emptyField && !nickname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  error={emptyField && !email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  error={emptyField && (!password || (password !== verifyPassword))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="verifyPassword"
                  label="Verifica Contrasena"
                  name="verifyPassword"
                  error={emptyField && (!verifyPassword || (password !== verifyPassword))}
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={signUp}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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