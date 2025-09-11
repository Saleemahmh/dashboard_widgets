import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function ChartRenderer({ type, data }) {
    const legendPayload = data.map((item, i) => ({
    value: item.name,        // legend label
    type: "circle",          // icon shape
    color: item.color || COLORS[i % COLORS.length], // pick from JSON or fallback COLORS
    id: item.id || i,        // unique key
    payload: item            // attach full item
  }));
  switch (type) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend iconType='circle' payload={legendPayload}
              formatter={(value, entry) => (
                <span>{value}: {entry.payload.value}</span>
              )}/>
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    case "bar":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
             <Legend iconType='circle' payload={legendPayload}
              formatter={(value, entry) => (
                <span>{value}: {entry.payload.value}</span>
              )}/>
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      );
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
               innerRadius={50}
              outerRadius={80}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
             <Legend layout='vertical' align='right' iconType='circle' payload={legendPayload}
              formatter={(value, entry) => (
                <span>{value} ({entry.payload.value})</span>
              )}/>
        
          </PieChart>
        </ResponsiveContainer>
      );
    default:
      return <p className="text-gray-500">No chart available</p>;
  }
}