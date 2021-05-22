import { useState } from "react";
import { post } from "../../../helpers/api";
import { useTranslation } from "react-i18next";

export function Retrain({ project, project_retrain = {} }) {
  const [days, setDays] = useState(5);
  const { created_from_database, project: projectId } = project;

  async function trainFromDatabase() {
    await post(`retrain/${projectId}`, { days, from_database: true });
  }

  return (
    <div className="w-full py-4 grid grid-cols-1 gap-8">
      <FromDatabase
        days={days}
        setDays={setDays}
        created_from_database={created_from_database}
        trainFromDatabase={trainFromDatabase}
        project_retrain={project_retrain}
      />
      <FromCSV project_retrain={project_retrain} />
    </div>
  );
}

function FromDatabase({
  created_from_database,
  days,
  setDays,
  trainFromDatabase,
  project_retrain = {},
}) {
  const { t } = useTranslation();

  if (created_from_database) {
    return (
      <div className="shadow rounded p-4 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <span>{t("retrain.fromDatabaseInfo")}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <select
            value={(project_retrain && project_retrain.scheduled_every) || days}
            disabled={project_retrain && project_retrain.scheduled}
            onChange={(e) => setDays(e.target.value)}
            className={`
              rounded shadow border-0 md:w-64 sm:w-32 h-12 ${
                project_retrain && project_retrain.scheduled && "opacity-50"
              }
            `}
          >
            <option value={5}>5 {t("retrain.days")}</option>
            <option value={7}>7 {t("retrain.days")}</option>
            <option value={14}>14 {t("retrain.days")}</option>
            <option value={31}>31 {t("retrain.days")}</option>
          </select>
          <button
            onClick={trainFromDatabase}
            disabled={project_retrain && project_retrain.scheduled}
            className={`
              primary bg-indigo-600 text-white rounded shadow border-0 md:w-64 sm:w-32 h-12 ${
                project_retrain && project_retrain.scheduled && "opacity-50"
              }
            `}
          >
            {t("retrain.configure")}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function FromCSV({ project_retrain = {} }) {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);

  function handleFile(e) {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  return (
    <div className="shadow rounded p-4 grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <span>{t("retrain.fromCSVInfo")}</span>
      </div>
      <div className="mt-auto">
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md mb-4">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>{t("newProject.data.uploadFile")}</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFile}
                />
              </label>
              <p className="pl-1">{t("newProject.data.dragAndDrop")}</p>
            </div>
            {file && file.name ? (
              <p className="text-xs text-gray-500">{file.name}</p>
            ) : (
              <p className="text-xs text-gray-500">
                {t("newProject.data.upTo100MB")}
              </p>
            )}
          </div>
        </div>
        <button
          disabled={project_retrain && project_retrain.scheduled}
          className={`
              primary bg-indigo-600 text-white rounded shadow border-0 w-full h-12 ${
                project_retrain && project_retrain.scheduled && "opacity-50"
              }`}
        >
          {t("retrain.uploadCSV")}
        </button>
      </div>
    </div>
  );
}
