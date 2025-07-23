import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaPrint, FaHistory, FaMagic, FaClipboardList, FaPaperPlane } from 'react-icons/fa';

const features = [
  {
    icon: <FaCheckCircle className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Easy to Use',
    description: 'Simple, intuitive UI built for productivity.'
  },
  {
    icon: <FaDownload className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Download Invoices',
    description: 'Export beautiful PDF invoices instantly.'
  },
  {
    icon: <FaPrint className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Print Friendly',
    description: 'Optimized formatting for printing needs.'
  },
  {
    icon: <FaHistory className="text-[#1A73E8] text-4xl mb-4 mx-auto" />,
    title: 'Invoice History',
    description: 'Access all previous invoices anytime.'
  },
];

const howItWorks = [
  {
    icon: <FaClipboardList className="text-[#1A73E8] text-5xl mb-4 mx-auto" />,
    title: '1. Fill Out Details',
    description: 'Enter your client information, invoice items, and tax rate in our easy-to-use form.'
  },
  {
    icon: <FaMagic className="text-[#1A73E8] text-5xl mb-4 mx-auto" />,
    title: '2. Preview Instantly',
    description: 'See a live preview of your invoice as you build it. No guesswork involved.'
  },
  {
    icon: <FaPaperPlane className="text-[#1A73E8] text-5xl mb-4 mx-auto" />,
    title: '3. Print or Download',
    description: 'Download a PDF or print your invoice directly from the browser. Simple and fast.'
  },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Hero Section */}
      <section className="text-center py-32 px-4 bg-[#e8f1fc]">
        <h1 className="text-5xl font-bold mb-6 text-[#1A73E8]">Welcome to Finvoice</h1>
        <p className="text-lg text-darkText mb-8 max-w-xl mx-auto">
          Create sleek, professional invoices in seconds with our modern, easy-to-use platform.
        </p>
        <Link 
          to="/invoice"
          className="inline-block bg-[#1A73E8] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#1A73E8]">Why Choose Finvoice?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-darkText">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#f1f5ff] py-24 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1A73E8]">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          {howItWorks.map((step, idx) => (
            <div key={idx} className="p-6">
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-darkText text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-[#1A73E8] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start invoicing smarter today</h2>
        <p className="mb-6">It only takes a few clicks to create your first invoice.</p>
        <Link 
          to="/invoice"
          className="inline-block bg-white text-[#1A73E8] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
        >
          Generate Invoice
        </Link>
      </section>
    </motion.div>
  );
}
