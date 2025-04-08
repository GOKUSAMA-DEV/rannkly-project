import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import "./styles/review_chart.scss";

const COLORS = ["#137CFC", "#B0DFFE"];
export default function ReviewChart({ data, chartType, isHeight, respondedRef }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="overlay-text">
          <p className="month-text">{data[0].month}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="percent-val-text"
              style={{ color: entry.color }}
            >
              ● {entry.city} {entry.name} {entry.value}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const pieData = data.map((item) => ({
    name: item.city,
    value: item.responded - item.unresponded,
  }));
  return (
    <div className="parent-container">
      <div className="inner-container" ref={respondedRef}>
        <ResponsiveContainer width="100%" height={isHeight}>
          {chartType?.isBarChart ? (
            <BarChart data={data}>
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
              {/* <YAxis /> */}
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="center"
                content={({ payload }) => (
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "16px",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    {payload.map((entry, index) => (
                      <li
                        key={`item-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: 500,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            backgroundColor: entry.color,
                            borderRadius: "50%",
                            marginRight: 6,
                          }}
                        ></span>
                        {entry.value}
                      </li>
                    ))}
                  </ul>
                )}
              />

              <Bar
                dataKey="responded"
                stackId="a"
                fill="#137CFC"
                name="Responded"
                //   radius={[4, 4, 0, 0]}
                barSize={10}
              />
              <Bar
                dataKey="unresponded"
                stackId="a"
                fill="#B0DFFE"
                name="Unresponded"
                radius={[4, 4, 0, 0]}
                barSize={10}
              />
            </BarChart>
          ) : (
            ""
          )}
          {chartType.isLineChart ? (
            <LineChart width={200} height={isHeight} data={data}>
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
                dataKey="responded"
                stroke="#137CFC"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Responded"
              />
              <Line
                type="monotone"
                dataKey="unresponded"
                stroke="#B0DFFE"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Unresponded"
              />
            </LineChart>
          ) : (
            ""
          )}
          {chartType?.isPieChart ? (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value" // <- 'value' = responded count
                nameKey="name" // <- 'name' = city name
                cx="50%"
                cy="50%"
                outerRadius={70}
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
                // labelStyle={{ fontSize: "8px" }}
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
  );
}
