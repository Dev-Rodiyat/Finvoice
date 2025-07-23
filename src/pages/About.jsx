// File: src/pages/About.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaRocket, FaUsers } from 'react-icons/fa';

const highlights = [
  {
    icon: <FaFileInvoiceDollar className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Professional Invoicing',
    description: 'Generate branded, printable invoices that enhance your business image.'
  },
  {
    icon: <FaRocket className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Fast & Efficient',
    description: 'No more manual formatting - build and download invoices in seconds.'
  },
  {
    icon: <FaUsers className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Built for Creators',
    description: 'Finvoice is made with freelancers, startups, and small businesses in mind.'
  },
];

const faqs = [
  {
    question: 'Is Finvoice free to use?',
    answer: 'Yes! Finvoice is completely free with no hidden charges. Just sign in and start invoicing.'
  },
  {
    question: 'Can I download and print my invoices?',
    answer: 'Absolutely. You can download invoices as PDFs or print them directly from your browser.'
  },
  {
    question: 'Is my invoice data saved?',
    answer: 'Your invoice history is stored in your browser using localStorage, so it’s always available to you.'
  }
];

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="max-w-5xl mx-auto py-24 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-[#1A73E8]">About Finvoice</h2>
      <p className="text-lg text-darkText max-w-2xl mx-auto mb-12">
        Finvoice is a modern, user-friendly invoice generator designed for freelancers and small businesses.
        Create, preview, and download professional invoices with ease.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-darkText text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-left mb-24">
        <h3 className="text-3xl font-bold mb-8 text-[#1A73E8] text-center">Our Mission</h3>
        <p className="text-darkText text-base leading-relaxed text-center">
          At Finvoice, our mission is to empower small business owners, freelancers, and independent professionals
          with seamless tools that simplify financial workflows. We believe invoicing should be fast, flexible,
          and beautifully simple - that's why we built Finvoice.
        </p>
      </div>

      <div className="text-left">
        <h3 className="text-3xl font-bold mb-8 text-[#1A73E8] text-center">Frequently Asked Questions</h3>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow cursor-pointer transition"
              onClick={() => toggleFAQ(idx)}
            >
              <h4 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span className="text-[#1A73E8] text-xl">{openIndex === idx ? '-' : '+'}</span>
              </h4>
              {openIndex === idx && (
                <motion.p
                  className="text-darkText text-sm mt-2 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}