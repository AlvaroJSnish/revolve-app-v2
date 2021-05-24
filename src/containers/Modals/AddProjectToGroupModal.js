import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { FolderIcon } from "@heroicons/react/outline";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  addObjectToGroupRequest,
  dismissAddProjectToGroupModal,
} from "../../redux/actions/GroupsActions";
import { fetchProjectsLiteRequest } from "../../redux/actions/ProjectActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AddProjectToGroupModal({ groupId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState("");

  const { showAddProjectToGroupModal = false } = useSelector(
    (state) => state.groups,
    shallowEqual
  );
  const { projectsLite = [] } = useSelector(
    (state) => state.projects,
    shallowEqual
  );

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProjectsLiteRequest());
  }, []);

  function handleClose() {
    dispatch(dismissAddProjectToGroupModal());
  }

  async function handleCreate() {
    dispatch(
      addObjectToGroupRequest({
        groupId,
        route: "project",
        object: selectedProject,
      })
    );
  }

  return (
    <Transition.Root show={showAddProjectToGroupModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={showAddProjectToGroupModal}
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FolderIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {t("groups.addProjectModal.title")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <select
                        className="rounded border-gray-200"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <option value={""}>{""}</option>
                        {projectsLite.map((result) => (
                          <option key={result.id} value={result.id}>
                            {result.project_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  {t("account.upgrade.dismiss")}
                </button>
                <button
                  type="button"
                  className={classNames(
                    "transition delay-150 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                    !selectedProject.length ? "opacity-50" : ""
                  )}
                  onClick={handleCreate}
                  ref={cancelButtonRef}
                  disabled={!selectedProject.length}
                >
                  {t("account.upgrade.continue")}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}