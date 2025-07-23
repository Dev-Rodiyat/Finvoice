import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoice = storedInvoices.find((inv, idx) => idx.toString() === id);
    if (invoice) setInvoiceData(invoice);
  }, [id]);

  useEffect(() => {
    if (invoiceData?.items) {
      const newTotal = invoiceData.items.reduce((acc, item) => {
        return acc + Number(item.price || 0) * Number(item.quantity || 0);
      }, 0);
      setInvoiceData(prev => ({ ...prev, total: newTotal }));
    }
  }, [invoiceData?.items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = value;
    setInvoiceData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: '', price: '' }]
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInvoiceData(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices[parseInt(id)] = invoiceData;
    toast.success('Invoice updated successfully!');
    localStorage.setItem('invoices', JSON.stringify(invoices));
    navigate(`/invoice/${id}`);
  };

  if (!invoiceData) return <p className="text-center mt-20">Loading invoice...</p>;

  const total = invoiceData.total || 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Edit Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Bill From</label>
            <input name="billFrom" value={invoiceData.billFrom} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Bill To</label>
            <input name="billTo" value={invoiceData.billTo} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Recipient Email</label>
            <input name="recipientEmail" value={invoiceData.recipientEmail || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium">Invoice Date</label>
            <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={invoiceData.status} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded">
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          {invoiceData.logo && <img src={invoiceData.logo} alt="Logo Preview" className="h-12 mb-2" />}
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>

        {/* Item List */}
        <div>
          <h3 className="font-medium mb-2">Items</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                placeholder="Description"
                value={item.description}
                onChange={e => handleItemChange(index, 'description', e.target.value)}
                className="p-2 border rounded col-span-1"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                className="p-2 border rounded col-span-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={e => handleItemChange(index, 'price', e.target.value)}
                className="p-2 border rounded col-span-1"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="text-sm text-blue-600 mt-1 hover:underline">
            + Add Item
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea name="notes" value={invoiceData.notes} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" rows={3} />
        </div>

        {/* Total */}
        <div className="text-right font-semibold text-gray-800">Total: ₦{total.toLocaleString()}</div>

        {/* Submit */}
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
