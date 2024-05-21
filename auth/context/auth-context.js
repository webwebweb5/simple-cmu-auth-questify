// src/auth/context/auth-context.js
'use client';

import { createContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        loading: false,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const STORAGE_KEY = 'accessToken';

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const response = await axios.get('/api/auth/me');
        const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: { user },
        });
      } else {
        dispatch({ type: 'INITIAL', payload: { user: null } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'INITIAL', payload: { user: null } });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (code) => {
    const response = await axios.post('/api/auth/token', { code });
    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    dispatch({ type: 'LOGIN', payload: { user } });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;

    dispatch({ type: 'LOGOUT' });
  }, []);

  const status = state.loading ? 'loading' : state.user ? 'authenticated' : 'unauthenticated';

  const value = useMemo(
    () => ({
      user: state.user,
      login,
      logout,
      status,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
