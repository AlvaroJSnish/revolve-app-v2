import { databasesTypes } from "../types/DatabasesTypes";

const initialState = {
  loadingDatabases: false,
  databases: [],
  databasesError: null,
  loadingDatabase: false,
  database: null,
  databaseError: null,
  loadingCreateDatabase: false,
  createDatabaseError: null,

  // checking connections
  connectingToDatabase: false,
  databaseConnectionStatus: null,
  databaseConnectionMessage: null,
};

export default function databasesReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case databasesTypes.FETCH_DATABASES_REQUEST:
      return { ...state, loadingDatabases: true };

    case databasesTypes.FETCH_DATABASES_SUCCESS:
      return {
        ...state,
        loadingDatabases: false,
        databases: [...payload.databases],
        databasesError: null,
      };

    case databasesTypes.FETCH_DATABASES_FAILURE:
      return {
        ...state,
        loadingDatabases: false,
        databasesError: payload.error,
      };

    case databasesTypes.CREATE_DATABASE_REQUEST: {
      return { ...state, loadingCreateDatabase: true };
    }

    case databasesTypes.CREATE_DATABASE_SUCCESS: {
      return {
        ...state,
        loadingCreateDatabase: false,
        database: payload.database,
      };
    }

    case databasesTypes.CREATE_DATABASE_FAILURE: {
      return {
        ...state,
        loadingCreateDatabase: false,
        createDatabaseError: payload.error,
      };
    }

    case databasesTypes.FETCH_DATABASE_REQUEST: {
      return {
        ...state,
        loadingDatabase: true,
        database: null,
        databaseError: null,
      };
    }

    case databasesTypes.FETCH_DATABASE_SUCCESS: {
      return { ...state, loadingDatabase: false, database: payload.database };
    }

    case databasesTypes.FETCH_DATABASE_FAILURE: {
      return { ...state, loadingDatabase: false, error: payload.error };
    }

    case databasesTypes.CHECK_DATABASE_CONNECTION_REQUEST: {
      return {
        ...state,
        connectingToDatabase: true,
        databaseConnectionStatus: null,
        databaseConnectionMessage: null,
      };
    }

    case databasesTypes.CHECK_DATABASE_CONNECTION_SUCCESS: {
      return {
        ...state,
        connectingToDatabase: false,
        databaseConnectionStatus: payload.status,
        databaseConnectionMessage: payload.message,
      };
    }

    case databasesTypes.CHECK_DATABASE_CONNECTION_FAILURE: {
      return {
        ...state,
        connectingToDatabase: false,
        databaseConnectionStatus: payload.status,
        databaseConnectionMessage: payload.message,
      };
    }

    case databasesTypes.DISMISS_CONNECTION: {
      return {
        ...state,
        connectingToDatabase: false,
        databaseConnectionStatus: null,
        databaseConnectionMessage: null,
      };
    }

    default: {
      return { ...state };
    }
  }
}
