// import React from "react";
// import Chart from "react-apexcharts";

// const RatingChart = () => {
//   const options = {
//     chart: {
//       type: "bar",
//       height: 350,
//       toolbar: {
//         show: false, // Hide the top-right menu
//       },
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "45%",
//         distributed: true, // Different colors for bars
//         dataLabels: {
//           position: "top", // Labels above bars
//         },
//       },
//     },
//     colors: ["#f4a261"], // Bar colors
//     dataLabels: {
//       enabled: true,
//       style: {
//         fontSize: "12px",
//         colors: ["#fff"],
//       },
//       background: {
//         enabled: true,
//         foreColor: "#fff",
//         borderRadius: 2,
//         padding: 5,
//       },
//       formatter: (val) => val.toFixed(2), // Format data labels
//     },
//     xaxis: {
//       categories: [
//         ["Gaziabad", "(430123)"],
//         ["Noida", "(201302)"],
//         ["Delhi", "(110034)"],
//         ["Nagpur", "(129012)"],
//         ["Lucknow", "(129012)"],
//         ["Kanpur", "(129012)"],
//         ["Raipur", "(129012)"],
//         ["Kolkata", "(129012)"],
//       ],
//       labels: {
//         style: {
//           fontSize: "14px",
//           fontWeight: "bold",
//           colors: ["#333"], // Darker color for city names
//         },
//       },
//     },
//     annotations: {
//       xaxis: [
//         {
//           x: 0, // Align line with labels
//           borderColor: "#333",
//           strokeDashArray: 3,
//           label: {
//             text: "",
//             style: {
//               color: "#333",
//               fontSize: "14px",
//             },
//           },
//         },
//       ],
//     },
//     tooltip: {
//       enabled: true,
//       y: {
//         formatter: (val) => `${val.toFixed(2)}%`,
//       },
//     },
//   };

//   const series = [
//     {
//       name: "Rating",
//       data: [95.4, 80.2, 60.5, 90.1, 70.3, 85.0, 78.9, 65.4], // Data for each city
//     },
//   ];

//   return (
//     <div>
//       <h3>Online Rating Index</h3>
//       <Chart options={options} series={series} type="bar" height={350} />
//     </div>
//   );
// };

// export default RatingChart;

import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const RatingChart = () => {
  const [width, setWidth] = useState(700); 

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        dataLabels: { position: "top" },
      },
    },
    colors: ["#f4a261"],
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#fff"] },
      background: { enabled: true, foreColor: "#fff", borderRadius: 2, padding: 5 },
      formatter: (val) => val.toFixed(2),
    },
    xaxis: {
      categories: [
        ["Gaziabad", "(430123)"],
        ["Noida", "(201302)"],
        ["Delhi", "(110034)"],
        ["Nagpur", "(129012)"],
        ["Lucknow", "(129012)"],
        ["Kanpur", "(129012)"],
        ["Raipur", "(129012)"],
        ["Kolkata", "(129012)"],
      ],
      labels: {
        style: { fontSize: "14px", fontWeight: "bold", colors: ["#333"] },
      },
      
    },
    annotations: {
      xaxis: [
        {
          x: 0,
          borderColor: "#333",
          strokeDashArray: 3,
          label: { text: "", style: { color: "#333", fontSize: "14px" } },
        },
      ],
    },
    legend: {
      show: false, 
    },
    yaxis: {
      show: false, 
    },
    grid: {
      show: false, 
    },
    tooltip: { enabled: true, y: { formatter: (val) => `${val.toFixed(2)}%` } },
  };

  const series = [{ name: "Rating", data: [95.4, 80.2, 60.5, 90.1, 70.3, 85.0, 78.9, 65.4] }];

  return (
    <div>
      <h3>Online Rating Index</h3>
      <ResizableBox
        width={width}
        height={400}
        axis="x"
        minConstraints={[400, 400]} 
        maxConstraints={[1200, 400]}
        onResizeStop={(e, { size }) => setWidth(size.width)}
      >
        <Chart options={options} series={series} type="bar" width={width} height={350} />
      </ResizableBox>
    </div>
  );
};

export default RatingChart;
