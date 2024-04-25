import Chart from 'chart.js/auto'; // Import Chart object from Chart.js
import React, { useState, useEffect, useRef } from 'react';

export function BarChart({ data, options }) {
  const [chartInstance, setChartInstance] = useState<any>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartInstance) {
      // Destroy the previous chart instance
      chartInstance.destroy();
    }
    // Create a new chart instance
    const newChartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options,
    });
    // Set the new chart instance using functional update
    setChartInstance((prevInstance) => newChartInstance);

    return () => {
      // Clean up by destroying the chart instance
      newChartInstance.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
}
