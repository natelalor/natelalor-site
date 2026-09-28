// JS file to facilitate graph creation, axis implementation, and data visualization as simply as possible

const GOALS = [
  // { name: "", status: "not-done" },
  { name: "Redesign & ship updated website - natelalor.com", status: "done", date: "2026-09-16" },
  { name: "Mandarin - possessive pronouns", status: "done", date: "2026-09-10" },
  { name: "Ceramics Workshop - Bowl Making", status: "done", date: "2026-09-04" },
  { name: "Learn a new song on guitar (Old Ties and Companions - Watchhouse)", status: "done", date: "2026-06-12" }, 
  { name: "Bake a *perfect* sourdough loaf", status: "done", date: "2026-02-26" },
  { name: "Google Data Certification", status: "done", date: "2026-02-13" },
  { name: "Bench 110 lbs", status: "done", date: "2025-08-24" },
  { name: "Start new IT Analyst job", status: "done", date: "2024-09-28" },
  { name: "Run 10 miles", status: "done", date: "2024-10-16" },
  { name: "Moved to Boston", status: "done", date: "2024-08-28" },

  { name: "Take Final Exam for DP-600 Microsoft Fabric Certification", status: "not-done" },
  { name: "Ship an EdTech data project end-to-end", status: "not-done" },
  { name: "Run a half-marathon", status: "not-done" },
  { name: "Learn a Steve Lacy song on Guitar (\"nothing\")", status: "not-done" },
  { name: "Bench 135 lbs", status: "not-done" },
  { name: "New Medium article about convenience", status: "not-done" },
  { name: "Buy an electric guitar - learn another Steve Lacy song (\"doom\")", status: "not-done" },
  { name: "Construct new Instagram account with specific vibe", status: "not-done" },
  { name: "Run a marathon", status: "not-done" },
  { name: "Produce a song + upload to Spotify", status: "not-done" }
];
// ============================================================

const ACCENT = "#e8a93d";
const POINT_COLOR = "#262019";

// this part is for the cumulative "goals completed over time" feature
// Points sit at their actual date on the x-axis, so
// gaps between completions are shown accurately, not evenly spaced
const done = GOALS
  .filter(g => g.status === "done")
  .sort((a, b) => new Date(a.date) - new Date(b.date));

let running = 0;
const points = done.map(g => {
  running += 1;
  return { x: g.date, y: running, name: g.name };
});

document.getElementById("tally").textContent = `${done.length} completed`;

new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    datasets: [{
      data: points,
      borderColor: ACCENT,
      borderWidth: 2.5,
      tension: 0.35,
      fill: true,
      backgroundColor: (ctx) => {
        const { chart } = ctx;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return "rgba(232,169,61,0.08)";
        const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(232,169,61,0.22)");
        gradient.addColorStop(1, "rgba(232,169,61,0)");
        return gradient;
      },
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: POINT_COLOR,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: "easeOutQuart" },
    scales: {
      x: {
        type: "time",
        time: { unit: "month" },
        grid: { display: false },
        ticks: { color: "#7a7268", font: { family: "Roboto", size: 11 } },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#7a7268", font: { family: "Roboto", size: 11 } },
        grid: { color: "rgba(38,32,25,0.06)" },
        title: { display: true, text: "Goals completed", color: "#7a7268", font: { size: 12 } },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#262019",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          title: (items) => items[0].raw.name,
          label: (item) => new Date(item.raw.x).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        }
      }
    }
  }
});

// Master list: "Completed"
const completedEl = document.getElementById("completedList");
done.slice().reverse().forEach(g => { // most recent first
  const formatted = new Date(g.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  completedEl.insertAdjacentHTML("beforeend", `
    <li><span class="goal-name">&#10003; ${g.name}</span><span class="goal-date">${formatted}</span></li>
  `);
});

// Master list: "Working On It"
const notDoneEl = document.getElementById("notDoneList");
GOALS.filter(g => g.status === "not-done").forEach(g => {
  notDoneEl.insertAdjacentHTML("beforeend", `
    <li><span class="goal-name">${g.name}</span></li>
  `);
});
