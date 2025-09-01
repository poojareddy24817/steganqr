import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PricingEnterprise from './pages/pricing-enterprise';
import ScannerInterface from './pages/scanner-interface';
import GeneratorDashboard from './pages/generator-dashboard';
import DeveloperApiPage from './pages/developer-api';
import TechnologyHub from './pages/technology-hub';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DeveloperApiPage />} />
        <Route path="/pricing-enterprise" element={<PricingEnterprise />} />
        <Route path="/scanner-interface" element={<ScannerInterface />} />
        <Route path="/generator-dashboard" element={<GeneratorDashboard />} />
        <Route path="/developer-api" element={<DeveloperApiPage />} />
        <Route path="/technology-hub" element={<TechnologyHub />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
