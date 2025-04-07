import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles/review_chart.scss";

const data = [
  {
    city: "Gaziabad",
    pincode: "430123",
    responded: 800,
    unresponded: 200,
    month: "Oct 2024",
  },
  {
    city: "Noida",
    pincode: "201302",
    responded: 850,
    unresponded: 150,
    month: "Oct 2024",
  },
  {
    city: "Delhi",
    pincode: "110034",
    responded: 800,
    unresponded: 200,
    month: "Oct 2024",
  },
  {
    city: "Nagpur",
    pincode: "129012",
    responded: 780,
    unresponded: 220,
    month: "Oct 2024",
  },
  {
    city: "Lucknow",
    pincode: "129012",
    responded: 820,
    unresponded: 180,
    month: "Oct 2024",
  },
  {
    city: "Indore",
    pincode: "125001",
    responded: 900,
    unresponded: 100,
    month: "Oct 2024",
  },
];

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
            ● {entry.name} {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
// const renderCustomXAxis = ({ x, y, payload }) => {
//   const { city, pincode } = data[payload.index];
//   return (
//     <g transform={`translate(${x},${y + 10})`}>
//       <text x={0} y={0} dy={10} textAnchor="middle" fill="#333" fontSize={9}>
//         {city}
//       </text>
//       <text x={0} y={15} dy={10} textAnchor="middle" fill="#888" fontSize={10}>
//         ({pincode})
//       </text>
//     </g>
//   );
// };

export default function ReviewChart() {
  return (
    <div className="parent-container">
      {/* <h2 className="text-lg font-semibold mb-2">
        Responded & Unresponded Reviews
      </h2> */}
      <div className="inner-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              tick={({ x, y, payload, index }) => {
                // const city = payload.value;
                const city = data[index].city;
                const code = data[index].pincode;
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
                    marginBottom: "10px"
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}
