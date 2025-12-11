import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ExamPreparation } from './pages/ExamPreparation';
import { SubjectDetails } from './pages/SubjectDetails';
import { Prompts } from './pages/Prompts';
import { FreeResources } from './pages/FreeResources';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Failed } from './pages/Failed';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { RefundPolicy } from './pages/RefundPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { validateEnv } from './lib/env';

validateEnv();

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam-preparation" element={<ExamPreparation />} />
          <Route path="/exam-preparation/:subject" element={<SubjectDetails />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/free-resources" element={<FreeResources />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
