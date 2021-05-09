import { projectTypes, types } from "../types/ProjectTypes";

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

  projectsTrainedNotifications: [],

  projectsToShow: types.ALL,
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
              ...result,
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

    case projectTypes.UPDATE_PROJECT_FROM_WS: {
      return {
        ...state,
        projects: {
          ...state.projects,
          results: [
            ...state.projects.results.map((project) => {
              if (project.project === payload.project.id) {
                return {
                  project_name: payload.project.project_name,
                  ...payload.project.project_configuration[0],
                };
              }
              return { ...project };
            }),
          ],
        },
        projectsTrainedNotifications: [
          ...state.projectsTrainedNotifications,
          payload.project.project_name,
        ],
      };
    }

    case projectTypes.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        projectsTrainedNotifications: [],
      };
    }

    case projectTypes.SELECT_PROJECTS_TO_SHOW: {
      return {
        ...state,
        projectsToShow: payload.type,
      };
    }

    default:
      return { ...state };
  }
}
