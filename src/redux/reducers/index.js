import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import socketReducer from "./WebsocketReducer";
import projectsReducer from "./ProjectReducer";
import userStatsReducer from "./UserStatsReducer";
import databasesReducer from "./DatabasesReducer";

export default combineReducers({
  auth: authReducer,
  socket: socketReducer,
  projects: projectsReducer,
  userStats: userStatsReducer,
  databases: databasesReducer,
});
