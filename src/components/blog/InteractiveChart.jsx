import { useId, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['var(--color-accent)', 'var(--color-fg)', 'var(--color-muted)', 'var(--color-accent-soft)'];
export default function InteractiveChart({ config }) {
  const [hidden, setHidden] = useState(new Set());
  const reduced = useReducedMotion(), id = useId();
  if (!config) return null;
  const { title, description, type = 'bar', data = [], xKey = 'name', series = [] } = config;
  const visible = series.filter(item => !hidden.has(item.dataKey));
  const Chart = type.toLowerCase() === 'line' ? LineChart : type.toLowerCase() === 'area' ? AreaChart : BarChart;
  function toggle(key) { setHidden(current => { const next = new Set(current); if (next.has(key)) next.delete(key); else next.add(key); return next; }); }
  return <section className="interactive-chart" aria-label={title || 'Interactive chart'}>
    <header>{title && <h3 id={id}>{title}</h3>}{description && <p>{description}</p>}</header>
    <div className="chart-series" role="group" aria-label="Visible chart series">{series.map((item, index) => <button type="button" key={item.dataKey} aria-pressed={!hidden.has(item.dataKey)} onClick={() => toggle(item.dataKey)}><i style={{ backgroundColor: COLORS[index % COLORS.length] }} aria-hidden="true"/>{item.name || item.dataKey}</button>)}</div>
    <p className="chart-help">Select a series to show or hide it. Focus the chart and use the arrow keys to inspect values.</p>
    {visible.length ? <div className="chart-surface"><ResponsiveContainer width="100%" height="100%"><Chart data={data} accessibilityLayer aria-label={title || 'Data chart'} margin={{ top: 14, right: 16, left: -14, bottom: 8 }}>
      <CartesianGrid strokeDasharray="3 5" stroke="var(--color-line)" vertical={false}/>
      <XAxis dataKey={xKey} stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={16}/>
      <YAxis stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
      <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-line)', color: 'var(--color-fg)', borderRadius: 6, fontSize: 12 }} itemStyle={{ color: 'var(--color-fg)' }} cursor={type === 'bar' ? { fill: 'var(--color-accent)', opacity: .06 } : undefined}/>
      {visible.map(item => { const index = series.indexOf(item), color = COLORS[index % COLORS.length], common = { dataKey: item.dataKey, name: item.name || item.dataKey, isAnimationActive: !reduced, animationDuration: 450 };
        return type.toLowerCase() === 'line' ? <Line key={item.dataKey} {...common} type="monotone" stroke={color} strokeWidth={2.5} strokeDasharray={index % 2 ? '6 3' : undefined} dot={{ r: 3 }} activeDot={{ r: 5 }}/>
          : type.toLowerCase() === 'area' ? <Area key={item.dataKey} {...common} type="monotone" fill={color} stroke={color} fillOpacity={.12} strokeWidth={2} strokeDasharray={index % 2 ? '6 3' : undefined}/>
          : <Bar key={item.dataKey} {...common} fill={color} radius={[3,3,0,0]}/>;
      })}
    </Chart></ResponsiveContainer></div> : <div className="chart-empty" role="status">Choose a series above to plot its values.</div>}
    <details className="chart-data"><summary>Read the chart data</summary><div tabIndex={0} role="region" aria-label="Scrollable chart dataset"><table><caption>Full dataset{title ? `: ${title}` : ''}</caption><thead><tr><th scope="col">{config.xLabel || xKey}</th>{series.map(item => <th scope="col" key={item.dataKey}>{item.name || item.dataKey}</th>)}</tr></thead><tbody>{data.map((row,index) => <tr key={index}><th scope="row">{String(row[xKey] ?? '')}</th>{series.map(item => <td key={item.dataKey}>{row[item.dataKey] == null ? 'Unavailable' : String(row[item.dataKey])}</td>)}</tr>)}</tbody></table></div></details>
  </section>;
}
