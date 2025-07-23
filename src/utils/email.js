import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const sendInvoiceEmail = async (invoice) => {
  const {
    billFrom,
    billTo,
    invoiceDate,
    total,
    status,
    notes,
    invoiceId,
    recipientEmail,
    logo,
    items = [],
  } = invoice;

  // Generate plain HTML table rows without inline styles
  const itemsTableRows = items
    .map(
      (item) => `
      <tr>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>₦${Number(item.price).toFixed(2)}</td>
        <td>₦${(item.quantity * item.price).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const itemsTable = `
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsTableRows}
      </tbody>
    </table>`;

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        bill_from: billFrom,
        bill_to: billTo,
        invoice_date: invoiceDate,
        status,
        total,
        notes,
        recipient_email: recipientEmail,
        invoice_link: `${import.meta.env.VITE_APP_URL}/invoice/${invoiceId}`,
        items_table: itemsTable,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success('✅ Invoice email sent successfully!');
    return result;
  } catch (error) {
    console.error('❌ Failed to send invoice email:', error);
    toast.error('Failed to send invoice email.');
    throw error;
  }
};
