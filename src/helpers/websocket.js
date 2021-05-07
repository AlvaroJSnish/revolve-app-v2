import { store } from "../redux/store";
import { connectWebsocket } from "../redux/actions/WebsocketActions";
import {
  fetchProjects,
  updateProjectFromWS,
} from "../redux/actions/ProjectActions";

export function onConnectWebsocket() {
  const access_token = localStorage.getItem("access_token");
  const socket = new WebSocket(
    `ws://localhost:8000/ws/${JSON.parse(access_token)}/projects/`
  );

  socket.addEventListener("open", function (event) {
    store.dispatch(connectWebsocket(socket));
  });

  socket.addEventListener("message", function (event) {
    handleMessages(event);
  });
}

function handleMessages(event) {
  const { type, message } = JSON.parse(event.data);

  switch (type) {
    // case socketEvents.get_user_projects: {
    //   store.dispatch(fetchProjects(data));
    //   break;
    // }
    case socketEvents.updated_project: {
      return store.dispatch(updateProjectFromWS(JSON.parse(message)));
    }

    default: {
      break;
    }
  }
}

const socketEvents = {
  get_user_projects: "get_user_projects",
  updated_project: "updated_project",
};
