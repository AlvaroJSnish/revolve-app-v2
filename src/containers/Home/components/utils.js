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

export function renderInfo({ label, last_week_data = 0, average_data = 0 }) {
  return (
    <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
      <div className="w-full">
        <h3 className="text-lg font-semibold leading-tight text-gray-800">
          {label} evolution
        </h3>
        <h6 className="text-sm leading-tight mb-2 text-gray-400">
          <span>Changes on {label} from last week</span>
        </h6>
        <div className="flex w-full items-end mb-6">
          <span className="block leading-none text-3xl text-gray-800">
            {numberToFix(last_week_data - average_data, 2)}%
          </span>
          <span
            className={`
                block leading-5 text-sm ml-4
                ${
                  last_week_data > average_data
                    ? "text-green-500"
                    : "text-red-500"
                }
              `}
          >
            {`${last_week_data - average_data <= 0 ? "▼" : "▲"} ${(
              last_week_data - average_data
            ).toFixed(2)} ${
              average_data !== 0 && last_week_data !== 0
                ? `(${((last_week_data / average_data) * 100 - 100).toFixed(
                    2
                  )}%)`
                : ""
            }`}
          </span>
        </div>
      </div>
    </div>
  );
}
