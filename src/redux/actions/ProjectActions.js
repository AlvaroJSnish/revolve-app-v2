import { projectTypes } from "../types/ProjectTypes";
import { get } from "../../helpers/api";

export const fetchProjectRequest = () => (dispatch, getState) => {
  const { socket } = getState().socket;

  // if (socket) {
  // socket.send("get_projects");
  dispatch({
    type: projectTypes.FETCH_PROJECTS_REQUEST,
  });
  dispatch(fetchProjects());
  // }
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
