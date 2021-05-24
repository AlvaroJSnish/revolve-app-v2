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

export const showJoinGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.SHOW_JOIN_GROUP_MODAL,
  });
};

export const dismissJoinGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.DISMISS_JOIN_GROUP_MODAL,
  });
};

export const showAddProjectToGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.SHOW_ADD_PROJECT_TO_GROUP_MODAL,
  });
};

export const dismissAddProjectToGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.DISMISS_ADD_PROJECT_TO_GROUP_MODAL,
  });
};

export const showAddDatabaseToGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.SHOW_ADD_DATABASE_TO_GROUP_MODAL,
  });
};

export const dismissAddDatabaseToGroupModal = () => (dispatch) => {
  dispatch({
    type: groupsTypes.DISMISS_ADD_DATABASE_TO_GROUP_MODAL,
  });
};

export const addObjectToGroupRequest =
  ({ object, groupId, route }) =>
  (dispatch) => {
    dispatch({
      type: groupsTypes.ADD_OBJECT_TO_GROUP_REQUEST,
    });

    dispatch(addObjectToGroup({ object, groupId, route }));
  };
{
}
const addObjectToGroup =
  ({ object, groupId, route }) =>
  async (dispatch) => {
    try {
      const group = await (
        await post(`groups/${groupId}/add-${route}/${object}`)
      ).data;

      dispatch({
        type: groupsTypes.ADD_OBJECT_TO_GROUP_SUCCESS,
        payload: { group: group.group },
      });

      if (route === "project") {
        dispatch(dismissAddProjectToGroupModal());
      }

      if (route === "database") {
        dispatch(dismissAddDatabaseToGroupModal());
      }
    } catch (e) {
      dispatch({
        type: groupsTypes.ADD_OBJECT_TO_GROUP_FAILURE,
        payload: { error: e && e.response && e.response.data },
      });
    }
  };
