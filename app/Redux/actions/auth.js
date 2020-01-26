export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
function logOut() {
  return {
    type: LOGOUT
  };
}
function logIn(token, user) {
  return {
    type: LOGIN,
    user,
    token
  };
}

export const logoutAction = () => dispatch => dispatch(logOut());
export const logInAction = result => async dispatch =>
  dispatch(logIn(result.accessToken, { ...result, accessToken: undefined }));
