import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  // YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  // LineChart,
  // Line,
  // Legend,
  // PieChart,
  // Pie,
  // Cell,
} from "recharts";
import "./styles/online_chart.scss";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#A28AE5",
//   "#FF6384",
//   "#36A2EB",
//   "#FFCE56",
// ];
const data = [
  { city: "Gaziabad", code: "430123", rating: 95.4, date: "2025-04-01" },
  { city: "Noida", code: "201302", rating: 78.2, date: "2025-03-21" },
  { city: "Delhi", code: "110034", rating: 65.1, date: "2025-02-15" },
  { city: "Nagpur", code: "129012", rating: 91.8, date: "2025-01-10" },
  { city: "Lucknow", code: "129012", rating: 74.3, date: "2024-12-20" },
  { city: "Kanpur", code: "129012", rating: 82.6, date: "2024-11-11" },
  { city: "Raipur", code: "129012", rating: 83.1, date: "2024-10-25" },
  { city: "Kolkata", code: "129012", rating: 70.9, date: "2024-09-03" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="overlay-text">
        <p className="month-text">
          <strong>Oct 2024</strong>
        </p>
        <p className="percent-val-text">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// const pieData = data.map((item) => ({
//   name: item.city,
//   value: item.rating,
// }));

// const filterData = (range) => {
//   const now = new Date();

//   const filtered = data.filter((item) => {
//     const itemDate = new Date(item.date);

//     switch (range) {
//       case "Last 7 Days":
//         return itemDate >= new Date(new Date().setDate(now.getDate() - 7));
//       case "Last 30 Days":
//         return itemDate >= new Date(new Date().setDate(now.getDate() - 30));
//       case "Last 3 Months":
//         return itemDate >= new Date(new Date().setMonth(now.getMonth() - 3));
//       case "Yearly":
//         return (
//           itemDate >= new Date(new Date().setFullYear(now.getFullYear() - 1))
//         );
//       default:
//         return true;
//     }
//   });

//   return filtered;
// };

const OnlineRatingChart = () => {
  const chartRef = useRef();
  const [range, setRange] = useState("Last 30 Days");
  // const filteredData = filterData(range);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [mode, setMode] = useState("monthly");

  // const filteredData = data.filter((item) => {
  //   const itemDate = new Date(item.date);
  //   return (
  //     (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate)
  //   );
  // });
  const uniqueCities = [...new Set(data.map((d) => d.city))];
  const [selectedCities, setSelectedCities] = useState(uniqueCities);

  const handleCityChange = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const filteredData = data.filter((d) => selectedCities.includes(d.city));
  console.log(filteredData, "filterData filterData");

  // Through Buttons
  const preprocessGroupedData = (data) => {
    const grouped = {
      monthly: [],
      quarterly: [],
      yearly: [],
    };

    data.forEach((item) => {
      const date = new Date(item.date);

      const monthlyKey = format(date, "MMM yyyy");
      const quarterlyKey = `Q${
        Math.floor(date.getMonth() / 3) + 1
      } ${date.getFullYear()}`;
      const yearlyKey = date.getFullYear().toString();

      grouped.monthly.push({ ...item, period: monthlyKey });
      grouped.quarterly.push({ ...item, period: quarterlyKey });
      grouped.yearly.push({ ...item, period: yearlyKey });
    });

    return grouped;
  };

  const groupedData = useMemo(() => preprocessGroupedData(data), []);
  const fullFiltered = useMemo(() => {
    return groupedData[mode].filter((item) => {
      const itemDate = new Date(item.date);
      return (
        selectedCities.includes(item.city) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
  }, [groupedData, mode, selectedCities, startDate, endDate]);

  console.log(fullFiltered, "fullFiltered fullFiltered");

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape", // or "portrait"
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("online_rating_chart.pdf");
  };
  //   const header = "City,Rating,Date\n";
  // const rows = data.map(row => `${row.city},${row.rating},${row.date}`).join("\n");

  const downloadCSV = () => {
    if (!data || data.length === 0) return;

    const header = Object.keys(data[0]).join(",") + "\n";
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`) // wrap values in quotes in case they contain commas
          .join(",")
      )
      .join("\n");

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "online_rating_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="parent-container">
      {/* <button onClick={handleDownloadPDF} className="download-btn">
        Download PDF
      </button>
      <button onClick={downloadCSV} className="download-btn">
        Download CSV
      </button> */}
      <div className="inner-container" ref={chartRef}>
        {/* <div className="flex justify-between items-center mb-4">
          <p className="main-title">
            Online Rating Index
          </p>
          <div className="flex gap-2 text-gray-500 text-sm">
            <button className="text-purple-600 font-medium">Monthly</button>
            <button>Quarterly</button>
            <button>Yearly</button>
          </div>
        </div>
        <h3>Filter by City</h3>
        <div>
          {uniqueCities.map((city) => (
            <label key={city} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => handleCityChange(city)}
              />
              {city}
            </label>
          ))}
        </div>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Yearly">Yearly</option>
        </select>

        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable
          dateFormat="yyyy-MM-dd"
        />
        <div>
          {["monthly", "quarterly", "yearly"].map((m) => (
            <button key={m} onClick={() => setMode(m)}>
              {m}
            </button>
          ))}
        </div> */}

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              tick={({ x, y, payload, index }) => {
                // const city = payload.value;
                const city = filteredData[index].city;
                const code = filteredData[index].code;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text textAnchor="middle" fill="#666" fontSize={9}>
                      <tspan x={0} dy="1em">
                        {city}
                      </tspan>
                      <tspan style={{marginTop: "3px"  }} x={0} dy="1.2em" fill="#999" fontSize={6}>
                        ({code})
                      </tspan>
                    </text>
                  </g>
                );
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="rating"
              fill="#f4a261"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </BarChart>
          {/* <LineChart width={700} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="city"
              tick={({ x, y, payload, index }) => {
                const city = payload.value;
                const code = data[index].code;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text textAnchor="middle" fill="#666" fontSize={14}>
                      <tspan x={0} dy="1em">
                        {city}
                      </tspan>
                      <tspan x={0} dy="1.2em" fill="#999" fontSize={10}>
                        ({code})
                      </tspan>
                    </text>
                  </g>
                );
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart> */}

          {/* <PieChart width={500} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name} (${value}%)`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart> */}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OnlineRatingChart;
