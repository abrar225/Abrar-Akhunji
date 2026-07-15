import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function InteractiveChart({ config }) {
  if (!config) return null;

  const { title, description, type = 'bar', data = [], xKey = 'name', series = [] } = config;

  const renderChartType = () => {
    switch (type.toLowerCase()) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
            <XAxis 
              dataKey={xKey} 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'var(--color-elevated)', 
                borderColor: 'var(--color-line)', 
                color: 'var(--color-fg)', 
                borderRadius: '0.5rem' 
              }}
              itemStyle={{ color: 'var(--color-fg)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {series.map((s, idx) => (
              <Line 
                key={idx} 
                type="monotone" 
                dataKey={s.dataKey} 
                name={s.name} 
                stroke={s.color || 'var(--color-accent)'} 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
            <XAxis 
              dataKey={xKey} 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'var(--color-elevated)', 
                borderColor: 'var(--color-line)', 
                color: 'var(--color-fg)', 
                borderRadius: '0.5rem' 
              }}
              itemStyle={{ color: 'var(--color-fg)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {series.map((s, idx) => (
              <Area 
                key={idx} 
                type="monotone" 
                dataKey={s.dataKey} 
                name={s.name} 
                fill={s.color || 'var(--color-accent)'} 
                stroke={s.color || 'var(--color-accent)'} 
                fillOpacity={0.3} 
                strokeWidth={2} 
              />
            ))}
          </AreaChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
            <XAxis 
              dataKey={xKey} 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              stroke="var(--color-muted)" 
              tick={{ fill: 'var(--color-faint)', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'var(--color-elevated)', 
                borderColor: 'var(--color-line)', 
                color: 'var(--color-fg)', 
                borderRadius: '0.5rem' 
              }}
              itemStyle={{ color: 'var(--color-fg)' }}
              cursor={{ fill: 'var(--color-elevated)', opacity: 0.5 }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {series.map((s, idx) => (
              <Bar 
                key={idx} 
                dataKey={s.dataKey} 
                name={s.name} 
                fill={s.color || 'var(--color-accent)'} 
                radius={[4, 4, 0, 0]} 
              />
            ))}
          </BarChart>
        );
    }
  };

  return (
    <div className="bg-surface border border-line rounded-2xl p-6 my-8">
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-display text-fg mb-2">{title}</h3>}
          {description && <p className="text-muted font-body text-sm">{description}</p>}
        </div>
      )}
      <div className="w-full" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChartType()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
