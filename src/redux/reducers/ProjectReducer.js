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

  loadingPrediction: false,
  prediction: null,
  predictionError: null,

  projectsLite: [],
  projectsLiteError: null,
  loadingProjectsLite: false,
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
              ...result.project_configuration,
              ...result,
            })),
          ],
        },
        prediction: null,
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
                  ...payload.project.project_configuration,
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

    case projectTypes.MAKE_PREDICTION_REQUEST:
      return { ...state, loadingPrediction: true };

    case projectTypes.MAKE_PREDICTION_SUCCESS:
      return {
        ...state,
        loadingPrediction: false,
        prediction: payload,
      };

    case projectTypes.MAKE_PREDICTION_FAILURE:
      return {
        ...state,
        loadingPrediction: false,
        predictionError: payload.error,
      };

    case projectTypes.FETCH_PROJECTS_LITE_REQUEST: {
      return { ...state, loadingProjectsLite: true };
    }

    case projectTypes.FETCH_PROJECTS_LITE_SUCCESS: {
      return {
        ...state,
        loadingProjectsLite: false,
        projectsLite: [...payload.projectsLite],
        projectsLiteError: null,
      };
    }

    case projectTypes.FETCH_PROJECTS_LITE_FAILURE: {
      return {
        ...state,
        loadingProjectsLite: false,
        projectsLiteError: payload.error,
      };
    }

    default:
      return { ...state };
  }
}
