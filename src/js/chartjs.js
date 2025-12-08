import Chart from "https://esm.sh/chart.js/auto";
import "https://esm.sh/chartjs-adapter-date-fns";

const series = [
  { x: "NVDA", y: 29 },
  { x: "AAPL", y: 97 },
  { x: "MSFT", y: 86 },
  { x: "GOOGL", y: 74 },
  { x: "AMZN", y: 30 },
  { x: "META", y: 39 },
  { x: "TSLA", y: 15 },
  { x: "NFLX", y: 60 },
  { x: "AMD", y: 10 },
  { x: "JPM", y: 49 },
  { x: "BAC", y: 26 }
];

let graphique = new Chart(document.querySelector("canvas").getContext("2d"), {
  type: "bar",
  data: {
    datasets: [
      {
        label: "PROFIT",
        data: series,
        borderWidth: 1.5,
        tension: 0.2,
        pointRadius: 0,
        fill: true,
        borderColor: "rgba(255, 4, 0, 1)",
        backgroundColor: (ctx) => {
            const { ctx: c, chartArea } = ctx.chart;
            if (!chartArea) return;
            const g = c.createLinearGradient(
            30,
            chartArea.top,
            1,
            chartArea.bottom
          );
          g.addColorStop(0, "rgba(255, 4, 0, 0.49)");
          g.addColorStop(1, "rgba(0, 0, 0, 0)");
          return g;
        }
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: false,
        text: "test"
      },

    legend: { 
      display: false 
      }
    },

    scales: {
      x: {
        title: {
          display: false,
        },

        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          display: false,
        }
      },

      y: {
        type: "linear",

        title: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          display: false,
          maxTicksLimit: 3,
        },
      }
    }
  }
});


setInterval(() => {
for (let ds of graphique.data.datasets) {
for (let i = 0; i < ds.data.length; i++) {
const currentY = parseFloat(ds.data[i].y);
const random = Math.round(Math.random() * 2000 - 1000);
ds.data[i].y = Math.max(0, currentY + random);
}
}
graphique.update();
}, 100);
