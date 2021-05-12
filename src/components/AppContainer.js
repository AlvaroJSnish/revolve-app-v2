import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { SectionHeader } from "./SectionHeader";
import { logout } from "../redux/actions/AuthActions";
import { clearNotifications } from "../redux/actions/ProjectActions";

const navigation = [
  { name: "Dashboard", path: "/app", locale: "nav.dashboard" },
  { name: "Projects", path: "/app/projects", locale: "nav.projects" },
  { name: "Databases", path: "/app/databases", locale: "nav.databases" },
];

const userNavigation = [
  { name: "Your Profile", path: "/app/account", locale: "nav.profile" },
  { name: "Settings", path: "/app/settings", locale: "nav.settings" },
  { name: "Sign out", path: "/signout", locale: "nav.signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AppContainer({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projectsTrainedNotifications } = useSelector(
    (state) => state.projects,
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth, shallowEqual);

  function handleNotifications() {
    dispatch(clearNotifications());
  }

  function renderBell() {
    return (
      <Menu as="div" className="ml-3 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="relative bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <div
                  className={classNames(
                    projectsTrainedNotifications.length ? "absolute" : "hidden",
                    "absolute transition delay-150 duration-300 ease-in-out rounded h-2 w-2 bg-red-500"
                  )}
                />
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
            </div>
            <Transition
              show={projectsTrainedNotifications.length ? open : false}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ width: 400 }}
              >
                {projectsTrainedNotifications.map((item) => (
                  <Menu.Item key={item}>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <Trans
                          i18nKey="notifications.trainedSuccessfully"
                          item={item}
                        >
                          Your project {{ item }} has been trained successfully!
                        </Trans>
                      </span>
                    )}
                  </Menu.Item>
                ))}
                {projectsTrainedNotifications.length ? (
                  <Menu.Item>
                    <button
                      onClick={handleNotifications}
                      className="text-gray-400 text-sm ml-60"
                    >
                      {t("notifications.clearNotifications")}
                    </button>
                  </Menu.Item>
                ) : null}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  async function handleLogout() {
    dispatch(logout(history));
  }

  return (
    <div className="min-h-screen bg-white">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={classNames(
                          item.path === window.location.pathname
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.path === window.location.pathname
                            ? "page"
                            : undefined
                        }
                      >
                        {t(item.locale)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {renderBell()}

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.avatar}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => {
                              if (item.path === "/signout") {
                                return (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <span
                                        onClick={handleLogout}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                        )}
                                      >
                                        {t(item.locale)}
                                      </span>
                                    )}
                                  </Menu.Item>
                                );
                              }

                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.path}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {t(item.locale)}
                                    </Link>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={classNames(
                      item.path === window.location.pathname
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    aria-current={
                      item.path === window.location.pathname
                        ? "page"
                        : undefined
                    }
                  >
                    {t(item.locale)}
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.username || user.username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => {
                    if (item.path === "/signout") {
                      return (
                        <button
                          key={item.name}
                          onClick={handleLogout}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        >
                          {t(item.locale)}
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        {t(item.locale)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="py-10">
        <header className="mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader />
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
