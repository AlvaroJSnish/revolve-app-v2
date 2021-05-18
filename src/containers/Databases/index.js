import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchDatabasesRequest } from "../../redux/actions/DatabasesActions";
import { get } from "../../helpers/api";
import { showMoreDatabasesModal } from "../../redux/actions/AuthActions";

export function Databases({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const { databases } = useSelector((state) => state.databases, shallowEqual);

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

  useEffect(() => {
    dispatch(fetchDatabasesRequest());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("databases.table.header.type")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("databases.table.header.name")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.edit")}</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">{t("projects.table.view")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {databases.map((database) => (
                  <tr key={database.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {database.database_type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {database.database_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`${path}/${database.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {t("projects.table.edit")}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`${path}/${database.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {t("projects.table.view")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
