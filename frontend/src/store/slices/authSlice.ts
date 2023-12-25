import { createSlice } from '@reduxjs/toolkit';
import { authorizationTypes } from '../../types';

const authSlice = createSlice({
  name: 'userAuth',
  initialState: {
    isAuthenticated: authorizationTypes.UNDEFINED,
    userCredentials: { email: '', password: '' }
  },
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        userCredentials: action.payload.userCredentials
      };
    }
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
