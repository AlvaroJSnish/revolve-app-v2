import { Chart } from "./Chart";
import { Trans } from "react-i18next";
import { useState } from "react";

const chartTypes = [
  { id: 1, type: "scatter" },
  { id: 2, type: "radar" },
  { id: 3, type: "bar" },
  // { id: 4, type: "bubble" },
];

export function Charts({
  sorted_correlation,
  label,
  data,
  filteredColumns,
  correlation_array,
  correlation,
}) {
  const [chartsToShow, setChartsToShow] = useState("radar");

  function handleSelectCharts(e) {
    setChartsToShow(e.target.value);
  }

  return (
    <div className="mt-12">
      <h1 className="mt-2 mb-4">
        <Trans i18nKey="project.watchingCharts">
          Watching
          <select
            className="text-indigo-500 border-0"
            value={chartsToShow}
            onChange={handleSelectCharts}
          >
            {chartTypes.map((option) => (
              <option key={option.id} value={option.type}>
                {/*{t(`projects.${option.label}`)}*/}
                {option.type}
              </option>
            ))}
          </select>
          charts
        </Trans>
      </h1>
      <div className="grid grid-cols-4 mt-6 gap-12">
        <div className="col-span-2">
          <Chart
            sorted_correlation={sorted_correlation}
            label={label}
            data={data}
            isFirst
            type={chartsToShow}
            color="#74b9ff"
            filteredColumns={filteredColumns}
            correlation_array={correlation_array}
            correlation={correlation}
          />
        </div>
        {chartsToShow === "scatter" ? (
          <div className="col-span-2">
            <Chart
              sorted_correlation={sorted_correlation}
              label={label}
              data={data}
              type={chartsToShow}
              color="#33d9b2"
              filteredColumns={filteredColumns}
              correlation_array={correlation_array}
              correlation={correlation}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
