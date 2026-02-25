import React from 'react';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export interface RadarDataPoint {
  subject: string;
  value: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
  dataKey?: string;
  color?: string;
  height?: number;
}

export function RadarChart({ data, dataKey = 'value', color = '#008b50', height = 300 }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'var(--foreground)', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
        />
        <Radar 
          name="Competencias" 
          dataKey={dataKey} 
          stroke={color} 
          fill={color} 
          fillOpacity={0.5} 
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--foreground)'
          }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}

export function ComparisonRadarChart({ 
  data, 
  beforeKey = 'before', 
  afterKey = 'after',
  height = 300 
}: { 
  data: any[]; 
  beforeKey?: string; 
  afterKey?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'var(--foreground)', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
        />
        <Radar 
          name="Antes" 
          dataKey={beforeKey} 
          stroke="#cbd5e0" 
          fill="#cbd5e0" 
          fillOpacity={0.3} 
        />
        <Radar 
          name="Después" 
          dataKey={afterKey} 
          stroke="#008b50" 
          fill="#008b50" 
          fillOpacity={0.6} 
        />
        <Legend />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--foreground)'
          }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
