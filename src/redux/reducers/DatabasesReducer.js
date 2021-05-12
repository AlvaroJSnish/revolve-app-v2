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

    default: {
      return { ...state };
    }
  }
}
