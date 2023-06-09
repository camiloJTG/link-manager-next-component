import { useState, useEffect } from 'react';
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Styles from '@/styles/auth.module.css';
import { AuthFormProps } from '@/interfaces';

const loginForm = (onLogin: AuthFormProps) => {
   const { formRef, formSubmit, error, setError } = onLogin;
   const [open, setOpen] = useState(false);

   useEffect(() => {
      if (error.length > 0 && !open) setOpen(true);
   }, [error, open]);

   const handleClose = () => {
      setOpen(false);
      setError('');
   };

   return (
      <Box className={Styles.layout}>
         <Paper className={Styles.displayPaper} elevation={24}>
            {error && (
               <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                  onClose={handleClose}
               >
                  <Alert severity='warning' variant='standard' elevation={6}>
                     {error}
                  </Alert>
               </Snackbar>
            )}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
               Iniciar sesión
            </Typography>
            <form ref={formRef} onSubmit={formSubmit}>
               <TextField
                  margin='normal'
                  type='email'
                  required
                  fullWidth
                  id='email'
                  label='Correo electrónico'
                  name='email'
                  autoComplete='off'
                  autoFocus
               />
               <TextField
                  margin='normal'
                  type='password'
                  required
                  fullWidth
                  name='password'
                  label='Contraseña'
                  id='password'
                  autoComplete='off'
               />
               <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Inciar sesión
               </Button>
               <Grid item sx={{ textAlign: 'center' }}>
                  <Link href='register' className={Styles.redirect}>
                     {'¿No tienes cuenta? Registrate.'}
                  </Link>
               </Grid>
            </form>
         </Paper>
      </Box>
   );
};

export default loginForm;
