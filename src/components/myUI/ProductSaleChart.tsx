// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "2025-08-11",
//     quantity: 5,
//   },
//   {
//     name: "2025-08-12",
//     quantity: 10,
//   },
//   {
//     name: "2025-08-13",
//     quantity: 4,
//   },
// ];

// export default function ProductSaleChart({
//   chartData,
// }: {
//   chartData: { date: string; quantity: number }[];
// }) {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         width={500}
//         height={300}
//         data={chartData}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="quantity"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProductSaleChart({
  chartData,
}: {
  chartData: { date: string; quantity: number }[];
}) {

 const myMap = new Map();

  // console.log("chartdata :::: ", chartData);

  chartData?.forEach(({date, quantity}) => {
    if(!myMap.has(date)) {
      myMap.set(date, {date, quantity : 0})
    }
    myMap.get(date).quantity += quantity;
  })

  const mergeredChartData = Array.from(myMap.values())

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 shadow-lg rounded">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Date: {label}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Quantity: {payload[0].value} units
          </p>
        </div>
      );
    }
    return null;
  };

  // Handle empty data
  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            No sales data available
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            Sales data will appear here once recorded
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mergeredChartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            className="dark:stroke-gray-600"
          />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            angle={0}
            height={60}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ 
              fill: '#3b82f6', 
              strokeWidth: 2, 
              r: 4 
            }}
            activeDot={{ 
              r: 6, 
              fill: '#1d4ed8',
              stroke: '#ffffff',
              strokeWidth: 2
            }}
            name="Sales Quantity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}