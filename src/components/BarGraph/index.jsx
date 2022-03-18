import React, { useEffect, useState, memo } from "react";
import { groupBy } from "lodash";
import moment from "moment";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomLabel from "./components/CustomLabel";
import { formatPopulation, COLORS, MONTHS } from "../../helpers/utils";

const BarGraph = ({ data }) => {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const newData = [];
    const grouped = groupBy(data, (result) =>
      moment(new Date(result.date), "DD/MM/YYYY").format("MMM")
    );
    for (let key in grouped) {
      grouped[key] = grouped[key].reduce((a, b) => a + b.revenue, 0);
      newData.push({ name: key, value: +grouped[key].toFixed(2) });
    }
    newData.sort((a, b) => {
      return MONTHS.indexOf(a.name) - MONTHS.indexOf(b.name);
    });
    setGraphData(newData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        width={900}
        height={400}
        data={graphData}
        margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
      >
        <XAxis dataKey="name" fontFamily="sans-serif" dy="25" />
        <YAxis
          style={{
            fontSize: "0.7rem",
          }}
          tickFormatter={(value) => formatPopulation(value)}
        />
        <CartesianGrid vertical={false} stroke="#ebf3f0" />
        <Bar
          dataKey="value"
          barSize={50}
          fontFamily="sans-serif"
          label={<CustomLabel />}
        >
          {graphData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        <Tooltip cursor={{ fill: "transparent" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(BarGraph);
