import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Invoice from './pages/Invoice';
import MyInvoices from './pages/MyInvoices';
import ViewInvoice from './pages/ViewInvoice';
import EditInvoice from './pages/EditInvoice';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="my-invoices" element={<MyInvoices />} />
          <Route path="/invoice/:id" element={<ViewInvoice />} />
          <Route path="/edit-invoice/:id" element={<EditInvoice />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}