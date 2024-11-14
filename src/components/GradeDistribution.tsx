import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { range: '9-10', count: 45, color: '#22c55e' },
  { range: '7-8', count: 78, color: '#3b82f6' },
  { range: '5-6', count: 32, color: '#f59e0b' },
  { range: '0-4', count: 12, color: '#ef4444' },
];

const GradeDistribution = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="count"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value} μαθητές`,
              `Βαθμοί ${props.payload.range}`,
            ]}
          />
          <Legend
            formatter={(value, entry: any) => `Βαθμοί ${entry.payload.range}`}
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistribution;