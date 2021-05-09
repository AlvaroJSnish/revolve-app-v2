import { get } from "../../helpers/api";
import { userStatsTypes } from "../types/UserStatsTypes";

export const getUserStatsRequest = (id) => (dispatch) => {
  dispatch({
    type: userStatsTypes.GET_USER_STATS_REQUEST,
  });
  dispatch(getUserStats(id));
};

export const getUserStats = (id) => async (dispatch) => {
  const stats = await (await get(`userstats/${id}`)).data;
  try {
    dispatch({
      type: userStatsTypes.GET_USER_STATS_SUCCESS,
      payload: { stats },
    });
  } catch (e) {
    dispatch({
      type: userStatsTypes.GET_USER_STATS_FAILURE,
      payload: { error: e },
    });
  }
};
