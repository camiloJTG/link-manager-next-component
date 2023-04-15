import { useEffect, useState } from 'react';
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Styles from '@/styles/auth.module.css';
import { RegisterFormProps } from '@/interfaces';

const RegisterForm = (onRegister: RegisterFormProps) => {
   const { error, formRef, formSubmit, setError } = onRegister;
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
               Registrarse
            </Typography>

            <form ref={formRef} onSubmit={formSubmit}>
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='username'
                  id='username'
                  name='username'
                  autoComplete='off'
                  autoFocus
               />
               <TextField
                  margin='normal'
                  type='email'
                  required
                  fullWidth
                  id='email'
                  label='email'
                  name='email'
                  autoComplete='off'
               />
               <TextField
                  margin='normal'
                  type='password'
                  required
                  fullWidth
                  id='password'
                  label='password'
                  name='password'
                  autoComplete='off'
               />
               <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Registrarse
               </Button>
               <Grid item sx={{ textAlign: 'center' }}>
                  <Link href='/' className={Styles.redirect}>
                     {'Iniciar sesión'}
                  </Link>
               </Grid>
            </form>
         </Paper>
      </Box>
   );
};

export default RegisterForm;
