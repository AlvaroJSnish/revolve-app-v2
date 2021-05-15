import { useState } from "react";
import { LoadingCircle } from "../../components";
import { post } from "../../helpers/api";

export function ProjectFromDBModal({
  setShowModal,
  database,
  headers,
  tableName,
}) {
  const [allColumns, setAllColumns] = useState(headers);
  const [deletedColumns, setDeletedColumns] = useState([]);
  const [savedColumns, setSavedColumns] = useState(headers);
  const [label, setLabel] = useState(null);
  const [loading, setLoading] = useState(false);

  function deleteColumn(column) {
    setSavedColumns([...savedColumns.filter((c) => c !== column)]);
    setDeletedColumns([
      ...deletedColumns,
      ...savedColumns.filter((c) => c === column),
    ]);
  }

  function restoreColumn(column) {
    setDeletedColumns([...deletedColumns.filter((c) => c !== column)]);
    setSavedColumns([...savedColumns, column]);
  }

  async function handleTrain() {
    setLoading(true);
    const project = await (await post(`projects`, { project_name: tableName }))
      .data;
    const config = await (
      await post(`projects/${project.id}/config`, {
        project: project.id,
        project_type: "REGRESSION",
      })
    ).data;
    await post(`projects/${project.id}/config/${config.id}/database`, {
      project_configuration: config.id,
      all_columns: allColumns,
      saved_columns: savedColumns,
      deleted_columns: deletedColumns,
      label,
      project_id: project.id,
      database_id: database.id,
      table_name: tableName,
    });
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Train a new model
                </h3>
                <div className="mt-2">
                  <>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      {savedColumns.map((column) => (
                        <span
                          key={column}
                          onClick={() => deleteColumn(column)}
                          className="cursor-pointer text-xs font-semibold inline-block m-2 py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1"
                        >
                          {column}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      {deletedColumns.map((column) => (
                        <span
                          key={column}
                          onClick={() => restoreColumn(column)}
                          className="cursor-pointer text-xs font-semibold inline-block m-2 py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
                        >
                          {column}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      {savedColumns.map((column) => (
                        <span
                          key={column}
                          onClick={() => setLabel(column)}
                          className={`
                            cursor-pointer text-xs font-semibold inline-block m-2 py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1
                            ${
                              label === column
                                ? "text-green-600 bg-green-200"
                                : "text-gray-600 bg-gray-200"
                            }
                          `}
                        >
                          {column}
                        </span>
                      ))}
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleTrain}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {loading && <LoadingCircle />}
              Train
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
