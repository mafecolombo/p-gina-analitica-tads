import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; 

Chart.register(...registerables); 

function StarChart({ data, groupBy, viewType }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line', 
        data: {
          labels: data.map((item) => item.date),
          datasets: [
            {
              label: viewType === 'cumulative' ? 'Estrelas Cumulativas' : 'Estrelas por Período',
              data: data.map((item) => item.stars), 
              borderColor: 'rgba(75,192,192,1)', 
              backgroundColor: 'rgba(75,192,192,0.2)', 
              fill: false, 
            },
          ],
        },
        options: {
          responsive: true, 
          scales: {
            x: {
              type: 'time',
              time: {
                unit: groupBy, 
              },
              title: {
                display: true,
                text: 'Data', 
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Estrelas', 
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, groupBy, viewType]);

  return <canvas ref={chartRef} />; 
}

export default StarChart;
