import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { ClipboardCopyIcon } from "@heroicons/react/outline";

import { deletes } from "../../helpers/api";
import {
  fetchGroupRequest,
  showAddDatabaseToGroupModal,
  showAddProjectToGroupModal,
} from "../../redux/actions/GroupsActions";
import { AddProjectToGroupModal } from "../Modals/AddProjectToGroupModal";
import { AddDatabaseToGroupModal } from "../Modals/AddDatabaseToGroupModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Group({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("users");

  const { id } = useParams();
  const { group, loadingGroup } = useSelector(
    (state) => state.groups,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchGroupRequest(id));
  }, []);

  if (loadingGroup || !group) {
    return <h3>{t("common.loading")}</h3>;
  }

  return (
    <div className="grid grid-cols-1 w-full">
      <Header
        name={group.group_name}
        id={group.id}
        invitation_code={group.invitation_code}
      />
      <Tabs tab={tab} setTab={setTab} />
      <Users tab={tab} users={group.users} />
      <Projects tab={tab} projects={group.projects} />
      <Databases tab={tab} databases={group.databases} />

      <AddProjectToGroupModal groupId={id} />
      <AddDatabaseToGroupModal groupId={id} />
    </div>
  );
}

function Header({ name, id, invitation_code }) {
  const { t } = useTranslation();
  const history = useHistory();

  async function handleDelete() {
    await deletes(`groups/${id}`);
    history.push("/app/groups");
  }

  async function copyCode() {
    await navigator.clipboard.writeText(invitation_code);
  }

  return (
    <div className="md:flex md:items-center md:justify-between mt-8 mb-8">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold leading-7 text-gray-700 sm:text-3xl sm:truncate">
          {name}
        </h2>
        <h3 className="text-gray-400 flex flex-row">
          {t("groups.invitationCode")} {invitation_code}
          <ClipboardCopyIcon
            className="w-6 ml-2 cursor-pointer"
            onClick={copyCode}
          />
        </h3>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          onClick={handleDelete}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("project.delete")}
        </button>
      </div>
    </div>
  );
}

function Tabs({ tab, setTab }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-between">
      <button
        className={classNames(
          "shadow p-2 mr-12 w-52 rounded",
          `${tab === "users" && "ring-2 ring-indigo-300"}`
        )}
        onClick={() => setTab("users")}
      >
        {t("groups.tabs.users")}
      </button>
      <button
        className={classNames(
          "shadow p-2 mr-12 w-52 rounded relative",
          `${tab === "projects" && "ring-2 ring-indigo-300"}`
        )}
        onClick={() => setTab("projects")}
      >
        {t("groups.tabs.projects")}
      </button>
      <button
        className={classNames(
          "shadow p-2 w-52 rounded relative",
          `${tab === "databases" && "ring-2 ring-indigo-300"}`
        )}
        onClick={() => setTab("databases")}
      >
        {t("groups.tabs.databases")}
      </button>
    </div>
  );
}

function Users({ users, tab }) {
  const { t } = useTranslation();

  if (tab !== "users") {
    return null;
  }

  return (
    <div className="pt-6">
      {(!users || !users.length) && (
        <h3 className="text-gray-400">{t("groups.noUsers")}</h3>
      )}
      <table className="min-w-full divide-y divide-gray-200 mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("projects.table.header.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">{t("projects.table.view")}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-0">
                    <div className="text-sm font-medium text-gray-900">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Projects({ projects, tab }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (tab !== "projects") {
    return null;
  }

  function handleAddProject() {
    dispatch(showAddProjectToGroupModal());
  }

  return (
    <div className="pt-6">
      <div className="flex flex-row">
        {(!projects || !projects.length) && (
          <h3 className="text-gray-400">{t("groups.noProjects")}</h3>
        )}
        <button
          onClick={handleAddProject}
          className="ml-auto bg-indigo-600 p-2 rounded shadow text-white"
        >
          {t("groups.addProject")}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("projects.table.header.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">{t("projects.table.view")}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/app/projects/${project.id}`}
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
  );
}

function Databases({ databases, tab }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (tab !== "databases") {
    return null;
  }

  function handleAddDatabase() {
    dispatch(showAddDatabaseToGroupModal());
  }

  return (
    <div className="pt-6">
      <div className="flex flex-row">
        {(!databases || !databases.length) && (
          <h3 className="text-gray-400">{t("groups.noDatabases")}</h3>
        )}
        <button
          onClick={handleAddDatabase}
          className="ml-auto bg-indigo-600 p-2 rounded shadow text-white"
        >
          {t("groups.addDatabase")}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("databases.table.header.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">{t("projects.table.view")}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {databases.map((database) => (
            <tr key={database.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-0">
                    <div className="text-sm font-medium text-gray-900">
                      {database.database_name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/app/databases/${database.id}`}
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
  );
}
