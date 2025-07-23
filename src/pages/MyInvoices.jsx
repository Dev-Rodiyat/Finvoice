import React, { useEffect, useState } from 'react';
import { FiSearch, FiX, FiPrinter, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [invoiceDateFilter, setInvoiceDateFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('invoices')) || [];
    setInvoices(stored);
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.billTo.toLowerCase().includes(search.toLowerCase()) ||
      invoice.billFrom.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    const matchesDate = invoiceDateFilter
      ? invoice.invoiceDate === invoiceDateFilter
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
    if (!confirmDelete) return;

    const updated = [...invoices];
    updated.splice(index, 1);
    setInvoices(updated);
    localStorage.setItem('invoices', JSON.stringify(updated));
    toast.success('Invoice deleted successfully!')
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const tableRows = filteredInvoices.map((inv) => `
      <tr>
        <td>${inv.invoiceDate || '-'}</td>
        <td>${inv.billFrom || '-'}</td>
        <td>${inv.billTo || '-'}</td>
        <td>₦${(inv.total || 0).toLocaleString()}</td>
        <td>${inv.status}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoices</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2>Invoice List</h2>
          <table>
            <thead>
              <tr>
                <th>Invoice Date</th>
                <th>Bill From</th>
                <th>Bill To</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#1A73E8] mb-4">My Invoices</h2>

        <div className="flex w-full justify-between flex-wrap gap-2 mb-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Bill To / Bill From"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-800"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={invoiceDateFilter}
              onChange={(e) => setInvoiceDateFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Clear Filters */}
            {(search || statusFilter || invoiceDateFilter) && (
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('');
                  setInvoiceDateFilter('');
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="py-1 px-4 max-h-[35px] rounded-md hover:bg-blue-600 bg-blue-500 text-white flex items-center gap-2"
            title="Print Invoices"
          >
            <FiPrinter className="w-4 h-4" />
            Print Sheet
          </button>
        </div>

        {/* Table */}
        {filteredInvoices.length === 0 ? (
          <p className="text-gray-600 text-center">No invoices found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-3">Invoice Date</th>
                  <th className="px-4 py-3">Bill From</th>
                  <th className="px-4 py-3">Bill To</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{inv.invoiceDate || '-'}</td>
                    <td className="px-4 py-3">{inv.billFrom || '-'}</td>
                    <td className="px-4 py-3">{inv.billTo || '-'}</td>
                    <td className="px-4 py-3 text-right">₦{(inv.total || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inv.status === 'Paid' ? 'bg-green-100 text-green-700'
                        : inv.status === 'Unpaid' ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/invoice/${idx}`)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 className="inline w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInvoices;
