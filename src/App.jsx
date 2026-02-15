import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuildStep from './pages/BuildStep';
import TestStep from './pages/TestStep';
import ProofPage from './pages/ProofPage';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import AppProof from './pages/AppProof';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/proof" element={<AppProof />} />

        {/* Build Track Routes (Project 3) */}
        <Route path="/rb/01-problem" element={<BuildStep stepId={1} title="The Problem Statement" />} />
        <Route path="/rb/02-market" element={<BuildStep stepId={2} title="Market Research & Analysis" />} />
        <Route path="/rb/03-architecture" element={<BuildStep stepId={3} title="System Architecture" />} />
        <Route path="/rb/04-hld" element={<BuildStep stepId={4} title="High-Level Design (HLD)" />} />
        <Route path="/rb/05-lld" element={<BuildStep stepId={5} title="Low-Level Design (LLD)" />} />
        <Route path="/rb/06-build" element={<BuildStep stepId={6} title="The Build Phase" />} />
        <Route path="/rb/07-test" element={<TestStep />} />
        <Route path="/rb/08-ship" element={<BuildStep stepId={8} title="Final Shipping & Deployment" />} />
        <Route path="/rb/proof" element={<ProofPage />} />
      </Routes>
    </Router>
  );
}

export default App;
