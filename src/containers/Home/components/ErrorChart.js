import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { buildData, options, renderInfo } from "./utils";

export function ErrorChart({ average_error, last_week_average_error }) {
  const { t } = useTranslation();
  const info = {
    label: t("projects.Error"),
    color: "rgba(255, 118, 117,1.0)",
    chartData: {
      labels: ["", t("home.lastWeek"), t("home.thisWeek")],
      data: [0, last_week_average_error, average_error, 2],
    },
  };
  const data = buildData(info);

  return (
    <div className="rounded shadow-xl overflow-hidden w-full md:flex mb-14">
      <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 text-white items-center">
        <Line data={data} options={options} />
      </div>
      {renderInfo({
        label: t("projects.error"),
        last_week_data: last_week_average_error,
        average_data: average_error,
        labelToCompare: "error",
      })}
    </div>
  );
}
