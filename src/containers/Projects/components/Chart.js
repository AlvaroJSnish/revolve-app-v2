import ChartComponent from "react-chartjs-2";

export function Chart({
  sorted_correlation,
  label,
  data,
  isFirst,
  color = "red",
  type = "scatter",
  filteredColumns,
  correlation_array,
  correlation,
}) {
  function BuildConfig() {
    if (type === "scatter") {
      const dataToScatter = {
        datasets: [
          {
            label: `${label} correlation with ${
              sorted_correlation[isFirst ? 0 : 1][0]
            }`,
            data: [],
            backgroundColor: color,
          },
        ],
      };

      data.forEach((d) => {
        dataToScatter.datasets[0].data.push({
          y: d[label],
          x: d[sorted_correlation[isFirst ? 0 : 1][0]],
        });
      });

      const config = {
        type,
        data: dataToScatter,
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: sorted_correlation[isFirst ? 0 : 1][0],
              },
            },
            y: {
              title: {
                display: true,
                text: label,
              },
            },
          },
        },
      };

      return <ChartComponent {...config} />;
    } else if (type === "radar") {
      const dataset = {
        labels: filteredColumns,
        datasets: [
          {
            label: "Radar dataset",
            data: Object.values(correlation),
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      };
      const config = {
        type: "radar",
        data: dataset,
        options: {
          elements: {
            line: {
              borderWidth: 3,
            },
          },
        },
      };

      return <ChartComponent {...config} />;
    } else if (type === "bar") {
      const data = {
        labels: filteredColumns,
        datasets: [
          {
            label: "Dataset",
            data: Object.values(correlation),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const config = {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      return <ChartComponent {...config} />;
    } else if (type === "bubble") {
      const data = {
        datasets: [
          {
            label: "First Dataset",
            data: [],
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      };

      const config = {
        type: "bubble",
        data: data,
        options: {},
      };

      return <BuildConfig {...config} />;
    }

    return null;
  }

  return <BuildConfig />;
}
