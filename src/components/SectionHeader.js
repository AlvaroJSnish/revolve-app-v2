import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/solid";

export function SectionHeader() {
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
          {pages.map((page) => (
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
                  {page}
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
        <Link
          to={`${path}/projects/new-project`}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New project
        </Link>
      );
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