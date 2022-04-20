import React, { useEffect, useState, useCallback } from 'react';

let logoutTimer;

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingDuration = calcRemainingTime(storedExpirationTime);

  if (remainingDuration <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingDuration,
  };
};

const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calcRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  //   const initToken = localStorage.getItem('token'); //undefined || token
  const initToken = tokenData ? tokenData.token : localStorage.getItem('token');
  const initEmail = localStorage.getItem('email');
  const [token, setToken] = useState(initToken);
  const [email, setEmail] = useState(initEmail);

  const userIsLoggedIn = !!token;

  const loginHanler = (token, email, expirationTime) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calcRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHanler, remainingTime);
  };

  const logoutHanler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData);
      logoutTimer = setTimeout(logoutHanler, tokenData.duration);
    }
  }, [tokenData, logoutHanler]);

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHanler,
    logout: logoutHanler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
