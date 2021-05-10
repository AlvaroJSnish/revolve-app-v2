import deepEqual from "deep-equal";
import { useEffect } from "react";
import { format } from "date-fns";
import { useTranslation, Trans } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { types } from "../../redux/types/ProjectTypes";
import {
  fetchProjectsRequest,
  selectProjectsToShow,
} from "../../redux/actions/ProjectActions";

export function Projects() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  const { projects, projectsToShow } = useSelector(
    (state) => state.projects,
    deepEqual
  );

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, []);

  function renderCurrentStatus(status) {
    switch (status) {
      case "FAILURE": {
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            {t("projects.table.status.failure")}
          </span>
        );
      }

      case "PENDING": {
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            {t("projects.table.status.pending")}
          </span>
        );
      }

      case "SUCCESS":
      default: {
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {t("projects.table.status.success")}
          </span>
        );
      }
    }
  }

  function renderTrained(trained, status) {
    if (status === "PENDING") {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {t("projects.table.status.pending")}
        </span>
      );
    }

    if (trained) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {t("projects.table.trained")}
        </span>
      );
    }

    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        {t("projects.table.notTrained")}
      </span>
    );
  }

  function handleProjectTypes(e) {
    e.preventDefault();
    dispatch(selectProjectsToShow(e.target.value.toUpperCase()));
  }

  function renderProjectTypes() {
    const pt = Object.keys(types).map((e, i) => ({
      id: i,
      label: e.toLowerCase(),
    }));

    return (
      <h1 className="mt-2 mb-4">
        <Trans i18nKey="projects.watchingProjects">
          Watching
          <select
            className="text-indigo-500 border-0"
            value={projectsToShow.toLowerCase()}
            onChange={handleProjectTypes}
          >
            {pt.map((option) => (
              <option key={option.id} value={option.label}>
                {t(`projects.${option.label}`)}
              </option>
            ))}
          </select>
          projects
        </Trans>
      </h1>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {renderProjectTypes()}
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.table.header.name")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.table.header.currentStatus")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.table.trained")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.table.header.accuracy")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.Error")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("projects.table.header.lastTimeTrained")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.edit")}</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.view")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.results
                  .filter((p) => {
                    if (projectsToShow === types.ALL) {
                      return { ...p };
                    }

                    if (p.project_type === projectsToShow) {
                      return { ...p };
                    }
                  })
                  .map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {project.project_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {project.project_type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderCurrentStatus(project.training_task_status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderTrained(
                          project.trained,
                          project.training_task_status
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.accuracy &&
                          (project.accuracy * 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.error && project.error.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.last_time_trained &&
                          format(
                            new Date(project.last_time_trained),
                            "dd/MM/yyyy"
                          )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`${path}/${project.project}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t("projects.table.edit")}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`${path}/${project.project}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t("projects.table.view")}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
