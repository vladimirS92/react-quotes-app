import React from 'react';
import { Box, TextField, FormControl, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import useInput from '../hooks/use-input';

const AuthForm = (props) => {
  const {
    value: nameValue,
    isValueValid: nameValueIsValid,
    isError: nameValueIsInvalid,
    valueChangeHandler: onChangeNameValue,
    valueBlurHandler: onBlurNameValue,
    reset: resetNameValue,
  } = useInput((valueData) => valueData.trim() !== '');

  const {
    value: passwordValue,
    isValueValid: passwordValueIsValid,
    isError: passwordValueIsInvalid,
    valueChangeHandler: onChangePasswordValue,
    valueBlurHandler: onBlurPasswordValue,
    reset: resetPassworValue,
  } = useInput((valueData) => valueData.trim() !== '');

  const onSubmitLoginHandler = (event) => {
    event.preventDefault();

    if (!nameValueIsValid && !passwordValueIsValid) {
      return;
    }
    //TBD
    props.onLogin({ useName: nameValue, password: passwordValue });

    resetNameValue();
    resetPassworValue();
  };
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Box component='form' autoComplete='off' onSubmit={onSubmitLoginHandler}>
        <Typography variant='subtitle1' gutterBottom color='text.primary'>
          Login
        </Typography>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='quote'
            label='Name'
            variant='outlined'
            multiline
            maxRows={4}
            value={nameValue}
            onChange={onChangeNameValue}
            onBlur={onBlurNameValue}
            error={nameValueIsInvalid}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='author'
            label='Password'
            variant='outlined'
            value={passwordValue}
            onChange={onChangePasswordValue}
            onBlur={onBlurPasswordValue}
            error={passwordValueIsInvalid}
          />
        </FormControl>
        <Box maxWidth='lg' sx={{ mt: 2, flex: 1 }}>
          <Button fullWidth type='submit' variant='contained'>
            Login
          </Button>
        </Box>
        <Box maxWidth='lg' sx={{ mt: 2, flex: 1 }}>
          <Button fullWidth type='button' variant='outlined' component={Link} to='/'>
            Register
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AuthForm;
