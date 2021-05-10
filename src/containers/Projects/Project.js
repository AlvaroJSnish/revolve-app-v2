import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProjectRequest } from "../../redux/actions/ProjectActions";
import { useTranslation } from "react-i18next";
import { Charts } from "./components/Charts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Project() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const { project } = useSelector((state) => state.projects, shallowEqual);

  useEffect(() => {
    dispatch(fetchProjectRequest(id));
  }, [id]);

  if (!project) {
    return <h1>Loading..</h1>;
  }

  const { project_configuration } = project;
  const { configuration_file } = project_configuration;

  return (
    <div>
      <Header name={project.project_name} />
      <dl className="mt-5 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <CardAccuracy
          label={t("projects.Accuracy")}
          value={project_configuration.accuracy}
        />
        <CardError
          label={t("projects.Error")}
          value={project_configuration.error}
        />
      </dl>
      <Correlation
        correlation={project_configuration.correlation}
        configurationFile={configuration_file}
      />
    </div>
  );
}

function Header({ name, id }) {
  const { t } = useTranslation();
  return (
    <div className="md:flex md:items-center md:justify-between mt-8 mb-8">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold leading-7 text-gray-700 sm:text-3xl sm:truncate">
          {name}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("project.delete")}
        </button>
      </div>
    </div>
  );
}

function CardAccuracy({ label, value }) {
  return (
    <div key={label} className="py-5 bg-white rounded-lg overflow-hidden">
      <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {(value * 100).toFixed(2)}%
      </dd>
    </div>
  );
}

function CardError({ label, value }) {
  return (
    <div key={label} className="py-5 bg-white rounded-lg overflow-hidden">
      <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {value.toFixed(2)}
      </dd>
    </div>
  );
}

function Correlation({ correlation, configurationFile }) {
  const { t } = useTranslation();

  if (correlation && configurationFile) {
    const { saved_columns, final_data, label, final_label } = configurationFile;
    let correlation_array = [];
    for (const property in correlation) {
      correlation_array.push([property, correlation[property]]);
    }

    correlation_array.pop();

    let sorted_correlation = correlation_array.sort(function (a, b) {
      return b[1] - a[1];
    });

    sorted_correlation = sorted_correlation.filter((c) => c[1] > 0);
    const filteredColumns = saved_columns.filter((c) => c !== label);

    const data = [];
    final_data.forEach((d, k) => {
      const row = {};
      d.forEach((j, i) => {
        row[filteredColumns[i]] = j;
      });
      data.push({ ...row, [label]: final_label[k] });
    });

    return (
      <div>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          {t("project.correlation")}
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted_correlation.map((corr) => (
            <li key={corr[0]} className="col-span-1 flex shadow-sm rounded-md">
              <div
                className={classNames(
                  "py-2 px-2 bg-gray-50",
                  "flex-shrink-0 justify-center w-32 h-20 text-white text-sm font-medium rounded-l-md text-indigo-600"
                )}
              >
                {corr[0]}
              </div>
              <div className="flex-1 flex items-center justify-between bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <p className="text-2xl text-gray-500">{corr[1].toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Charts
          sorted_correlation={sorted_correlation}
          correlation_array={correlation_array}
          correlation={correlation}
          filteredColumns={filteredColumns}
          label={label}
          data={data}
        />
      </div>
    );
  }

  return null;
}
