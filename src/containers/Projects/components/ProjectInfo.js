import Lottie from "react-lottie";
import { LoadingCircle } from "../../../components";
import {
  regressionIllustration,
  classificationIllustration,
} from "../../../animations";
import { post } from "../../../helpers/api";

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

export function ProjectInfo({
  handleProjectInfo,
  setName,
  setSelectedType,
  name,
  selectedType,
  loadingProjectInfo,
}) {
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
    </>
  );
}
