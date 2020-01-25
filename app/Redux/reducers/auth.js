import { LOGIN, LOGOUT } from '../actions/auth';

const initState = {
  token: null,
  user: {}
};

export default function auth(state = initState, action) {
  switch (action) {
    case LOGIN:
      return {
        token: action.token,
        user: action.user
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
}
