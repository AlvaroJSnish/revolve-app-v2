import { databasesTypes } from "../types/DatabasesTypes";
import { get, post } from "../../helpers/api";

export const fetchDatabasesRequest = () => (dispatch) => {
  dispatch({
    type: databasesTypes.FETCH_DATABASES_REQUEST,
  });
  dispatch(fetchDatabases());
};

export const fetchDatabases = () => async (dispatch) => {
  try {
    const databases = await (await get("databases")).data;
    dispatch({
      type: databasesTypes.FETCH_DATABASES_SUCCESS,
      payload: { databases: databases.results },
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

const fetchDatabase = (id) => async (dispatch) => {
  try {
    const database = await (await get(`databases/${id}`)).data;
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

export const checkDBConnectionRequest = (values) => (dispatch) => {
  dispatch({
    type: databasesTypes.CHECK_DATABASE_CONNECTION_REQUEST,
  });
  dispatch(checkDBConnection(values));
};

const checkDBConnection = (values) => async (dispatch) => {
  try {
    const data = await (await post(`databases/check-connection`, values)).data;
    dispatch({
      type: databasesTypes.CHECK_DATABASE_CONNECTION_SUCCESS,
      payload: { ...data },
    });
  } catch (e) {
    dispatch({
      type: databasesTypes.CHECK_DATABASE_CONNECTION_FAILURE,
      payload: { ...e.response.data },
    });
  }
};

export const dismissConnection = (history) => (dispatch) => {
  dispatch({
    type: databasesTypes.DISMISS_CONNECTION,
  });
  history.goBack();
};

export const createDatabaseConnectionRequest = (values, history) => (
  dispatch
) => {
  dispatch({
    type: databasesTypes.CREATE_DATABASE_REQUEST,
  });
  dispatch(createDatabaseConnection(values, history));
};

const createDatabaseConnection = (values, history) => async (dispatch) => {
  try {
    const database = await (await post("databases", values)).data;

    dispatch({
      type: databasesTypes.CREATE_DATABASE_SUCCESS,
      payload: { database },
    });

    history.push("/app/databases");
  } catch (e) {
    dispatch({
      type: databasesTypes.CREATE_DATABASE_FAILURE,
      payload: { error: e },
    });
  }
};
