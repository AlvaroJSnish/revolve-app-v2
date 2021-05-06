import { websocketTypes } from "../types/WebsocketTypes";

const initialState = {
  socket: null,
};

export default function WebsocketReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case websocketTypes.WEBSOCKET_CONNECT: {
      return { ...state, socket: payload.socket };
    }

    default: {
      return { ...state };
    }
  }
}
