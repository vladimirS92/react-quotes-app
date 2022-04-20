import React, { useState, useContext } from 'react';
import { Box, TextField, FormControl, Button, Card, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';

import useInput from '../hooks/use-input';
import AuthContext from '../store/auth.context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const {
    value: emailValue,
    isValueValid: emailValueIsValid,
    isError: emailValueIsInvalid,
    valueChangeHandler: onChangeEmailValue,
    valueBlurHandler: onBlurEmailValue,
    reset: resetEmailValue,
  } = useInput((valueData) => valueData.trim() !== '' && valueData.includes('@'));

  const {
    value: passwordValue,
    isValueValid: passwordValueIsValid,
    isError: passwordValueIsInvalid,
    valueChangeHandler: onChangePasswordValue,
    valueBlurHandler: onBlurPasswordValue,
    reset: resetPassworValue,
  } = useInput((valueData) => valueData.trim() !== '' && valueData.trim().length >= 6);

  let formIsValid = false;

  if (emailValueIsValid && passwordValueIsValid) {
    formIsValid = true;
  }

  const onSubmitLoginHandler = (event) => {
    event.preventDefault();

    if (!emailValueIsValid && !passwordValueIsValid) {
      return;
    }

    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjoqkngVf0ILAHhjaqlibf7nAstVaSfmk';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjoqkngVf0ILAHhjaqlibf7nAstVaSfmk';
    }

    setIsLoading(true);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        authCtx.login(data.idToken, data.email, expirationTime.toISOString());
        history.replace('/quotes');

        resetEmailValue();
        resetPassworValue();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Box component='form' autoComplete='off' onSubmit={onSubmitLoginHandler}>
        <Typography variant='subtitle1' gutterBottom color='text.primary'>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='quote'
            label='Email'
            type='email'
            variant='outlined'
            value={emailValue}
            onChange={onChangeEmailValue}
            onBlur={onBlurEmailValue}
            error={emailValueIsInvalid}
          />
          {emailValueIsInvalid && <FormHelperText id='quote-helper-text'>Please enter a valid email.</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='author'
            label='Password'
            type='password'
            variant='outlined'
            value={passwordValue}
            onChange={onChangePasswordValue}
            onBlur={onBlurPasswordValue}
            error={passwordValueIsInvalid}
          />
          {passwordValueIsInvalid && <FormHelperText id='quote-helper-text'>Password should be at least 6 characters.</FormHelperText>}
        </FormControl>
        <Box maxWidth='lg' sx={{ mt: 2, flex: 1 }}>
          <LoadingButton disabled={!formIsValid} loading={isLoading} fullWidth type='submit' variant='contained'>
            {isLogin ? 'Login' : 'Register'}
          </LoadingButton>
        </Box>
      </Box>
      <Box maxWidth='lg' sx={{ mt: 2, flex: 1 }}>
        <Button fullWidth type='button' variant='text' onClick={switchLoginModeHandler}>
          {isLogin ? 'Create account' : 'Return to Login'}
        </Button>
      </Box>
    </Card>
  );
};

export default AuthForm;
