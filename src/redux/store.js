import thunkMiddleware from "redux-thunk";

import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";

import reducers from "./reducers";
import { authState } from "./reducers/AuthReducer";

export let store;

function initStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore() {
  const access_token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");
  if (access_token && user) {
    authState["user"] = { ...JSON.parse(user) };
    authState["access_token"] = JSON.parse(access_token);
  }

  return useMemo(() => initializeStore({ auth: { ...authState } }), []);
}
