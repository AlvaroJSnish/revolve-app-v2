import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import socketReducer from "./WebsocketReducer";
import projectsReducer from "./ProjectReducer";

export default combineReducers({
  auth: authReducer,
  socket: socketReducer,
  projects: projectsReducer,
});
