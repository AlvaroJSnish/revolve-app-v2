import { useTranslation } from "react-i18next";

import { LoadingCircle } from "../../../components";

export function ProjectTrain({
  projectInfoCompleted,
  projectDataCompleted,
  train,
  loadingProjectTrain,
}) {
  const { t } = useTranslation();

  return (
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
              {t("newProject.train.train")}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t("newProject.train.lastStep")}
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={train}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="pb-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t("newProject.train.title")}
                  </h3>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loadingProjectTrain && <LoadingCircle />}
                  {t("newProject.train.train")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
