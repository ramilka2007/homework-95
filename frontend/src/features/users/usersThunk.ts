import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError,
} from '../../types';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
    keys.forEach((key) => {
      const value = registerMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    const { data: user } = await axiosApi.post<User>('/users', formData);
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<User>(
      '/users/sessions',
      loginMutation,
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logout = createAsyncThunk(
  'users/logout',
  async (_arg, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  },
);

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<User>('/users/google', {
      credential,
    });
    return user;
  } catch (e) {
    if (
      isAxiosError<GlobalError>(e) &&
      e.response &&
      e.response.status === 400
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
