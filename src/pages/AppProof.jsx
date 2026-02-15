
import React from 'react';
import MainLayout from '../components/MainLayout';
import { FileText, CheckCircle } from 'lucide-react';

const AppProof = () => {
    return (
        <MainLayout>
            <div style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem' }}>Artifact Verification</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
                        <div key={step} style={{ background: '#1e293b', border: '1px solid #334155', padding: '1.5rem', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <FileText size={20} color="#3b82f6" />
                                    <span style={{ fontWeight: '600' }}>Artifact 0{step}</span>
                                </div>
                                <CheckCircle size={18} color="#10b981" />
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                Technical artifact for the AI Resume Builder development phase {step}.
                            </p>
                            <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                                Stored in: rb_step_{step}_artifact
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AppProof;
