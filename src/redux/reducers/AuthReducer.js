import { authTypes } from "../types/AuthTypes";

const initialState = {
  user: null,
  access_token: null,
  loadingSignIn: false,
  signInError: null,
  loadingSignUp: false,
  signUpError: null,
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
        signInError: null,
      };
    }

    case authTypes.LOGIN_FAILURE: {
      return { ...state, signInError: payload.error, loadingSignIn: false };
    }

    case authTypes.SIGNUP_REQUEST: {
      return { ...state, loadingSignUp: true };
    }

    case authTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        access_token: payload.access_token,
        loadingSignUp: false,
        signUpError: null,
      };
    }

    case authTypes.SIGNUP_FAILURE: {
      return { ...state, signUpError: payload.error, loadingSignUp: false };
    }

    default: {
      return { ...state };
    }
  }
}
