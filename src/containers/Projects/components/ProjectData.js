import { useTranslation } from "react-i18next";

import { LoadingCircle } from "../../../components";

export function ProjectData({
  deleteColumn,
  restoreColumn,
  allColumns,
  deletedColumns,
  savedColumns,
  handleFile,
  handleProjectData,
  projectInfoCompleted,
  selectedFile,
  loadingCsv,
  setLabel,
  label,
  loadingProjectData,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`mt-10 sm:mt-0 ${
          !projectInfoCompleted && "opacity-30 pointer-events-none"
        } transition delay-150 duration-300 ease-in-out`}
      >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t("newProject.data.projectData")}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {t("newProject.data.projectDataLabel")}
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleProjectData}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6"></div>
                  <div>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                          <p className="pl-1">
                            {t("newProject.data.dragAndDrop")}
                          </p>
                        </div>
                        {selectedFile.name ? (
                          <p className="text-xs text-gray-500">
                            {selectedFile.name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">
                            {t("newProject.data.upTo100MB")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {loadingCsv && <LoadingCircle />}
                {!!allColumns.length && (
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
                )}

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={label}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingProjectData && <LoadingCircle />}
                    {t("newProject.save")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
