import { groupsTypes } from "../types/GroupTypes";

const initialState = {
  groups: {},
  loadingGroups: false,
  groupsError: null,
  group: null,
  groupError: null,
  loadingGroup: false,
  loadingCreateGroup: false,
  createGroupError: null,

  showJoinGroupModal: false,
  showAddProjectToGroupModal: false,
  showAddDatabaseToGroupModal: false,
};

export default function groupsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case groupsTypes.FETCH_GROUPS_REQUEST: {
      return { ...state, loadingGroups: true };
    }

    case groupsTypes.FETCH_GROUPS_SUCCESS: {
      return {
        ...state,
        loadingGroups: false,
        groupsError: null,
        groups: { ...payload.groups },
      };
    }

    case groupsTypes.FETCH_GROUPS_FAILURE: {
      return {
        ...state,
        loadingGroups: false,
        groupsError: payload.error,
        groups: [],
      };
    }

    case groupsTypes.FETCH_GROUP_REQUEST: {
      return { ...state, loadingGroup: true };
    }

    case groupsTypes.FETCH_GROUP_SUCCESS: {
      return {
        ...state,
        loadingGroup: false,
        groupError: null,
        group: { ...payload.group },
      };
    }

    case groupsTypes.FETCH_GROUP_FAILURE: {
      return {
        ...state,
        loadingGroup: false,
        groupError: payload.error,
        group: {},
      };
    }

    case groupsTypes.CREATE_GROUP_REQUEST: {
      return { ...state, loadingCreateGroup: true };
    }

    case groupsTypes.CREATE_GROUP_SUCCESS: {
      return {
        ...state,
        loadingCreateGroup: false,
        error: null,
        group: { ...payload.group },
      };
    }

    case groupsTypes.CREATE_GROUP_FAILURE: {
      return {
        ...state,
        loadingCreateGroup: false,
        error: payload.error,
        group: null,
      };
    }

    case groupsTypes.SHOW_CREATE_GROUP_MODAL: {
      return {
        ...state,
        showCreateGroupModal: true,
      };
    }

    case groupsTypes.DISMISS_CREATE_GROUP_MODAL: {
      return {
        ...state,
        showCreateGroupModal: false,
      };
    }

    case groupsTypes.SHOW_JOIN_GROUP_MODAL: {
      return { ...state, showJoinGroupModal: true };
    }

    case groupsTypes.DISMISS_JOIN_GROUP_MODAL: {
      return { ...state, showJoinGroupModal: false };
    }

    case groupsTypes.SHOW_ADD_DATABASE_TO_GROUP_MODAL: {
      return { ...state, showAddDatabaseToGroupModal: true };
    }

    case groupsTypes.DISMISS_ADD_DATABASE_TO_GROUP_MODAL: {
      return { ...state, showAddDatabaseToGroupModal: false };
    }

    case groupsTypes.SHOW_ADD_PROJECT_TO_GROUP_MODAL: {
      return { ...state, showAddProjectToGroupModal: true };
    }

    case groupsTypes.DISMISS_ADD_PROJECT_TO_GROUP_MODAL: {
      return { ...state, showAddProjectToGroupModal: false };
    }

    default: {
      return { ...state };
    }
  }
}
