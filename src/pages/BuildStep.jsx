
import React, { useState } from 'react';
import PremiumLayout from '../components/PremiumLayout';
import { useBuildSystem } from '../hooks/useBuildSystem';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';

const BuildStep = ({ stepId, title }) => {
    const { currentArtifact, saveArtifact, isStepAccessible } = useBuildSystem(stepId);
    const [inputValue, setInputValue] = useState(currentArtifact || '');

    if (!isStepAccessible(stepId)) {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                <AlertCircle size={48} />
                <h2>Step Locked</h2>
                <p>Please complete the previous step to unlock this phase.</p>
            </div>
        );
    }

    const handleSave = () => {
        if (inputValue.trim()) {
            saveArtifact(inputValue);
            alert('Artifact saved successfully!');
        }
    };

    return (
        <PremiumLayout stepId={stepId}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>{title}</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Document your findings and technical decisions for this stage. This artifact is required to proceed.
                </p>

                <div style={{ background: 'var(--bg-panel)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Artifact Documentation</label>
                    <textarea
                        style={{ width: '100%', minHeight: '300px', marginBottom: '1rem', padding: '1rem', background: 'var(--bg-app)', border: '1px solid var(--border)', color: 'white' }}
                        placeholder={`Paste your ${title.toLowerCase()} artifact here...`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className="premium-btn"
                        onClick={handleSave}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Upload size={18} /> Save & Sync Artifact
                    </button>
                </div>

                {currentArtifact && (
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.9rem' }}>
                        <FileCheck size={16} /> Artifact successfully synchronized.
                    </div>
                )}
            </div>
        </PremiumLayout>
    );
};

export default BuildStep;
