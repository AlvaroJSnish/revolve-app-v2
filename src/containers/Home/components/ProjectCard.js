import { useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";

import { selectProjectsToShow } from "../../../redux/actions/ProjectActions";

export function ProjectCard({
  label,
  number_models_trained,
  type,
  labelLowerCase,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  function onNavigate() {
    dispatch(selectProjectsToShow(type));
    history.push(`${path}/projects`);
  }

  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-indigo-100 rounded-md p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <p className="ml-16 text-lg font-medium text-gray-500 truncate">
          {label}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {number_models_trained} {t("home.projectsTrained")}
        </p>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <button
              onClick={onNavigate}
              className="font-medium  hover:text-indigo-600"
            >
              <Trans i18nKey="home.viewAllTypeProjects">
                View all <span className="text-indigo-600">{{ label }}</span>
                projects
              </Trans>
            </button>
          </div>
        </div>
      </dd>
    </div>
  );
}
