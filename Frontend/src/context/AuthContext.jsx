import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// Create the Auth Context
const AuthContext = createContext();

// Auth Reducer to manage state transitions
const authReducer = (state, action) => {
  switch (action.type){
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CHECK_AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isCheckingAuth: false,
      };
    case 'CHECK_AUTH_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isCheckingAuth: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Initial state for authentication
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
};

// AuthProvider component to provide the Auth Context
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = async (username, password) => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, { username: username, password: password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    } catch(error){
      // console.log("login error: ", error.response?.data?.message );
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Error logging in'
      });
      console.log(error);
      throw error;
    }
  };

  // Check authentication function
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/check-auth`);
      // console.log("checkAuth: ",response);

      if(!response.data.success){
        dispatch({ type: 'CHECK_AUTH_FAILURE' });
        // console.log("checkAuth user false");
        return
      }
      // console.log("cehckAUth response: ",response)
      dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: response.data.user });

    } catch (error) {
      console.log(error);
      dispatch({ type: 'CHECK_AUTH_FAILURE' });
      throw error;
    }
  };

  const signout = async () => {
    try{
      const response = await axios.post(`${API_URL}/api/auth/signout`, { withCredentials: true });
       dispatch({ type: 'CHECK_AUTH_FAILURE' });
      console.log(response);
    }catch(error){
      console.log(error)}
  }

  return (
    <AuthContext.Provider value={{ ...state, login, checkAuth, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};