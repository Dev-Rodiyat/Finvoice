import React, { useState } from 'react';
import InvoicePreview from '../components/InvoicePreview';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialItem = { description: '', quantity: '', price: '' };

const InvoicePage = () => {
    const [billFrom, setBillFrom] = useState('');
    const [billTo, setBillTo] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [status, setStatus] = useState('Unpaid');
    const [notes, setNotes] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [items, setItems] = useState([{ ...initialItem }]);
    const [logo, setLogo] = useState(null);
    const [saveMsg, setSaveMsg] = useState('');
    const navigate = useNavigate()

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = field === 'price' || field === 'quantity'
            ? value.replace(/[^0-9.]/g, '') // Only allow numbers and dot
            : value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { ...initialItem }]);
    };

    const removeItem = (index) => {
        if (items.length === 1) return;
        setItems(items.filter((_, i) => i !== index));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setLogo(URL.createObjectURL(file));
    };

    const total = items.reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return acc + qty * price;
    }, 0);

    const currentTimestamp = new Date().toLocaleString();

    const invoiceData = {
        id: Date.now(),
        logo,
        billFrom,
        billTo,
        recipientEmail,
        invoiceDate,
        status,
        notes,
        items,
        total,
        currentTimestamp,
    };

    const saveInvoiceToLocalStorage = () => {
        const existing = JSON.parse(localStorage.getItem('invoices')) || [];
        const updated = [...existing, invoiceData];
        localStorage.setItem('invoices', JSON.stringify(updated));
        setSaveMsg('✅ Invoice saved successfully!');
        toast.success('Invoice saved successfully!');
        navigate('/my-invoices')
        setTimeout(() => setSaveMsg(''), 3000);
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">

                {/* Form Section */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-sm">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#1A73E8]">Invoice Info</h2>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Upload Logo</label>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Bill From</label>
                        <input
                            type="text"
                            value={billFrom}
                            onChange={(e) => setBillFrom(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder='eg: John Doe'
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Bill To</label>
                        <input
                            type="text"
                            value={billTo}
                            onChange={(e) => setBillTo(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder='eg: John Doe'
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Recipient Email</label>
                        <input
                            type="email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Invoice Date</label>
                        <input
                            type="date"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Partially Paid">Partially Paid</option>
                        </select>
                    </div>

                    {/* Items */}
                    <h3 className="text-md font-semibold mb-2">Items</h3>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-end">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    className="sm:col-span-3 border rounded px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    className="sm:col-span-1 border rounded px-3 py-2 w-full text-center"
                                />
                                <input
                                    type="text"
                                    placeholder="₦0.00"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                    className="sm:col-span-1 border rounded px-3 py-2 w-full text-right"
                                />
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 text-sm hover:underline sm:col-span-1"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addItem}
                            className="text-blue-600 text-sm mt-2 hover:underline"
                        >
                            + Add Item
                        </button>
                    </div>

                    {/* Notes */}
                    <div className="pt-4">
                        <label htmlFor="notes" className="block font-medium text-sm mb-1">Notes</label>
                        <textarea
                            name="notes"
                            placeholder="Additional Notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Save */}
                    <button
                        onClick={saveInvoiceToLocalStorage}
                        className="mt-6 w-full bg-[#1A73E8] text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        💾 Save Invoice
                    </button>

                    {saveMsg && <p className="text-green-600 mt-2 text-sm">{saveMsg}</p>}
                </div>

                {/* Preview Section */}
                <InvoicePreview {...invoiceData} />

            </div>
        </div>
    );
};

export default InvoicePage;
