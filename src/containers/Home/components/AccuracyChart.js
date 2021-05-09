import { Line } from "react-chartjs-2";
import { buildData, options, renderInfo } from "./utils";

export function AccuracyChart({
  average_accuracy,
  last_week_average_accuracy,
}) {
  const info = {
    label: "Accuracy",
    color: "rgba(116, 185, 255,1.0)",
    chartData: {
      labels: ["", "", ""],
      data: [0, last_week_average_accuracy, average_accuracy, 100],
    },
  };
  const data = buildData(info);

  return (
    <div className="rounded shadow-xl overflow-hidden w-full md:flex mb-14">
      <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 text-white items-center">
        <Line data={data} options={options} />
      </div>
      {renderInfo({
        label: "Accuracy",
        last_week_data: last_week_average_accuracy,
        average_data: average_accuracy,
      })}
    </div>
  );
}