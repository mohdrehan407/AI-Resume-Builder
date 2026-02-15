
import React, { useState, useEffect } from 'react';
import PremiumLayout from '../components/PremiumLayout';
import { useBuildSystem } from '../hooks/useBuildSystem';
import { CheckCircle, Circle, AlertCircle, Info } from 'lucide-react';

const TEST_ITEMS = [
    { id: 1, title: 'Data Persistence', desc: 'Verify data survives page refresh via localStorage.' },
    { id: 2, title: 'Real-time Updates', desc: 'Resume preview updates instantly on input change.' },
    { id: 3, title: 'Template Switching', desc: 'Switching templates preserves all user data.' },
    { id: 4, title: 'Color Themes', desc: 'Theme colors apply correctly across all sections.' },
    { id: 5, title: 'ATS Scoring Logic', desc: 'Score reflects rules (Name, Links, Word count, etc.)' },
    { id: 6, title: 'Live Score Updates', desc: 'ATS score updates immediately as fields are filled.' },
    { id: 7, title: 'PDF Export', desc: 'Download button triggers export (simulated toast).' },
    { id: 8, title: 'Empty States', desc: 'Graceful handling when resume fields are cleared.' },
    { id: 9, title: 'Responsive Design', desc: 'UI adapts correctly to mobile and tablet screens.' },
    { id: 10, title: 'Console Integrity', desc: 'No errors or warnings in the developer console.' }
];

const TestStep = () => {
    const stepId = 7;
    const { currentArtifact, saveArtifact, isStepAccessible } = useBuildSystem(stepId);
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('rb_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('rb_test_checklist', JSON.stringify(checklist));
    }, [checklist]);

    const toggleItem = (id) => {
        setChecklist(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const passedCount = Object.values(checklist).filter(Boolean).length;
    const isReady = passedCount === TEST_ITEMS.length;

    const handleSave = () => {
        if (!isReady) {
            alert('Please complete all 10 tests before saving.');
            return;
        }
        saveArtifact(`Final Test Report: ${passedCount}/10 Passed. System ready for shipment.`);
        alert('Test artifact saved successfully!');
    };

    if (!isStepAccessible(stepId)) {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                <AlertCircle size={48} />
                <h2>Step Locked</h2>
                <p>Please complete the previous step to unlock this phase.</p>
            </div>
        );
    }

    return (
        <PremiumLayout stepId={stepId}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Step 07: Testing & QA</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Verify core functionalities before final shipping.</p>
                    </div>
                    <div style={{
                        background: isReady ? 'var(--success)' : 'var(--bg-panel)',
                        color: isReady ? 'white' : 'var(--text-secondary)',
                        padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 'bold',
                        border: '1px solid var(--border)', transition: 'all 0.3s ease'
                    }}>
                        {passedCount}/10 Passed
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                    {TEST_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem',
                                background: 'var(--bg-panel)', borderRadius: '12px', border: `1px solid ${checklist[item.id] ? 'var(--success)' : 'var(--border)'}`,
                                cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative'
                            }}
                        >
                            {checklist[item.id] ? (
                                <CheckCircle size={24} color="var(--success)" strokeWidth={2.5} />
                            ) : (
                                <Circle size={24} color="#475569" strokeWidth={2} />
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', color: checklist[item.id] ? 'white' : 'var(--text-secondary)' }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{item.desc}</div>
                            </div>
                            <div title="Verification Required" style={{ opacity: checklist[item.id] ? 0 : 0.4 }}>
                                <Info size={16} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Final Test Synchronization</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                        Once all tests are verified, sync the results to unlock the final shipment phase.
                    </p>
                    <button
                        className="premium-btn"
                        onClick={handleSave}
                        disabled={!isReady}
                        style={{ padding: '0.75rem 2rem', background: isReady ? 'var(--success)' : '#4b5563', opacity: isReady ? 1 : 0.7 }}
                    >
                        Sync Test Results
                    </button>
                    {currentArtifact && (
                        <div style={{ marginTop: '1rem', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <CheckCircle size={14} /> Ready for Shipping
                        </div>
                    )}
                </div>
            </div>
        </PremiumLayout>
    );
};

export default TestStep;
