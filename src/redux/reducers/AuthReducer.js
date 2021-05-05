import { authTypes } from "../types/AuthTypes";

const initialState = {
  user: null,
  access_token: null,
  loadingSignIn: false,
  authError: null,
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case authTypes.LOGIN_REQUEST: {
      return { ...state, loadingSignIn: true };
    }

    case authTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        access_token: payload.access_token,
        loadingSignIn: false,
      };
    }

    case authTypes.LOGIN_FAILURE: {
      return { ...state, authError: payload.error, loadingSignIn: false };
    }

    default: {
      return { ...state };
    }
  }
}
