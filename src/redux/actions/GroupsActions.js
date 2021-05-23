import { groupsTypes } from "../types/GroupTypes";
import { get, post } from "../../helpers/api";

export const fetchGroupsRequest = () => (dispatch) => {
  dispatch({
    type: groupsTypes.FETCH_GROUPS_REQUEST,
  });

  dispatch(fetchGroups());
};

const fetchGroups = () => async (dispatch) => {
  try {
    const groups = await (await get("groups")).data;

    dispatch({
      type: groupsTypes.FETCH_GROUPS_SUCCESS,
      payload: { groups },
    });
  } catch (e) {
    dispatch({
      type: groupsTypes.FETCH_GROUPS_FAILURE,
      payload: { error: e && e.response && e.response.data },
    });
  }
};

export const fetchGroupRequest = (id) => (dispatch) => {
  dispatch({
    type: groupsTypes.FETCH_GROUP_REQUEST,
  });

  dispatch(fetchGroup(id));
};

const fetchGroup = (id) => async (dispatch) => {
  try {
    const group = await (await get(`groups/${id}`)).data;

    dispatch({
      type: groupsTypes.FETCH_GROUP_SUCCESS,
      payload: { group },
    });
  } catch (e) {
    dispatch({
      type: groupsTypes.FETCH_GROUP_FAILURE,
      payload: { error: e && e.response && e.response.data },
    });
  }
};

export const showCreateGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.SHOW_CREATE_GROUP_MODAL,
  });
};

export const dismissCreateGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.DISMISS_CREATE_GROUP_MODAL,
  });
};

export const createGroupRequest = (name) => (dispatch) => {
  dispatch({
    type: groupsTypes.CREATE_GROUP_REQUEST,
  });

  dispatch(createGroup(name));
};

const createGroup = (name) => async (dispatch) => {
  try {
    const group = await (await post("groups", { group_name: name })).data;

    dispatch({
      type: groupsTypes.CREATE_GROUP_SUCCESS,
      payload: { group },
    });

    dispatch(dismissCreateGroupModal());
    dispatch(fetchGroupsRequest());
  } catch (e) {
    dispatch({
      type: groupsTypes.CREATE_GROUP_FAILURE,
      payload: { error: e && e.response && e.response.data },
    });
  }
};
