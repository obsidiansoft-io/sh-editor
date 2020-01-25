export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
function logOut() {
  return {
    type: LOGOUT
  };
}

export const logoutAction = () => dispatch => dispatch(logOut());
