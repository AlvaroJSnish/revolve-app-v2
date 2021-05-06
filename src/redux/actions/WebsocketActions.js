import { websocketTypes } from "../types/WebsocketTypes";

export const connectWebsocket = (socket) => (dispatch) => {
  dispatch({
    type: websocketTypes.WEBSOCKET_CONNECT,
    payload: { socket },
  });
};
