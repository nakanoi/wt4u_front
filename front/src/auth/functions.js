import Cookies from 'js-cookie';
import client from '../lib/client';

export const signUp = (data) => {
  return client.post('auth/sign_in', data);
};

export const signIn = (data) => {
  return client.post('auth/sign_in', data);
};

export const signOut = () => {
  return client.delete(
    'auth/sign_out',
    {
      headers: {
        'access-token': Cookies.get('access-token'),
        'client': Cookies.get('client'),
        'uid': Cookies.get('uid'),
      }
    }
  );
};

export const getUser = () => {
  if (!Cookies.get('access_token') ||
      !Cookies.get('client') ||
      !Cookies.get('uid')
  ) return;
  return client.get(
    'auth/sign_in',
    {
      headers: {
        'access-token': Cookies.get('access-token'),
        'client': Cookies.get('client'),
        'uid': Cookies.get('uid'),
      }
    }
  );
};

