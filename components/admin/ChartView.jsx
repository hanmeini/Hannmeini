'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Fungsi untuk memformat data dari Vercel API ke format yang bisa dibaca Recharts
const formatDataForChart = (apiData) => {
  if (!apiData || !apiData.data) return [];
  return apiData.data.map(item => ({
    name: new Date(item.x).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    visitors: item.visitors,
  }));
};

export default function VisitorsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();

        if (!response.ok) {
          // Jika API route kita mengembalikan error, tangkap di sini
          throw new Error(data.error || 'Failed to fetch analytics from server');
        }
        
        setChartData(formatDataForChart(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-gray-500">Loading chart data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '0.5rem',
          }}
        />
        <Bar dataKey="visitors" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}