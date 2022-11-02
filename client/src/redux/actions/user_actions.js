import { SET_USER, CLEAR_USER, SET_PHOTOURL } from './types.js';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export function setPhotoURL(url) {
  return {
    type: SET_PHOTOURL,
    payload: url,
  };
}
