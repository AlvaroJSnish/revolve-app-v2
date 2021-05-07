import { projectTypes } from "../types/ProjectTypes";
import { get } from "../../helpers/api";

export const fetchProjectsRequest = () => (dispatch) => {
  dispatch({
    type: projectTypes.FETCH_PROJECTS_REQUEST,
  });
  dispatch(fetchProjects());
};

export const fetchProjects = () => async (dispatch) => {
  const projects = await (await get("projects")).data;
  try {
    dispatch({
      type: projectTypes.FETCH_PROJECTS_SUCCESS,
      payload: { projects },
    });
  } catch (e) {
    dispatch({
      type: projectTypes.FETCH_PROJECTS_FAILURE,
      payload: { error: e },
    });
  }
};

export const fetchProjectRequest = (id) => (dispatch) => {
  dispatch({
    type: projectTypes.FETCH_PROJECT_REQUEST,
  });
  dispatch(fetchProject(id));
};

export const fetchProject = (id) => async (dispatch) => {
  const projects = await (await get(`projects/${id}`)).data;
  try {
    dispatch({
      type: projectTypes.FETCH_PROJECTS_SUCCESS,
      payload: { projects },
    });
  } catch (e) {
    dispatch({
      type: projectTypes.FETCH_PROJECTS_FAILURE,
      payload: { error: e },
    });
  }
};

export const updateProjectFromWS = (project) => (dispatch) => {
  dispatch({
    type: projectTypes.UPDATE_PROJECT_FROM_WS,
    payload: { project },
  });
};
