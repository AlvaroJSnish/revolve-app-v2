import { authTypes } from "../types/AuthTypes";
import { post } from "../../helpers/api";

export const loginRequest = (email, password) => (dispatch) => {
  dispatch({
    type: authTypes.LOGIN_REQUEST,
  });

  dispatch(login(email, password));
};

const login = (email, password) => async (dispatch) => {
  try {
    const res = await (await post("auth/signin", { email, password })).data;

    // saveToStorage("access_token", res.access_token);
    return dispatch({
      type: authTypes.LOGIN_SUCCESS,
      payload: { user: res.user, token: res.access_token },
    });
  } catch (e) {
    return dispatch({
      type: authTypes.LOGIN_FAILURE,
      payload: { error: e },
    });
  }
};
