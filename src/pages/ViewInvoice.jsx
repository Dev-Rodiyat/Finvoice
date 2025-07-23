import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { FiArrowLeft } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaPencil } from 'react-icons/fa6';
import { sendInvoiceEmail } from '../utils/email';

const ViewInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const previewRef = useRef();
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('invoices')) || [];
        const found = stored.find((inv, idx) => idx.toString() === id);
        if (found) setInvoice(found);
    }, [id]);

    const handleSendEmail = async () => {
        setSending(true);
        await sendInvoiceEmail({ ...invoice, invoiceId: id });
        setSending(false);
    };

    const handleDownloadPDF = () => {
        html2pdf().from(previewRef.current).save(`invoice-${id || 'preview'}.pdf`);
    };

    const handlePrint = () => {
        const printContent = previewRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background: #f9f9f9; }
            .status { font-weight: 600; padding: 4px 10px; border-radius: 20px; }
            .paid { background: #d1fae5; color: #065f46; }
            .partially { background: #fef3c7; color: #92400e; }
            .unpaid { background: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    if (!invoice) return <p className="text-center mt-20">Loading invoice...</p>;

    const { logo, status, billFrom, billTo, recipientEmail, invoiceDate, currentTimestamp, items, total, notes } = invoice;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/my-invoices')}
                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                        >
                            <FiArrowLeft size={18} /> Back
                        </button>
                        <h2 className="text-2xl font-semibold text-[#1A73E8]">Invoice</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/edit-invoice/${id}`)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 min-w-[100px] flex items-center gap-1"
                        >
                            <span><FaPencil size={16} /></span> Edit
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
                        >
                            Print
                        </button>
                        {/* <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            onClick={handleSendEmail}
                            disabled={sending}
                        >
                            {sending ? 'Sending...' : '📧 Send Invoice Email'}
                        </button> */}
                    </div>
                </div>

                {/* Invoice Preview */}
                <div ref={previewRef} className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:p-0 print:bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        {logo && <img src={logo} alt="Logo" className="h-12 w-auto" />}

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${status === 'Paid'
                                ? 'bg-green-100 text-green-700'
                                : status === 'Partially Paid'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {status}
                        </span>
                    </div>

                    {/* Billing */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-6 text-sm text-gray-700">
                        <div>
                            <p className="font-medium text-gray-800 mb-1">Bill From:</p>
                            <p>{billFrom || '-'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800 mb-1">Bill To:</p>
                            <p>{billTo || '-'}</p>
                            {recipientEmail && (
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong>Email:</strong> {recipientEmail}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid sm:grid-cols-2 text-sm text-gray-700 mb-6">
                        <div>
                            <span className="font-medium text-gray-600">Invoice Date:</span> {invoiceDate || '-'}
                        </div>
                        <div className="text-right">
                            <span className="font-medium text-gray-600">Generated:</span> {currentTimestamp}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                        <table className="w-full text-sm text-left border border-gray-200">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-3 border-b">Description</th>
                                    <th className="p-3 border-b text-center">Qty</th>
                                    <th className="p-3 border-b text-right">Unit Price</th>
                                    <th className="p-3 border-b text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, idx) => {
                                    const qty = parseFloat(item.quantity) || 0;
                                    const price = parseFloat(item.price) || 0;
                                    const subtotal = qty * price;
                                    return (
                                        <tr key={idx}>
                                            <td className="p-3 border-b">{item.description || '-'}</td>
                                            <td className="p-3 border-b text-center">{qty}</td>
                                            <td className="p-3 border-b text-right">₦{price.toLocaleString()}</td>
                                            <td className="p-3 border-b text-right">₦{subtotal.toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                                <tr className="font-semibold bg-gray-50">
                                    <td colSpan={3} className="p-3 text-right">
                                        Total
                                    </td>
                                    <td className="p-3 text-right">₦{total.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Notes */}
                        {notes && (
                            <div className="mt-4">
                                <span className="font-medium text-gray-600 block">Note:</span>
                                <p>{notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInvoice;
