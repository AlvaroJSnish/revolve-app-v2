import { authTypes } from "../types/AuthTypes";
import { post } from "../../helpers/api";
import { saveToStorage } from "../../helpers/storage";

export const loginRequest = (email, password, history) => (dispatch) => {
  dispatch({
    type: authTypes.LOGIN_REQUEST,
  });

  dispatch(login(email, password, history));
};

const login = (email, password, history) => async (dispatch) => {
  try {
    const res = await (await post("auth/signin", { email, password })).data;

    saveToStorage("access_token", res.access_token);
    saveToStorage("user", res.user);

    dispatch({
      type: authTypes.LOGIN_SUCCESS,
      payload: { user: res.user, token: res.access_token },
    });

    return history.push("/app");
  } catch (e) {
    return dispatch({
      type: authTypes.LOGIN_FAILURE,
      payload: { error: e },
    });
  }
};

export const signupRequest = (email, password, history) => (dispatch) => {
  dispatch({
    type: authTypes.SIGNUP_REQUEST,
  });

  dispatch(signup(email, password, history));
};

const signup = (email, password, history) => async (dispatch) => {
  try {
    const res = await (await post("auth/signup", { email, password })).data;

    saveToStorage("access_token", res.access_token);
    saveToStorage("user", res.user);

    dispatch({
      type: authTypes.SIGNUP_SUCCESS,
      payload: { user: res.user, token: res.access_token },
    });

    return history.push("/app");
  } catch (e) {
    return dispatch({
      type: authTypes.SIGNUP_FAILURE,
      payload: { error: e.response.data },
    });
  }
};
