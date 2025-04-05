import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles/review_chart.scss";

const data = [
  {
    city: "Gaziabad ",
    pincode: "(430123)",
    Positive: 200,
    Negative: 50,
    Neutral: 80,
    Mixed: 30,
  },
  {
    city: "Noida ",
    pincode: "(201302)",
    Positive: 150,
    Negative: 99,
    Neutral: 87,
    Mixed: 109,
  },
  {
    city: "Delhi ",
    pincode: "(110034)",
    Positive: 100,
    Negative: 60,
    Neutral: 87,
    Mixed: 40,
  },
  {
    city: "Nagpur ",
    pincode: "(129012)",
    Positive: 300,
    Negative: 99,
    Neutral: 87,
    Mixed: 109,
  },
  {
    city: "Lucknow ",
    pincode: "(129012)",
    Positive: 200,
    Negative: 70,
    Neutral: 100,
    Mixed: 90,
  },
  {
    city: "Indore ",
    pincode: "(125001)",
    Positive: 250,
    Negative: 65,
    Neutral: 120,
    Mixed: 85,
  },
];

const COLORS = {
  Positive: "#f59e2c",
  Negative: "#5b6ee1",
  Neutral: "#f4769e",
  Mixed: "#6cc47f",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="overlay-text">
        <p className="month-text">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="percent-val-text"
            style={{ color: entry.color || entry.fill }}
          >
            ● {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const NetPromoter = () => {
  return (
    <div className="parent-container">
      {/* <h2 className="text-lg font-semibold mb-2">
        Sentiment Distribution by City
      </h2> */}
      <div className="inner-container">
        <ResponsiveContainer width="127%" height={250}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={false} axisLine={false} />
            <YAxis
              dataKey="city"
              type="category"
              tick={({ x, y, payload, index }) => {
                const city = data[index].city;
                const pincode = data[index].pincode;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={-4}
                      textAnchor="end"
                      fill="#374151"
                      fontSize={9}
                    >
                      {city}
                    </text>
                    <text
                      x={0}
                      y={0}
                      dy={12}
                      textAnchor="end"
                      fill="#6b7280" // Tailwind gray-500
                      fontSize={7}
                    >
                      {pincode}
                    </text>
                  </g>
                );
              }}
            />

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
                        color: "#9FA1A2",
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
              dataKey="Positive"
              stackId="a"
              fill={COLORS.Positive}
              name="Positive"
              barSize={10}
            />
            <Bar
              dataKey="Negative"
              stackId="a"
              fill={COLORS.Negative}
              name="Negative"
              barSize={10}
            />
            <Bar
              dataKey="Neutral"
              stackId="a"
              fill={COLORS.Neutral}
              name="Neutral"
              barSize={10}
            />
            <Bar dataKey="Mixed" stackId="a" fill={COLORS.Mixed} name="Mixed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetPromoter;
