import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import illustration from './../assets/404-Illustration.jpg'

export default function NotFound() {
     const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.section
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={illustration}
        alt="404 Illustration"
        className="w-64 mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-5xl font-bold text-[#1A73E8] mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        404 - Page Not Found
      </motion.h1>

      <motion.p
        className="text-darkText mb-8 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! We couldn't find the page you were looking for.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 bg-[#1A73E8] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition font-medium"
        >
          <FaArrowLeft /> Go Back
        </button>
      </motion.div>
    </motion.section>
  );
}
