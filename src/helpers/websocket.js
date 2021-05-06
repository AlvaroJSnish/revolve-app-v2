import { store } from "../redux/store";
import { connectWebsocket } from "../redux/actions/WebsocketActions";
import { fetchProjects } from "../redux/actions/ProjectActions";

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
  const { key, data } = JSON.parse(event.data);

  switch (key) {
    case socketEvents.get_user_projects: {
      store.dispatch(fetchProjects(data));
      break;
    }

    default: {
      break;
    }
  }
}

const socketEvents = {
  get_user_projects: "get_user_projects",
};
