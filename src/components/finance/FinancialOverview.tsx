import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Card from '../ui/Card';

const data = [
  {
    id: 'income',
    data: [
      { x: 'Ιαν', y: 24500 },
      { x: 'Φεβ', y: 25800 },
      { x: 'Μαρ', y: 27200 },
      { x: 'Απρ', y: 26500 },
      { x: 'Μαϊ', y: 28500 },
      { x: 'Ιουν', y: 29800 },
    ],
  },
  {
    id: 'expenses',
    data: [
      { x: 'Ιαν', y: 18000 },
      { x: 'Φεβ', y: 17500 },
      { x: 'Μαρ', y: 19000 },
      { x: 'Απρ', y: 18500 },
      { x: 'Μαϊ', y: 19500 },
      { x: 'Ιουν', y: 20000 },
    ],
  },
];

const FinancialOverview = () => {
  return (
    <Card title="Οικονομική Επισκόπηση">
      <div className="h-[300px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Μήνας',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ποσό (€)',
            legendOffset: -40,
            legendPosition: 'middle',
            format: value => `${value}€`
          }}
          enableGridX={true}
          enableGridY={true}
          enablePoints={true}
          enablePointLabel={true}
          pointLabel="y"
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={false}
          areaOpacity={0.15}
          areaBlendMode="multiply"
          areaBaselineValue={0}
          lineWidth={2}
          enableCrosshair={true}
          crosshairType="x"
          isInteractive={true}
          debugMesh={false}
          colors={{ scheme: 'nivo' }}
          role="application"
          layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']}
          defs={[]}
          fill={[]}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
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
            legends: {
              text: {
                fill: '#ffffff',
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
    </Card>
  );
};

export default FinancialOverview;