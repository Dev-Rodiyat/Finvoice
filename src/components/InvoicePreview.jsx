import React from 'react';

const InvoicePreview = ({
    logo,
    status = 'Unpaid',
    billFrom = '',
    billTo = '',
    recipientEmail = '',
    notes = '',
    invoiceDate = '',
    currentTimestamp = '',
    items = [],
    total = 0,
}) => {
    return (
        <div className="w-full bg-white p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#1A73E8] text-center">
                Invoice Preview
            </h2>

            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    {logo && (
                        <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto" />
                    )}
                    <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : status === 'Partially Paid'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {status}
                    </span>
                </div>

                {/* Bill Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 text-sm text-gray-700">
                    <div>
                        <span className="font-medium text-gray-600">Invoice Date:</span>{' '}
                        {invoiceDate || '-'}
                    </div>
                    <div className="text-left sm:text-right">
                        <span className="font-medium text-gray-600">Generated:</span>{' '}
                        {currentTimestamp || '-'}
                    </div>
                </div>

                {/* Item Table */}
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden min-w-[320px]">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-2 sm:p-3 border-b">Description</th>
                                <th className="p-2 sm:p-3 border-b text-center">Qty</th>
                                <th className="p-2 sm:p-3 border-b text-right">Unit Price</th>
                                <th className="p-2 sm:p-3 border-b text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(items) && items.length > 0 ? (
                                items.map((item, idx) => {
                                    const qty = parseFloat(item.quantity) || 0;
                                    const price = parseFloat(item.price) || 0;
                                    const subtotal = qty * price;
                                    return (
                                        <tr key={idx} className="border-b">
                                            <td className="p-2 sm:p-3">{item.description || '-'}</td>
                                            <td className="p-2 sm:p-3 text-center">{qty}</td>
                                            <td className="p-2 sm:p-3 text-right">
                                                ₦{price.toLocaleString()}
                                            </td>
                                            <td className="p-2 sm:p-3 text-right">
                                                ₦{subtotal.toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-3 text-center text-gray-400 italic"
                                    >
                                        No items added.
                                    </td>
                                </tr>
                            )}
                            <tr className="font-semibold bg-gray-50">
                                <td colSpan="3" className="p-2 sm:p-3 text-right">
                                    Total
                                </td>
                                <td className="p-2 sm:p-3 text-right">
                                    ₦{parseFloat(total).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {notes && (
                        <div className="mt-4 text-sm text-gray-600">
                            <strong>Notes:</strong>
                            <p>{notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
