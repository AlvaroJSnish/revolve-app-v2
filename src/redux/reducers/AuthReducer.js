import { authTypes } from "../types/AuthTypes";

export const authState = {
  user: null,
  access_token: null,
  loadingSignIn: false,
  signInError: null,
  loadingSignUp: false,
  signUpError: null,
  logoutError: null,

  showUpgradeModal: false,
};

export default function AuthReducer(state = authState, { type, payload }) {
  switch (type) {
    case authTypes.LOGIN_REQUEST: {
      return { ...state, loadingSignIn: true, signInError: null };
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

    case authTypes.LOGOUT_SUCCESS: {
      return { ...state, user: {}, access_token: null };
    }

    case authTypes.LOGOUT_FAILURE: {
      return { ...state, logoutError: payload.error };
    }

    case authTypes.SHOW_UPGRADE_MODAL: {
      return { ...state, loadingSignIn: false, showUpgradeModal: true };
    }

    case authTypes.DISMISS_UPGRADE_MODAL: {
      return { ...state, loadingSignIn: false, showUpgradeModal: false };
    }

    default: {
      return { ...state };
    }
  }
}
