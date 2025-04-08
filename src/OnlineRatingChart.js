import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./styles/online_chart.scss";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28AE5",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
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

const OnlineRatingChart = ({ isHeight, data, chartType, chartRef }) => {
  const pieData = data.map((item) => ({
    name: item.city,
    value: item.rating,
  }));

  return (
    <>
      <div className="parent-container">
        {/* <button onClick={handleDownloadPDF} className="download-btn">
        Download PDF
      </button>
      <button onClick={downloadCSV} className="download-btn">
        Download CSV
      </button> */}
        <div className="inner-container" ref={chartRef}>
          {/* <div className="flex justify-between items-center mb-4">
            <p className="main-title">Online Rating Index</p>
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
          <div>
            {["monthly", "quarterly", "yearly"].map((m) => (
              <button key={m} onClick={() => setMode(m)}>
                {m}
              </button>
            ))}
          </div> */}

          {/* <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable
          dateFormat="yyyy-MM-dd"
        /> */}

          <ResponsiveContainer width="100%" height={isHeight}>
            {chartType?.isBarChart ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="period"
                  tick={({ x, y, payload, index }) => {
                    // const city = payload.value;
                    const city = data[index].city;
                    const code = data[index].code;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text textAnchor="middle" fill="#666" fontSize={9}>
                          <tspan x={0} dy="1em">
                            {city}
                          </tspan>
                          <tspan
                            style={{ marginTop: "3px" }}
                            x={0}
                            dy="1.2em"
                            fill="#999"
                            fontSize={6}
                          >
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
            ) : (
              ""
            )}

            {chartType?.isLineChart ? (
              <LineChart height={isHeight} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tick={({ x, y, payload, index }) => {
                    // const city = payload.value;
                    const city = data[index].city;
                    const code = data[index].code;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text textAnchor="middle" fill="#666" fontSize={9}>
                          <tspan x={0} dy="1em">
                            {city}
                          </tspan>
                          <tspan
                            style={{ marginTop: "3px" }}
                            x={0}
                            dy="1.2em"
                            fill="#999"
                            fontSize={6}
                          >
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
              </LineChart>
            ) : (
              ""
            )}

            {chartType?.isPieChart ? (
              <PieChart width={250} height={isHeight}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  // label={({ name, percent, x, y }) => (
                  //   <text
                  //     x={x}
                  //     y={y}
                  //     textAnchor="middle"
                  //     dominantBaseline="central"
                  //     style={{ fontSize: "10px" }}
                  //   >
                  //     {`${name} (${(percent * 100).toFixed(1)}%)`}
                  //   </text>
                  // )}
                  // labelLine={false}
                  // labelStyle={{ fontSize: "8px" }} // This doesn't work directly, use below approach
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  wrapperStyle={{
                    fontSize: "12px", // 👈 Reduce legend font size here
                  }}
                />
              </PieChart>
            ) : (
              ""
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default OnlineRatingChart;
