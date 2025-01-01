
      // Chart.js Data and Configuration
      const ctx = document.getElementById("attendanceChart").getContext("2d");
      const attendanceChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "11.12.2024",
            "12.12.2024",
            "13.12.2024",
            "14.12.2024",
            "15.12.2024",
          ], // Dates
          datasets: [
            {
              label: "Attendance",
              data: [8, 7, 6, 9, 8], // Attendance values for each date
              backgroundColor: "#28a745", // Green for attendance
              borderColor: "#28a745",
              borderWidth: 1,
            },
            {
              label: "Absents",
              data: [2, 3, 4, 1, 2], // Absents values for each date
              backgroundColor: "#fd7e14", // Orange for absents
              borderColor: "#fd7e14",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: false,
                text: "Date",
              },
            },
            y: {
              beginAtZero: true,
              max: 10, // Y-axis max value
              title: {
                display: false,
                text: "Number of People",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ": " + context.raw;
                },
              },
            },
          },
        },
      });
    
      var ctx2 = document.getElementById("lineChart").getContext("2d");
      var attendanceChart2 = new Chart(ctx2, {
        type: "line", // Specifies a line chart
        data: {
          labels: [
            "11.12.2024",
            "12.12.2024",
            "13.12.2024",
            "14.12.2024",
            "15.12.2024",
            "16.12.2024",
          ], // X-axis labels (dates)
          datasets: [
            {
              label: "Attendance", // Label for Attendance dataset
              data: [8, 6, 9, 7, 8, 6], // Y-axis values for Attendance
              borderColor: "rgba(0, 123, 255, 1)", // Blue color for the Attendance line
              backgroundColor: "rgba(0, 123, 255, 0.2)", // Light blue fill color
              fill: true, // Fill the area under the line
              tension: 0.4, // Controls the curve of the line
            },
            {
              label: "Absents", // Label for Absents dataset
              data: [2, 4, 1, 3, 2, 4], // Y-axis values for Absents
              borderColor: "rgba(255, 99, 132, 1)", // Red color for the Absents line
              backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red fill color

              fill: true, // Fill the area under the line
              tension: 0.4, // Controls the curve of the line
            },
          ],
        },
        options: {
          responsive: true, // Ensures the chart is responsive
          scales: {
            y: {
              beginAtZero: true, // Starts the Y-axis from 0
              min: 0, // Minimum value on Y-axis
              max: 10, // Maximum value on Y-axis
            },
          },
          plugins: {
            legend: {
              position: "top", // Position the legend at the top
            },
          },
        },
      });
   
      document.addEventListener("DOMContentLoaded", function () {
        const circles = document.querySelectorAll(".progress-circle");

        circles.forEach((circle) => {
          const progress = parseInt(circle.getAttribute("data-progress"), 10);

          // Set the conic gradient based on the progress value
          const color = window
            .getComputedStyle(circle)
            .getPropertyValue("background-color");
          circle.style.background = `conic-gradient(
          #fff 0% ${progress}%, /* White arc for the progress */
          #83c683 ${progress}% 100% /* Background color */
        )`;

          // Update the text inside the circle
          const span = circle.querySelector("span");
          if (span) {
            span.textContent = `${progress}%`;
          }
        });
      });
   
      document.querySelectorAll(".progress-circle").forEach((circle) => {
        const color = circle.getAttribute("data-color");

        circle.style.setProperty("--circle-color", color);
      });
    
      const calendarBody = document.getElementById("calendarBody");
      const monthLabel = document.getElementById("monthLabel");
      const yearLabel = document.getElementById("yearLabel");

      let currentDate = new Date();

      function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthLabel.textContent = date.toLocaleString("default", {
          month: "long",
        });
        yearLabel.textContent = year;

        calendarBody.innerHTML = "";

        let day = 1;
        const startDay = (firstDay === 0 ? 7 : firstDay) - 1; // Adjust to make Monday the first day
        const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

        for (let i = 0; i < totalCells; i++) {
          const row = Math.floor(i / 7);
          if (!calendarBody.rows[row]) {
            calendarBody.insertRow();
          }

          const cell = calendarBody.rows[row].insertCell();

          if (i >= startDay && day <= daysInMonth) {
            cell.textContent = day;

            if (
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day
            ) {
              cell.classList.add("bg-today");
            }

            day++;
          } else {
            cell.textContent = "";
          }
        }
      }

      document.getElementById("prevMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
      });

      document.getElementById("nextMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
      });

      // Initial render
      renderCalendar(currentDate);
 
