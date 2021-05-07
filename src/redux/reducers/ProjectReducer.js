import { projectTypes } from "../types/ProjectTypes";

const initialState = {
  loadingProjects: false,
  projects: {
    results: [],
  },
  projectsError: null,
  fetchProjectsCalled: false,

  loadingProject: false,
  project: null,
  projectError: null,
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

    case projectTypes.FETCH_PROJECT_REQUEST: {
      return { ...state, loadingProject: true };
    }

    case projectTypes.FETCH_PROJECT_SUCCESS: {
      return {
        ...state,
        loadingProject: false,
        project: { ...payload.project },
      };
    }

    case projectTypes.FETCH_PROJECT_FAILURE: {
      return { ...state, loadingProject: false, error: payload.error };
    }

    default:
      return { ...state };
  }
}
