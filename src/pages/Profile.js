import React from 'react';
import { Box, TextField, FormControl, Button, Card, Typography, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

import useInput from '../hooks/use-input';

const Profile = () => {
  const history = useHistory();
  const {
    value: passwordResetValue,
    isValueValid: passwordResetValueIsValid,
    isError: passwordResetValueIsInvalid,
    valueChangeHandler: onChangePasswordResetValue,
    valueBlurHandler: onBlurPasswordResetValue,
    reset: resetPasswordResetValue,
  } = useInput((valueData) => valueData.trim() !== '');

  const onSubmitResetHandler = () => {
    if (!passwordResetValueIsValid) {
      return;
    }

    resetPasswordResetValue();
  };

  let formIsValid = false;

  if (passwordResetValueIsValid) {
    formIsValid = true;
  }

  const goBackHandler = () => {
    history.push('/');
  };

  const logout = () => {};

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography variant='subtitle1' gutterBottom color='text.primary'>
        Profile
      </Typography>
      <Typography variant='h5' gutterBottom color='text.primary'>
        John Doe
      </Typography>
      <Button type='button' variant='outlined' color='error' onClick={logout}>
        Log out
      </Button>
      <Divider sx={{ my: 2 }} />
      <Box component='form' autoComplete='off' onSubmit={onSubmitResetHandler}>
        <Typography variant='subtitle1' gutterBottom color='text.primary'>
          Reset password
        </Typography>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='quote'
            label='New password'
            variant='outlined'
            multiline
            maxRows={4}
            value={passwordResetValue}
            onChange={onChangePasswordResetValue}
            onBlur={onBlurPasswordResetValue}
            error={passwordResetValueIsInvalid}
          />
        </FormControl>
        <Button type='button' variant='text' startIcon={<ArrowBackIcon />} onClick={goBackHandler}>
          Go back
        </Button>
        <Button sx={{ mx: 2 }} disabled={!formIsValid} type='submit' variant='outlined'>
          Reset password
        </Button>
      </Box>
    </Card>
  );
};

export default Profile;
