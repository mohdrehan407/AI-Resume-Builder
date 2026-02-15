
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Lock, Layout, Code, Ship, ExternalLink, Copy, AlertCircle, Camera } from 'lucide-react';
import { useBuildSystem } from '../hooks/useBuildSystem';
import '../styles/layout.css';

const PremiumLayout = ({ children, stepId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { steps, status, isStepAccessible, saveArtifact } = useBuildSystem(stepId);

    const currentStep = steps.find(s => s.id === stepId) || {};
    const isProofPage = location.pathname === '/rb/proof';

    const handleNext = () => {
        if (stepId < 8) {
            navigate(steps[stepId].path);
        } else {
            navigate('/rb/proof');
        }
    };

    const handlePrev = () => {
        if (stepId > 1) {
            navigate(steps[stepId - 2].path);
        }
    };

    const isArtifactUploaded = !!localStorage.getItem(`rb_step_${stepId}_artifact`);

    // Shipped Logic check
    const stepsCompleted = steps.every(s => localStorage.getItem(`rb_step_${s.id}_artifact`));
    const checklistData = JSON.parse(localStorage.getItem('rb_test_checklist') || '{}');
    const testsPassed = Object.values(checklistData).filter(Boolean).length === 10;

    const isValidUrl = (url) => {
        if (!url) return false;
        try { new URL(url); return true; } catch (_) { return false; }
    };

    let linksValid = false;
    try {
        const submissionData = JSON.parse(localStorage.getItem('rb_final_submission') || '{}');
        linksValid = isValidUrl(submissionData.lovable) && isValidUrl(submissionData.github) && isValidUrl(submissionData.deploy);
    } catch (e) {
        linksValid = false;
    }

    const isShipped = stepsCompleted && testsPassed && linksValid;

    return (
        <div className="layout-container">
            {/* Top Bar */}
            <header className="top-bar">
                <div className="top-bar-left">
                    AI Resume Builder
                </div>
                <div className="top-bar-center">
                    {isProofPage ? 'Final Submission' : `Project 3 — Step ${stepId} of 8`}
                </div>
                <div className="top-bar-right">
                    <div className={`status-badge ${isShipped ? 'shipped' : 'in-progress'}`} style={{
                        background: isShipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: isShipped ? '#10b981' : '#3b82f6',
                        border: `1px solid ${isShipped ? '#10b981' : '#3b82f6'}`,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                    }}>
                        {isShipped ? 'SHIPPED' : 'IN PROGRESS'}
                    </div>
                </div>
            </header>

            {/* Context Header */}
            {!isProofPage && (
                <div className="context-header">
                    {currentStep.name} — Workspace Context
                </div>
            )}

            {/* Main Container */}
            <div className="workspace-container">
                <main className="main-workspace">
                    {children}
                </main>

                {/* Build Panel (Hidden on Proof Page) */}
                {!isProofPage && (
                    <aside className="build-panel">
                        <h3>Copy This Into Lovable</h3>
                        <textarea
                            className="build-code-area"
                            readOnly
                            value={`Implementing ${currentStep.name} for AI Resume Builder project...`}
                        />
                        <div className="build-actions">
                            <button className="premium-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Copy size={16} /> Copy Prompt
                            </button>
                            <a
                                href="https://lovable.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-btn"
                                style={{ textAlign: 'center', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <ExternalLink size={16} /> Build in Lovable
                            </a>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="premium-btn" style={{ flex: 1, background: '#059669', fontSize: '0.8rem' }}>It Worked</button>
                                <button className="premium-btn" style={{ flex: 1, background: '#dc2626', fontSize: '0.8rem' }}>Error</button>
                            </div>
                            <button className="premium-btn" style={{ background: '#4b5563', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Camera size={14} /> Add Screenshot
                            </button>
                        </div>
                    </aside>
                )}
            </div>

            {/* Proof Footer */}
            <footer className="proof-footer">
                {!isProofPage ? (
                    <div className="gated-step-nav">
                        <button
                            className="premium-btn"
                            style={{ background: 'transparent', border: '1px solid var(--border)' }}
                            onClick={handlePrev}
                            disabled={stepId === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="premium-btn"
                            onClick={handleNext}
                            disabled={!isArtifactUploaded}
                        >
                            {stepId === 8 ? 'Go to Proof' : 'Next Step'}
                        </button>
                    </div>
                ) : (
                    <button className="premium-btn" onClick={() => navigate('/rb/08-ship')}>
                        Back to Ship
                    </button>
                )}
            </footer>
        </div>
    );
};

export default PremiumLayout;
