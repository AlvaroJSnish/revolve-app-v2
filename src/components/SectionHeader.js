import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { get } from "../helpers/api";
import { useDispatch } from "react-redux";
import {
  showMoreDatabasesModal,
  showMoreGroupsModal,
  showMoreProjectsModal,
} from "../redux/actions/AuthActions";
import { showCreateGroupModal } from "../redux/actions/GroupsActions";

const uuidRegex = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

export function SectionHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  function getSection() {
    let pages = pathname.split("/");
    pages.shift();

    if (pages.length === 1 && pages[0] === "app") {
      pages = [];
    }

    if (pages[0] === "app") {
      pages.shift();
    }

    let pageAcc = "";
    pages = pages.map((page, i) => {
      if (i === 0) {
        pageAcc += page + "/";
        return { page, route: page };
      }
      pageAcc += page;
      return { page: pageAcc, route: page };
    });

    return (
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link to={"/app"} className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map(({ page, route }) => (
            <li key={page}>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link
                  to={`${path}/${page}`}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {uuidRegex.test(route) ? route : t(`breadcrumbs.${route}`)}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  function renderButtons() {
    if (pathname === "/app/projects") {
      return (
        <button
          // to={`${path}/projects/new-project`}
          onClick={onNewProject}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("projects.newProject")}
        </button>
      );
    }

    if (pathname === "/app/databases") {
      return (
        <button
          // to={`${path}/databases/new-database`}
          onClick={onNewDatabase}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("databases.newDatabase")}
        </button>
      );
    }

    if (pathname === "/app/groups") {
      return (
        <button
          // to={`${path}/databases/new-database`}
          onClick={onNewGroup}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("groups.newGroup")}
        </button>
      );
    }
  }

  async function onNewProject() {
    const { available, slots, account_type } = await (
      await get("users/available-projects")
    ).data;

    if (available) {
      history.push(`${path}/projects/new-project`);
    } else {
      dispatch(showMoreProjectsModal({ account_type, available, slots }));
    }
  }

  async function onNewDatabase() {
    const { available, slots, account_type } = await (
      await get("users/available-databases")
    ).data;

    if (available) {
      history.push(`${path}/databases/new-database`);
    } else {
      dispatch(showMoreDatabasesModal({ account_type, available, slots }));
    }
  }

  async function onNewGroup() {
    const { available, slots, account_type } = await (
      await get("users/available-groups")
    ).data;

    if (available) {
      // history.push(`${path}/groups/new-group`);
      dispatch(showCreateGroupModal());
    } else {
      dispatch(showMoreGroupsModal({ account_type, available, slots }));
    }
  }

  return (
    <div className="md:flex md:items-center md:justify-between h-5">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {getSection()}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">{renderButtons()}</div>
    </div>
  );
}
