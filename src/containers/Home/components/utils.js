import { Trans } from "react-i18next";

export const buildData = ({ chartData, label, color }) => ({
  labels: chartData.labels,
  datasets: [
    {
      label,
      backgroundColor: color,
      pointBackgroundColor: color,
      data: chartData.data,
    },
  ],
});

export const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "rgba(116, 185, 255,1.0)",
        },
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "rgba(116, 185, 255,1.0)",
        },
        gridLines: {
          color: "rgba(116, 185, 255,1.0)",
          borderDash: [5, 5],
          zeroLineColor: "rgba(116, 185, 255,1.0)",
          zeroLineBorderDash: [5, 5],
        },
      },
    ],
  },
  layout: {
    padding: {
      right: 10,
    },
  },
};

export const numberToFix = (number, fix) => (number || 0).toFixed(fix);

export function renderInfo({
  label,
  last_week_data = 0,
  average_data = 0,
  labelToCompare,
}) {
  function renderNumbers() {
    let ad = average_data;
    let lwad = last_week_data;

    if (labelToCompare === "accuracy") {
      ad = ad * 100;
      lwad = last_week_data * 100;

      return (
        <>
          <span className="block leading-none text-3xl text-gray-800">
            {numberToFix(ad, 2)}%
          </span>
          <span
            className={`
                block leading-5 text-sm ml-4
                ${lwad < ad ? "text-green-500" : "text-red-500"}
              `}
          >
            {lwad > ad ? "▼ -" : "▲ +"}
            {(lwad - ad < 0 ? (lwad - ad) * -1 : lwad - ad).toFixed(2)}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="block leading-none text-3xl text-gray-800">
            {numberToFix(ad, 2)}
          </span>
          <span
            className={`
                block leading-5 text-sm ml-4
                ${lwad > ad ? "text-green-500" : "text-red-500"}
              `}
          >
            {lwad < ad ? "▼ +" : "▲ -"}
            {(lwad - ad < 0 ? (lwad - ad) * -1 : lwad - ad).toFixed(2)}
          </span>
        </>
      );
    }
  }
  return (
    <div className="flex w-full md:w-1/2 p-10 bg-gray-50 text-gray-600 items-center">
      <div className="w-full">
        <h3 className="text-lg font-semibold leading-tight text-gray-800">
          <Trans i18nKey="home.evolution">{{ label }} evolution</Trans>
        </h3>
        <h6 className="text-sm leading-tight mt-1 mb-3 text-gray-400">
          <Trans i18nKey="home.changesOn">
            Changes on {{ label }} from last week
          </Trans>
        </h6>
        <div className="flex w-full items-end mb-6">{renderNumbers()}</div>
      </div>
    </div>
  );
}
