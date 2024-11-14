import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Card from '../ui/Card';

const data = [
  { day: 'Δευ', utilization: 85 },
  { day: 'Τρι', utilization: 92 },
  { day: 'Τετ', utilization: 88 },
  { day: 'Πεμ', utilization: 90 },
  { day: 'Παρ', utilization: 82 },
];

const ScheduleAnalytics = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-white">Ανάλυση Χρήσης Πόρων</h3>
      
      <div className="h-[300px]">
        <ResponsiveBar
          data={data}
          keys={['utilization']}
          indexBy="day"
          margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#3b82f6']}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ημέρα',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Αξιοποίηση (%)',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          theme={{
            text: {
              fill: '#ffffff',
            },
            axis: {
              ticks: {
                text: {
                  fill: '#ffffff',
                },
                line: {
                  stroke: '#ffffff',
                },
              },
              legend: {
                text: {
                  fill: '#ffffff',
                },
              },
            },
            grid: {
              line: {
                stroke: '#2d3748',
              },
            },
            tooltip: {
              container: {
                background: '#1a1a2e',
                color: '#ffffff',
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
          <p className="text-2xl font-bold text-neon-primary">89%</p>
          <p className="text-sm text-gray-300">Μέση Αξιοποίηση</p>
        </div>
        <div className="text-center p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
          <p className="text-2xl font-bold text-neon-primary">65</p>
          <p className="text-sm text-gray-300">Σύνολο Μαθημάτων</p>
        </div>
        <div className="text-center p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
          <p className="text-2xl font-bold text-neon-primary">42</p>
          <p className="text-sm text-gray-300">Ώρες Διδασκαλίας</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAnalytics;