import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ labels, stats }) => {
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 220);
    gradientFill.addColorStop(0, 'rgba(98,226,148,0.8)');
    gradientFill.addColorStop(1, 'rgba(240,251,243,0.6)');

    return {
      labels: labels,
      datasets: [
        {
          label: 'Last 60 days trend',
          data: stats,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: '#5DCE8F',
          pointRadius: 0,
        },
      ],
    };
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default Graph;
