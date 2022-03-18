import React, { useEffect, useState, memo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { groupBy } from "lodash";
import { formatPopulation, COLORS } from "../helpers/utils";

const PieChartComponent = ({ data }) => {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const grouped = groupBy(data, (x) => x.seller);
    const newData = [];
    for (let key in grouped) {
      grouped[key] = grouped[key].reduce((a, b) => a + b.revenue, 0);
      newData.push({ name: key, value: +grouped[key].toFixed(2) });
    }
    setGraphData(newData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={graphData}
          cx="50%"
          cy="50%"
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
          outerRadius={200}
          innerRadius={35}
          startAngle={90}
          endAngle={450}
          label={(x) => {
            return `${x.name}-${formatPopulation(x.value)}`;
          }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry}_${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default memo(PieChartComponent);
