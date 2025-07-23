import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

const Analytics = () => {
  const [invoices, setInvoices] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [outstanding, setOutstanding] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('invoices')) || [];
    setInvoices(stored);

    let revenue = 0;
    let due = 0;
    const monthly = {};
    const statuses = { Paid: 0, Unpaid: 0, 'Partially Paid': 0 };

    stored.forEach(inv => {
      const amt = inv.total || 0;
      if (inv.status === 'Paid') {
        revenue += amt;
      } else {
        due += amt;
      }
      statuses[inv.status] = (statuses[inv.status] || 0) + 1;

      if (inv.status === 'Paid' && inv.invoiceDate) {
        const date = new Date(inv.invoiceDate);
        const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        monthly[key] = (monthly[key] || 0) + amt;
      }
    });

    setTotalRevenue(revenue);
    setOutstanding(due);
    setMonthlyRevenue(
      Object.entries(monthly).map(([month, revenue]) => ({ month, revenue }))
    );
    setStatusCounts(
      Object.entries(statuses).map(([status, count]) => ({ name: status, value: count }))
    );
  }, []);

  return (
    <div className='w-full bg-gray-50 min-h-screen pt-8'>
        <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">📊 Invoice Analytics</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-semibold text-green-600">₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Outstanding Balance</h3>
          <p className="text-2xl font-semibold text-red-500">₦{outstanding.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-medium mb-4">Invoice Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Analytics;
