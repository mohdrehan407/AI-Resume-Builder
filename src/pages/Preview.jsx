import React from 'react';
import { Download, Share2, Printer, Copy, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { calculateATSScore } from '../utils/atsScorer';
import MainLayout from '../components/MainLayout';
import ResumePreview from '../components/ResumePreview';
import { useResumeData } from '../hooks/useResumeData';

const CircularScore = ({ score }) => {
    const getColor = (s) => {
        if (s <= 40) return '#ef4444'; // Red
        if (s <= 70) return '#f59e0b'; // Amber
        return '#10b981'; // Green
    };

    const getLabel = (s) => {
        if (s <= 40) return 'Needs Work';
        if (s <= 70) return 'Getting There';
        return 'Strong Resume';
    };

    const color = getColor(score);
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#1e293b" strokeWidth="8" />
                    <circle
                        cx="50" cy="50" r={radius} fill="transparent" stroke={color} strokeWidth="8"
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                </svg>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f8fafc', lineHeight: '1' }}>{score}</span>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>/100</span>
                </div>
            </div>
            <div style={{
                background: `${color}20`, color: color, padding: '0.2rem 0.75rem',
                borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', border: `1px solid ${color}40`
            }}>
                {getLabel(score)}
            </div>
        </div>
    );
};

const Preview = () => {
    const { resumeData, updateSection } = useResumeData();
    const { score, improvements } = calculateATSScore(resumeData);

    const isIncomplete = !resumeData.personalInfo.fullName ||
        (resumeData.experience.length === 0 && resumeData.projects.length === 0);

    const handlePrint = () => {
        window.print();
    };

    const handleCopyText = () => {
        const { personalInfo, summary, education, experience, projects, skills, links } = resumeData;

        // Formatted skill text
        const skillText = Object.entries(skills)
            .filter(([_, list]) => list.length > 0)
            .map(([cat, list]) => `${cat.toUpperCase()}: ${list.join(', ')}`)
            .join('\n');

        const text = `
${personalInfo.fullName || 'Name'}
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
${links.github ? `GitHub: ${links.github}` : ''} ${links.linkedin ? `| LinkedIn: ${links.linkedin}` : ''}

SUMMARY
${summary}

EXPERIENCE
${experience.map(exp => `${exp.company} - ${exp.role} (${exp.duration})\n${exp.description}`).join('\n\n')}

PROJECTS
${projects.map(proj => `${proj.name} - ${proj.techStack.join(', ')}\n${proj.description}\n${proj.githubUrl || ''} ${proj.liveUrl || ''}`).join('\n\n')}

EDUCATION
${education.map(edu => `${edu.school} - ${edu.degree} (${edu.year})`).join('\n')}

SKILLS
${skillText}
        `.trim();

        navigator.clipboard.writeText(text);
        alert('Resume copied to clipboard!');
    };

    return (
        <MainLayout>
            <div style={{ background: '#0f172a', minHeight: 'calc(100vh - 64px)', padding: '3rem' }} className="preview-page-container">
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem', alignItems: 'start' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {isIncomplete && (
                            <div style={{
                                background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308',
                                padding: '1rem', borderRadius: '8px', display: 'flex',
                                alignItems: 'center', gap: '1rem', color: '#eab308'
                            }} className="no-print">
                                <AlertCircle size={20} />
                                <span>Your resume may look incomplete. Consider adding more details.</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
                            <div style={{ display: 'flex', gap: '0.25rem', background: '#1e293b', padding: '0.25rem', borderRadius: '8px', border: '1px solid #334155' }} className="template-switcher">
                                {['Classic', 'Modern', 'Minimal'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => updateSection('template', t)}
                                        style={{
                                            padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500',
                                            background: resumeData.template === t ? '#3b82f6' : 'transparent',
                                            color: resumeData.template === t ? '#fff' : '#94a3b8',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="premium-btn" style={{ background: '#1e293b', border: '1px solid #334155' }} onClick={handleCopyText}>
                                    <Copy size={18} /> Copy Text
                                </button>
                                <button className="premium-btn" onClick={handlePrint}>
                                    <Printer size={18} /> Print / PDF
                                </button>
                            </div>
                        </div>

                        <div style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', background: '#fff' }}>
                            <ResumePreview data={resumeData} />
                        </div>
                    </div>

                    {/* ATS Score Sidebar */}
                    <div className="no-print" style={{
                        position: 'sticky', top: '2rem', background: '#1e293b',
                        padding: '2rem', borderRadius: '16px', border: '1px solid #334155',
                        display: 'flex', flexDirection: 'column', gap: '2rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ color: '#f8fafc', marginBottom: '1.5rem', fontSize: '1.25rem' }}>ATS Optimization</h3>
                            <CircularScore score={score} />
                        </div>

                        <div style={{ borderTop: '1px solid #334155', paddingTop: '1.5rem' }}>
                            <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Improvement Checklist</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {improvements.length > 0 ? (
                                    improvements.map((imp, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                            <div style={{ marginTop: '0.2rem', color: '#ef4444' }}><X size={14} /></div>
                                            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{imp.text}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#10b981' }}>
                                        <CheckCircle2 size={18} />
                                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Perfect Score! Your resume is ATS-ready.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default Preview;
