import React, { useContext } from 'react';
import { Box, Grid, Button, Card, Typography, Divider, IconButton } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

// import useInput from '../hooks/use-input';
import AuthContext from '../store/auth.context';

const Profile = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const passwordResetRef = useRef(null);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  // const {
  //   value: passwordResetValue,
  //   isValueValid: passwordResetValueIsValid,
  //   isError: passwordResetValueIsInvalid,
  //   valueChangeHandler: onChangePasswordResetValue,
  //   valueBlurHandler: onBlurPasswordResetValue,
  // } = useInput((valueData) => valueData.trim() !== '' && valueData.trim().length >= 6);

  // const onSubmitResetHandler = (event) => {
  //   event.preventefault();

  //   // if (!passwordResetValueIsValid) {
  //   //   return;
  //   // }

  //   setIsLoading(true);

  //   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDjoqkngVf0ILAHhjaqlibf7nAstVaSfmk', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       idToken: authCtx.token,
  //       password: passwordResetRef.current.value,
  //       returnSecureToken: false,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((response) => {
  //       setIsLoading(false);
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return response.json().then((data) => {
  //           throw new Error(data.error.message);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       history.replace('/quotes');
  //       console.log(passwordResetRef.current.value);
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  // let formIsValid = false;

  // if (passwordResetValueIsValid) {
  //   formIsValid = true;
  // }

  const goBackHandler = () => {
    history.replace('/quotes');
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Grid container justify='flex-end'>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='subtitle1' gutterBottom color='text.primary'>
            Profile
          </Typography>
        </Box>
        <IconButton variant='text' size='small' color='primary' onClick={goBackHandler}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Typography variant='h5' gutterBottom color='text.primary'>
        {authCtx.email}
      </Typography>
      {/* <Box component='form' autoComplete='off' onSubmit={onSubmitResetHandler}>
        <Typography variant='subtitle1' gutterBottom color='text.primary'>
          Reset password
        </Typography>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id='newpassword'
            label='New password'
            type='password'
            variant='outlined'
            value={passwordResetValue}
            ref={passwordResetRef}
            onChange={onChangePasswordResetValue}
            onBlur={onBlurPasswordResetValue}
            error={passwordResetValueIsInvalid}
          />
          {passwordResetValueIsInvalid && <FormHelperText id='newpassword-helper-text'>Password should be at least 6 characters.</FormHelperText>}
        </FormControl>
        <LoadingButton sx={{ mx: 2 }} disabled={!formIsValid} loading={isLoading} type='submit' variant='outlined'>
          Reset password
        </LoadingButton>
        </Box> */}
      <Divider sx={{ my: 2 }} />
      <Button type='button' variant='outlined' color='error' onClick={logoutHandler}>
        Log out
      </Button>
    </Card>
  );
};

export default Profile;
