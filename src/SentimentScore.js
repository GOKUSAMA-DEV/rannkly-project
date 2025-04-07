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
    Positive: 200,
    Negative: 50,
    Neutral: 80,
    Mixed: 30,
    pincode: "430123",
  },
  {
    city: "Noida",
    Positive: 150,
    Negative: 99,
    Neutral: 87,
    Mixed: 109,
    pincode: "201302",
  },
  {
    city: "Delhi",
    Positive: 100,
    Negative: 60,
    Neutral: 87,
    Mixed: 40,
    pincode: "110034",
  },
  {
    city: "Nagpur",
    Positive: 90,
    Negative: 99,
    Neutral: 87,
    Mixed: 109,
    pincode: "129012",
  },
  {
    city: "Lucknow",
    Positive: 200,
    Negative: 70,
    Neutral: 100,
    Mixed: 90,
    pincode: "129012",
  },
  {
    city: "Indore",
    Positive: 250,
    Negative: 65,
    Neutral: 120,
    Mixed: 85,
    pincode: "125001",
  },
];

const COLORS = {
  Positive: "#42c88e",
  Negative: "#e67c9f",
  Neutral: "#f4c542",
  Mixed: "#f59e2c",
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

const SentimentScore = () => {
  return (
    <div className="parent-container">
      {/* <h2 className="text-lg font-semibold mb-2">Sentiment Scores by City</h2> */}
      <div className="inner-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="city"
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
            <Bar
              dataKey="Mixed"
              stackId="a"
              fill={COLORS.Mixed}
              name="Mixed"
              barSize={10}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentScore;
