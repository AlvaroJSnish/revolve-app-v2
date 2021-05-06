import { projectTypes } from "../types/ProjectTypes";

const initialState = {
  loadingProjects: false,
  projects: {
    results: [],
  },
  projectsError: null,
  fetchProjectsCalled: false,
};

export default function projectReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case projectTypes.FETCH_PROJECTS_REQUEST: {
      return { ...state, loadingProjects: true };
    }

    case projectTypes.FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        loadingProjects: false,
        projects: {
          ...payload.projects,
          results: [
            ...payload.projects.results.map((result) => ({
              project_name: result.project_name,
              ...result.project_configuration[0],
            })),
          ],
        },
      };
    }

    case projectTypes.FETCH_PROJECTS_FAILURE: {
      return { ...state, loadingProjects: false, projectsError: payload.error };
    }

    default:
      return { ...state };
  }
}
