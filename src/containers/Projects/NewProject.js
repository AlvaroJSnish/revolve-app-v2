import Lottie from "react-lottie";
import { useState } from "react";

import {
  regressionIllustration,
  classificationIllustration,
} from "../../animations";
import { post } from "../../helpers/api";
import { LoadingCircle } from "../../components";

const projectTypes = [
  {
    id: 1,
    name: "REGRESSION",
    illustration: regressionIllustration,
    disabled: false,
  },
  {
    id: 2,
    name: "CLASSIFICATION",
    illustration: classificationIllustration,
    disabled: true,
  },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
};

export function NewProject({ history }) {
  // info fields
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  // data fields
  const [selectedFile, setSelectedFile] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [deletedColumns, setDeletedColumns] = useState([]);
  const [savedColumns, setSavedColumns] = useState([]);
  const [temporaryUuid, setTemporaryUuid] = useState(null);
  const [label, setLabel] = useState(null);

  // meta
  const [loadingCsv, toggleLoadingCsv] = useState(false);
  const [loadingProjectInfo, setLoadingProjectInfo] = useState(false);
  const [loadingProjectData, setLoadingProjectData] = useState(false);
  const [loadingProjectTrain, setLoadingProjectTrain] = useState(false);

  // data
  const [project, setProject] = useState(null);
  const [projectConfig, setProjectConfig] = useState(null);

  // form states
  const [projectInfoCompleted, setProjectInfoCompleted] = useState(false);
  const [projectDataCompleted, setProjectDataCompleted] = useState(false);

  async function handleProjectInfo(e) {
    e.preventDefault();
    setLoadingProjectInfo(true);
    const project = await (await post(`projects`, { project_name: name })).data;
    setProject(project);
    setLoadingProjectInfo(false);
    setProjectInfoCompleted(true);
  }

  async function handleProjectData(e) {
    e.preventDefault();
    setLoadingProjectData(true);
    const config = await (
      await post(`projects/${project.id}/config`, {
        project: project.id,
        project_type: selectedType,
      })
    ).data;
    setProjectConfig(config);
    setLoadingProjectData(false);
    setProjectDataCompleted(true);
  }

  async function train(e) {
    e.preventDefault();
    setLoadingProjectTrain(true);
    await post(
      `projects/${project.id}/config/${projectConfig.id}/config_file`,
      {
        project_configuration: projectConfig.id,
        all_columns: allColumns,
        saved_columns: savedColumns,
        deleted_columns: deletedColumns,
        label,
        temporary_uuid: temporaryUuid,
        project_id: project.id,
      }
    );
    setLoadingProjectTrain(false);
    history.push("/app/projects");
  }

  async function handleFile(e) {
    e.preventDefault();
    toggleLoadingCsv(true);
    setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const data = await (
      await post(
        "project-file",
        formData,
        {},
        {
          "Content-Type": "multipart/form-data",
        }
      )
    ).data;

    toggleLoadingCsv(false);
    setAllColumns([...data.columns]);
    setSavedColumns([...data.columns]);
    setTemporaryUuid(data.temporary_uuid);
  }

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

  return (
    <>
      <div className="py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Project
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Information about the project
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleProjectInfo}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="project_name"
                          id="project_name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="Wine quality, houses prices, ..."
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2">
                      {projectTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`flex flex-col justify-center ${
                            type.disabled && "opacity-30"
                          }`}
                          style={{ pointerEvents: type.disabled }}
                          {...(!type.disabled && {
                            onClick: () => setSelectedType(type.name),
                          })}
                        >
                          <Lottie
                            options={{
                              ...defaultOptions,
                              animationData: type.illustration,
                            }}
                            style={{ pointerEvents: "none" }}
                          />
                          <h3
                            className={`text-lg leading-6 font-medium ${
                              type.name === selectedType
                                ? "text-indigo-400"
                                : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className={`
                      duration-300 ease-in-out inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      ${
                        (!name.trim().length || !selectedType) &&
                        "opacity-30 pointer-events-none"
                      }
                    `}
                  >
                    {loadingProjectInfo ? <LoadingCircle /> : null}
                    Save
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

      <div
        className={`mt-10 sm:mt-0 ${
          !projectInfoCompleted && "opacity-30 pointer-events-none"
        } transition delay-150 duration-300 ease-in-out`}
      >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Project data
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Now we need to collect data to create a model
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
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFile}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        {selectedFile.name ? (
                          <p className="text-xs text-gray-500">
                            {selectedFile.name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">
                            CSV up to 100MB
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
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingProjectData && <LoadingCircle />}
                    Save
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

      <div
        className={`mt-10 sm:mt-0 ${
          (!projectInfoCompleted || !projectDataCompleted) &&
          "opacity-30 pointer-events-none"
        } transition delay-150 duration-300 ease-in-out`}
      >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Train
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                The last step of creating a project
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={train}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="pb-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      We are ready now to train our model!
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingProjectTrain && <LoadingCircle />}
                    Train
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
