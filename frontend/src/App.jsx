import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Scroll to top helper for route changes and page reloads
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Company from './pages/Company';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Contact from './pages/Contact';
import ApiDocs from './pages/ApiDocs';
import Integrations from './pages/Integrations';
import EthicsPolicy from './pages/EthicsPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SalesTerms from './pages/SalesTerms';
import NotFound from './pages/NotFound';

import ScrollToTopButton from './components/common/ScrollToTopButton';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0e12] text-[#e2e2e8]">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          
          <Route path="/company" element={<Company />} />
          
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          
          <Route path="/contact" element={<Contact />} />

          {/* Reference Project Content Pages */}
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/ethics" element={<EthicsPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sales-terms" element={<SalesTerms />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
