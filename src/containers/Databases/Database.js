import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

import { get } from "../../helpers/api";
import { ProjectFromDBModal } from "../Modals";
import { fetchDatabaseRequest } from "../../redux/actions/DatabasesActions";

export function Database({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { database, loadingDatabase } = useSelector(
    (state) => state.databases,
    shallowEqual
  );
  const { t } = useTranslation();

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [rows, setRows] = useState(null);
  const [additionalInfo, setAdditinalInfo] = useState({
    has_project: false,
    project: null,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDatabaseRequest(id));
  }, []);

  useEffect(() => {
    if (database && database.id) {
      (async function () {
        const data = await (await get(`databases/${database.id}/tables`)).data;
        setTables(data.tables);
      })();
    }
  }, [database]);

  useEffect(() => {
    if (selectedTable) {
      (async function () {
        const data = await (
          await get(`databases/${database.id}/tables/${selectedTable}`)
        ).data;

        const { rows, project, has_project } = data;

        setHeaders(rows[0]);
        setRows(rows.slice(1, rows.length));
        setAdditinalInfo({ project, has_project });
      })();
    }
  }, [selectedTable]);

  if (loadingDatabase) {
    return <div>{t("common.loading")}</div>;
  }

  function handleTrainModel() {
    setShowModal(true);
  }

  function handleChangeTable(e) {
    const { value } = e.target;
    setSelectedTable(value);
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap h-24 content-center mb-12">
        <span className="mr-4 mt-auto mb-auto">
          {t("database.takeAQuickLook")}
        </span>
        <select
          className="p-4 border-none w-48"
          placeholder="Select a table to inspect"
          onChange={handleChangeTable}
        >
          <option value={null}>{null}</option>
          {tables.map((table, i) => (
            <option key={i} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>
      {headers && headers.length && rows ? (
        <>
          <div className="mb-8">
            {additionalInfo.has_project && additionalInfo.project ? (
              <Trans i18nKey="database.alreadyCreatedAProject">
                You already
                <Link
                  className="text-indigo-500"
                  to={`/app/projects/${additionalInfo.project.id}`}
                >
                  {t("database.createdAProject")}
                </Link>
                with this data
              </Trans>
            ) : (
              <h3>
                If everything looks good, you can{" "}
                <button onClick={handleTrainModel} className="text-indigo-500">
                  train a model
                </button>{" "}
                from this data
              </h3>
            )}
          </div>
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table
              style={{ tableLayout: "fixed", width: "100%" }}
              className="divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="truncate px-4 py-3 text-left text-xs font-medium w-full text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.edit")}</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.view")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((d, i) => {
                        return (
                          <td key={i} className="truncate px-6 py-4">
                            <span>{d}</span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      {showModal ? (
        <ProjectFromDBModal
          headers={headers}
          setShowModal={setShowModal}
          database={database}
          tableName={selectedTable}
          history={history}
        />
      ) : null}
    </div>
  );
}
