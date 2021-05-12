import { databasesTypes } from "../types/DatabasesTypes";
import { get, post } from "../../helpers/api";

export const fetchDatabasesRequest = () => (dispatch) => {
  dispatch({
    type: databasesTypes.FETCH_DATABASES_REQUEST,
  });
  dispatch(fetchDatabases());
};

export const fetchDatabases = () => async (dispatch) => {
  const databases = await (await get("databases")).data;
  try {
    dispatch({
      type: databasesTypes.FETCH_DATABASES_SUCCESS,
      payload: { databases },
    });
  } catch (e) {
    dispatch({
      type: databasesTypes.FETCH_DATABASES_FAILURE,
      payload: { error: e },
    });
  }
};

export const fetchDatabaseRequest = (id) => (dispatch) => {
  dispatch({
    type: databasesTypes.FETCH_DATABASE_REQUEST,
  });
  dispatch(fetchDatabase(id));
};

export const fetchDatabase = (id) => async (dispatch) => {
  const database = await (await get(`databases/${id}`)).data;
  try {
    dispatch({
      type: databasesTypes.FETCH_DATABASE_SUCCESS,
      payload: { database },
    });
  } catch (e) {
    dispatch({
      type: databasesTypes.FETCH_DATABASE_FAILURE,
      payload: { error: e },
    });
  }
};
