import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const sendInvoiceEmail = async (invoice) => {
  const {
    billFrom = '',
    billTo = '',
    invoiceDate = '',
    total = '',
    status = '',
    notes = '',
    invoiceId = '',
    recipientEmail = '',
  } = invoice;

  const emailParams = {
    recipient_email: String(recipientEmail || ''),
    bill_from: String(billFrom || ''),
    bill_to: String(billTo || ''),
    invoice_date: String(invoiceDate || ''),
    total: String(total || ''),
    status: String(status || ''),
    notes: notes ? String(notes).slice(0, 1000) : '', // trim long notes
  };

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      emailParams,
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
