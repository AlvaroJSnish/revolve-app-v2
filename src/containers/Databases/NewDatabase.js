import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  errorAnimation,
  loadingAnimation,
  successAnimation,
} from "../../animations";
import {
  checkDBConnectionRequest,
  createDatabaseConnectionRequest,
  dismissConnection,
} from "../../redux/actions/DatabasesActions";
import { LoadingCircle } from "../../components";
import { get } from "../../helpers/api";
import { showMoreDatabasesModal } from "../../redux/actions/AuthActions";

export function NewDatabase({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [db, setDb] = useState({ ...dbSchema });
  const {
    connectingToDatabase,
    databaseConnectionStatus,
    databaseConnectionMessage,
    loadingCreateDatabase,
  } = useSelector((state) => state.databases, shallowEqual);

  useEffect(() => {
    (async function () {
      const { available, slots, account_type } = await (
        await get("users/available-projects")
      ).data;

      if (!available) {
        dispatch(showMoreDatabasesModal({ account_type, available, slots }));
      }
    })();
  }, []);

  async function handleConnect() {
    dispatch(checkDBConnectionRequest(db));
  }

  async function onSave() {
    dispatch(createDatabaseConnectionRequest(db, history));
  }

  async function onDismiss() {
    dispatch(dismissConnection(history));
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-8 py-4">
        <div className="shadow rounded-sm p-4 md:col-span-2 sm:col-span-1">
          {dbValues.map((value) => (
            <div key={value.id} className="flex row mb-4 justify-between">
              <label
                htmlFor="company_website"
                className="block text-sm font-medium text-gray-700 mr-3"
              >
                {t(value.placeholder)}
              </label>
              {value.type !== "list" ? (
                <input
                  type={value.type}
                  name={value.value}
                  id="project_name"
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-64 rounded-md sm:text-sm border-gray-100"
                  placeholder={t(value.placeholder)}
                  onChange={(e) =>
                    setDb({ ...db, [value.value]: e.target.value })
                  }
                />
              ) : (
                <select
                  onChange={(e) =>
                    setDb({
                      ...db,
                      [value.value]: e.target.value.toLowerCase(),
                    })
                  }
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-64 rounded-md sm:text-sm border-gray-100"
                >
                  {value.options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button
            onClick={handleConnect}
            className="ml-auto inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t("databases.create.connect")}
          </button>
        </div>
        <div className="shadow rounded-sm p-4 flex flex-col">
          {connectingToDatabase ? (
            <Lottie
              width={200}
              options={{
                ...defaultOptions,
                loop: true,
                animationData: loadingAnimation,
              }}
              style={{ pointerEvents: "none" }}
            />
          ) : null}
          {databaseConnectionStatus ? (
            <Lottie
              width={200}
              options={{
                ...defaultOptions,
                animationData: successAnimation,
              }}
              style={{ pointerEvents: "none" }}
            />
          ) : null}
          {databaseConnectionStatus === 0 ? (
            <Lottie
              width={200}
              options={{
                ...defaultOptions,
                animationData: errorAnimation,
              }}
              style={{ pointerEvents: "none" }}
            />
          ) : null}
          <h2
            className={`
            text-lg ${
              databaseConnectionStatus ? "text-green-400" : "text-red-400"
            }
          `}
          >
            {t(databaseConnectionMessage)}
          </h2>
        </div>
      </div>
      {databaseConnectionStatus === 1 ? (
        <div className="w-full shadow mt-4 p-4 flex flex-row">
          <h2>{t("databases.create.saveConnection")}</h2>
          <button
            onClick={onDismiss}
            className="ml-auto inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium text-white text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {t("databases.create.dismiss")}
          </button>
          <button
            onClick={onSave}
            className="ml-auto primary inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loadingCreateDatabase && <LoadingCircle />}
            {t("databases.create.save")}
          </button>
        </div>
      ) : null}
    </div>
  );
}

const dbSchema = {
  database_name: "",
  database_port: "",
  database_user: "",
  database_password: "",
  database_type: "",
  database_host: "",
};

const dbValues = [
  {
    id: 1,
    locale: "database.host",
    value: "database_host",
    placeholder: "databases.create.placeholder.host",
    type: "text",
    options: null,
  },
  {
    id: 2,
    locale: "database.port",
    value: "database_port",
    placeholder: "databases.create.placeholder.port",
    type: "number",
    options: null,
  },
  {
    id: 3,
    locale: "database.name",
    value: "database_name",
    placeholder: "databases.create.placeholder.name",
    type: "text",
    options: null,
  },
  {
    id: 4,
    locale: "database.user",
    value: "database_user",
    placeholder: "databases.create.placeholder.user",
    type: "text",
    options: null,
  },
  {
    id: 5,
    locale: "database.password",
    value: "database_password",
    placeholder: "databases.create.placeholder.password",
    type: "text",
    options: null,
  },
  {
    id: 6,
    locale: "database.type",
    value: "database_type",
    placeholder: "databases.create.placeholder.type",
    type: "list",
    options: ["", "PostgreSQL"],
  },
];

const defaultOptions = {
  loop: false,
  autoplay: true,
};
