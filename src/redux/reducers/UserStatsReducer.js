import { userStatsTypes } from "../types/UserStatsTypes";

const initialState = {
  loadingUserStats: false,
  userStats: {},
  userStatsError: null,
};

export default function userStatsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case userStatsTypes.GET_USER_STATS_REQUEST: {
      return { ...state, loadingUserStats: true };
    }

    case userStatsTypes.GET_USER_STATS_SUCCESS: {
      return {
        ...state,
        loadingUserStats: false,
        userStatsError: null,
        userStats: { ...payload.stats },
      };
    }

    case userStatsTypes.GET_USER_STATS_FAILURE: {
      return {
        ...state,
        loadingUserStats: false,
        userStatsError: payload.error,
      };
    }

    default:
      return { ...state };
  }
}
