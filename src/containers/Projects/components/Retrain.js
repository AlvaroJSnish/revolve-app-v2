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
  return (
    <div className="shadow rounded p-4 grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <span>{t("retrain.fromCSVInfo")}</span>
      </div>
      <div className="mt-auto">
        <button
          disabled={project_retrain && project_retrain.scheduled}
          className={`
              primary bg-indigo-600 text-white rounded shadow border-0 md:w-64 sm:w-32 h-12 ${
                project_retrain && project_retrain.scheduled && "opacity-50"
              }`}
        >
          {t("retrain.uploadCSV")}
        </button>
      </div>
    </div>
  );
}
