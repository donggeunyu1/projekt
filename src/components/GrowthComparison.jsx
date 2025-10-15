import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function GrowthComparison() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (let t = 0; t <= 10; t += 0.2) {
      tempData.push({
        time: t,
        linear: 1 + t / 2,          // lineær
        quadratic: 1 + Math.pow(t, 2) / 5,  // kvadratisk
        exponential: Math.exp(0.25 * t),    // eksponentiel
      });
    }
    setData(tempData);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">📈 Sammenligning af vækstkurver</h2>
      <div className="h-80 bg-gray-50 p-4 rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" label={{ value: "Tid (s)", position: "insideBottomRight" }} />
            <YAxis label={{ value: "Multiplier", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line type="monotone" dataKey="linear" stroke="#8884d8" strokeWidth={2} dot={false} name="Lineær" />
            <Line type="monotone" dataKey="quadratic" stroke="#82ca9d" strokeWidth={2} dot={false} name="Kvadratisk" />
            <Line type="monotone" dataKey="exponential" stroke="#ff7300" strokeWidth={2} dot={false} name="Eksponentiel" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-gray-700">
        Som du kan se: Eksponentiel (orange) starter langsomt men eksploderer hurtigt 🚀
      </p>
    </div>
  );
}
