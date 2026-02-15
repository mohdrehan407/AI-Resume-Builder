
import React, { useState, useEffect } from 'react';
import PremiumLayout from '../components/PremiumLayout';
import { useBuildSystem } from '../hooks/useBuildSystem';
import { CheckCircle, Clock, Link, Github, Globe, Copy, AlertCircle, ShieldCheck } from 'lucide-react';

const ProofPage = () => {
    const { steps, getStepStatus } = useBuildSystem();
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('rb_final_submission');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deploy: '' };
    });

    const [isExported, setIsExported] = useState(false);

    useEffect(() => {
        localStorage.setItem('rb_final_submission', JSON.stringify(links));
    }, [links]);

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const allStepsCompleted = steps.every(s => getStepStatus(s.id) === 'completed');

    const checklistData = JSON.parse(localStorage.getItem('rb_test_checklist') || '{}');
    const allTestsPassed = Object.values(checklistData).filter(Boolean).length === 10;

    const linksProvided = links.lovable && links.github && links.deploy;
    const linksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deploy);

    const isShippable = allStepsCompleted && allTestsPassed && linksProvided && linksValid;

    const handleCopy = () => {
        if (!linksProvided || !linksValid) {
            alert('Please provide all 3 valid submission links before exporting.');
            return;
        }

        const submission = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deploy}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;

        navigator.clipboard.writeText(submission);
        setIsExported(true);
        setTimeout(() => setIsExported(false), 3000);
    };

    return (
        <PremiumLayout stepId={null}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Final Proof of Build</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Review your journey and provide final links to ship Project 3.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem', alignItems: 'start' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {/* Step Overview */}
                        <section>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={20} color="var(--accent)" /> Step Completion Overview
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {steps.map(step => (
                                    <div key={step.id} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '1rem', background: 'var(--bg-panel)', borderRadius: '12px',
                                        border: '1px solid var(--border)', transition: 'background 0.2s'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)'
                                            }}>
                                                {step.id}
                                            </div>
                                            <span style={{ fontWeight: '500' }}>{step.name}</span>
                                        </div>
                                        {getStepStatus(step.id) === 'completed' ? (
                                            <CheckCircle size={18} color="var(--success)" />
                                        ) : (
                                            <Clock size={18} color="var(--text-secondary)" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Checklist Summary */}
                        <section style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '1rem', color: '#10b981', marginBottom: '0.25rem' }}>QA Checklist Status</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{allTestsPassed ? 'All 10 quality tests passed.' : 'Testing phase incomplete.'}</p>
                                </div>
                                {allTestsPassed ? <CheckCircle color="#10b981" /> : <AlertCircle color="#eab308" />}
                            </div>
                        </section>

                        {/* Submission Link Collection */}
                        <section>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Artifact Collection</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Link size={14} /> Lovable Project Link
                                    </label>
                                    <input
                                        className="premium-input"
                                        placeholder="https://lovable.dev/projects/..."
                                        value={links.lovable}
                                        onChange={(e) => setLinks({ ...links, lovable: e.target.value })}
                                        style={{ borderColor: links.lovable && !isValidUrl(links.lovable) ? 'var(--error)' : 'var(--border)' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Github size={14} /> GitHub Repository Link
                                    </label>
                                    <input
                                        className="premium-input"
                                        placeholder="https://github.com/..."
                                        value={links.github}
                                        onChange={(e) => setLinks({ ...links, github: e.target.value })}
                                        style={{ borderColor: links.github && !isValidUrl(links.github) ? 'var(--error)' : 'var(--border)' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Globe size={14} /> Deployed URL
                                    </label>
                                    <input
                                        className="premium-input"
                                        placeholder="https://yourapp.vercel.app"
                                        value={links.deploy}
                                        onChange={(e) => setLinks({ ...links, deploy: e.target.value })}
                                        style={{ borderColor: links.deploy && !isValidUrl(links.deploy) ? 'var(--error)' : 'var(--border)' }}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Ship Action Panel */}
                    <div style={{ position: 'sticky', top: '2rem' }}>
                        <div style={{
                            background: '#1e293b', padding: '2rem', borderRadius: '20px',
                            border: '1px solid #334155', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                        }}>
                            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Project 3 Status</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>8 Steps Artifacts</span>
                                    <span style={{ color: allStepsCompleted ? 'var(--success)' : 'var(--text-secondary)' }}>
                                        {allStepsCompleted ? 'Verified' : 'Pending'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>QA Checklist</span>
                                    <span style={{ color: allTestsPassed ? 'var(--success)' : 'var(--text-secondary)' }}>
                                        {allTestsPassed ? '10/10' : 'Incomplete'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Proof Links</span>
                                    <span style={{ color: linksValid ? 'var(--success)' : 'var(--text-secondary)' }}>
                                        {linksValid ? 'Validated' : 'Required'}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="premium-btn"
                                onClick={handleCopy}
                                style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                            >
                                <Copy size={18} /> {isExported ? 'Copied!' : 'Copy Final Submission'}
                            </button>

                            {isShippable && (
                                <div style={{
                                    marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)',
                                    textAlign: 'center', color: 'var(--success)', animation: 'fadeIn 0.5s ease'
                                }}>
                                    <CheckCircle size={32} style={{ marginBottom: '1rem' }} />
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>Shipped Successfully</div>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>Project 3 Shipped Successfully.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </PremiumLayout>
    );
};

export default ProofPage;
