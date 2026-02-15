
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useResumeData } from '../hooks/useResumeData';
import ResumePreview from '../components/ResumePreview';
import { Plus, Trash2, RefreshCw, X, ChevronDown, ChevronUp, Link as LinkIcon, Github, Sparkles } from 'lucide-react';
import { calculateATSScore } from '../utils/atsScorer';

const TagInput = ({ tags, setTags, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: tags.length > 0 ? '0.5rem' : '0' }}>
                {tags.map((tag, i) => (
                    <span key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: '#334155',
                        color: '#f8fafc',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        border: '1px solid #475569'
                    }}>
                        {tag}
                        <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)} />
                    </span>
                ))}
            </div>
            <input
                className="premium-input"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

const Builder = () => {
    const { resumeData, updateSection, loadSample } = useResumeData();
    const [suggesting, setSuggesting] = useState(false);
    const [expandedProject, setExpandedProject] = useState(0);
    const [toast, setToast] = useState(null);

    const { score, improvements: allImprovements } = calculateATSScore(resumeData);
    const topImprovements = allImprovements.slice(0, 3);

    const colors = [
        { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
        { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
        { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
        { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
        { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
    ];

    const templates = [
        { name: 'Classic', desc: 'Standard & professional' },
        { name: 'Modern', desc: 'Creative sidebar layout' },
        { name: 'Minimal', desc: 'Clean & minimalist' }
    ];

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePersonalInfo = (e) => {
        const { name, value } = e.target;
        updateSection('personalInfo', { ...resumeData.personalInfo, [name]: value });
    };

    const addItem = (section, template) => {
        const newList = [...resumeData[section], template];
        updateSection(section, newList);
        if (section === 'projects') setExpandedProject(newList.length - 1);
    };

    const updateItem = (section, index, field, value) => {
        const newList = [...resumeData[section]];
        newList[index] = { ...newList[index], [field]: value };
        updateSection(section, newList);
    };

    const removeItem = (section, index) => {
        updateSection(section, resumeData[section].filter((_, i) => i !== index));
    };

    const suggestSkills = () => {
        setSuggesting(true);
        setTimeout(() => {
            const suggested = {
                technical: [...new Set([...resumeData.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                soft: [...new Set([...resumeData.skills.soft, "Team Leadership", "Problem Solving"])],
                tools: [...new Set([...resumeData.skills.tools, "Git", "Docker", "AWS"])]
            };
            updateSection('skills', suggested);
            setSuggesting(false);
        }, 1000);
    };

    const checkBulletDiscipline = (text) => {
        if (!text) return null;
        const suggestions = [];
        const actionVerbs = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];

        const lines = text.split('\n').filter(l => l.trim().length > 0);
        if (lines.length === 0) return null;

        const firstLine = lines[0].trim();
        const startsWithVerb = actionVerbs.some(verb => firstLine.toLowerCase().startsWith(verb.toLowerCase()));
        const hasNumbers = /\d+|%|X|k/i.test(text);

        if (!startsWithVerb) suggestions.push("Start with a strong action verb.");
        if (!hasNumbers) suggestions.push("Add measurable impact (numbers).");

        return suggestions;
    };

    const BulletGuidance = ({ text }) => {
        const suggestions = checkBulletDiscipline(text);
        if (!suggestions || suggestions.length === 0) return null;
        return (
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {suggestions.map((s, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#eab308' }}></div>
                        {s}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <MainLayout>
            {toast && (
                <div style={{
                    position: 'fixed', bottom: '2rem', right: '2rem', background: '#22c55e', color: '#fff',
                    padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000, animation: 'slideUp 0.3s ease'
                }}>
                    {toast}
                </div>
            )}
            <div className="builder-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
                <div className="builder-form-panel" style={{ padding: '2rem', overflowY: 'auto', borderRight: '1px solid #1e293b', background: '#0f172a' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f8fafc' }}>Resume Builder</h1>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Upgrade your professional profile</p>
                        </div>
                        <button className="premium-btn" onClick={loadSample} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', border: '1px solid #334155' }}>
                            <RefreshCw size={16} /> Load Sample Data
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Personal Info */}
                        <section>
                            <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#f1f5f9' }}>Personal Information</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input className="premium-input" name="fullName" placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfo} />
                                <input className="premium-input" name="email" placeholder="Email" value={resumeData.personalInfo.email} onChange={handlePersonalInfo} />
                                <input className="premium-input" name="phone" placeholder="Phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfo} />
                                <input className="premium-input" name="location" placeholder="Location" value={resumeData.personalInfo.location} onChange={handlePersonalInfo} />
                            </div>
                        </section>

                        {/* Social Links */}
                        <section>
                            <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#f1f5f9' }}>Social & Links</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Github size={14} style={{ position: 'absolute', left: '0.75rem', top: '1.1rem', color: '#475569' }} />
                                    <input className="premium-input" style={{ paddingLeft: '2.25rem' }} placeholder="GitHub URL" value={resumeData.links.github} onChange={(e) => updateSection('links', { ...resumeData.links, github: e.target.value })} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <LinkIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '1.1rem', color: '#475569' }} />
                                    <input className="premium-input" style={{ paddingLeft: '2.25rem' }} placeholder="LinkedIn URL" value={resumeData.links.linkedin} onChange={(e) => updateSection('links', { ...resumeData.links, linkedin: e.target.value })} />
                                </div>
                            </div>
                        </section>

                        {/* Summary */}
                        <section>
                            <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#f1f5f9' }}>Professional Summary</h3>
                            <textarea
                                className="premium-input"
                                style={{ minHeight: '120px' }}
                                placeholder="Briefly describe your professional background and key achievements..."
                                value={resumeData.summary}
                                onChange={(e) => updateSection('summary', e.target.value)}
                            />
                        </section>

                        {/* Experience */}
                        <section>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#f1f5f9' }}>Experience</h3>
                                <button className="premium-btn" onClick={() => addItem('experience', { company: '', role: '', duration: '', description: '' })}>
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            {resumeData.experience.map((exp, idx) => (
                                <div key={idx} style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '8px', marginBottom: '1rem', position: 'relative', border: '1px solid #334155' }}>
                                    <button onClick={() => removeItem('experience', idx)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8', background: 'none' }}><Trash2 size={16} /></button>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '90%' }}>
                                        <input className="premium-input" placeholder="Company Name" value={exp.company} onChange={(e) => updateItem('experience', idx, 'company', e.target.value)} />
                                        <input className="premium-input" placeholder="Job Role" value={exp.role} onChange={(e) => updateItem('experience', idx, 'role', e.target.value)} />
                                        <input className="premium-input" placeholder="Duration" value={exp.duration} onChange={(e) => updateItem('experience', idx, 'duration', e.target.value)} />
                                        <div>
                                            <textarea className="premium-input" style={{ minHeight: '100px' }} placeholder="Description..." value={exp.description} onChange={(e) => updateItem('experience', idx, 'description', e.target.value)} />
                                            <BulletGuidance text={exp.description} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Projects */}
                        <section>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#f1f5f9' }}>Projects</h3>
                                <button className="premium-btn" onClick={() => addItem('projects', { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' })}>
                                    <Plus size={16} /> Add project
                                </button>
                            </div>
                            {resumeData.projects.map((proj, idx) => (
                                <div key={idx} style={{ background: '#1e293b', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #334155', overflow: 'hidden' }}>
                                    <div
                                        onClick={() => setExpandedProject(expandedProject === idx ? -1 : idx)}
                                        style={{ padding: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: expandedProject === idx ? '#334155' : 'transparent' }}
                                    >
                                        <span style={{ fontWeight: '600', color: '#f8fafc' }}>{proj.name || `Project ${idx + 1}`}</span>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <button onClick={(e) => { e.stopPropagation(); removeItem('projects', idx); }} style={{ color: '#ef4444', background: 'none' }}><Trash2 size={16} /></button>
                                            {expandedProject === idx ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                                        </div>
                                    </div>

                                    {expandedProject === idx && (
                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #334155' }}>
                                            <input className="premium-input" placeholder="Project Title" value={proj.name} onChange={(e) => updateItem('projects', idx, 'name', e.target.value)} />

                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Description</label>
                                                    <span style={{ fontSize: '0.75rem', color: (proj.description?.length || 0) > 200 ? '#ef4444' : '#94a3b8' }}>{proj.description?.length || 0}/200</span>
                                                </div>
                                                <textarea
                                                    className="premium-input"
                                                    style={{ minHeight: '80px', width: '100%' }}
                                                    maxLength={200}
                                                    placeholder="Brief project description..."
                                                    value={proj.description}
                                                    onChange={(e) => updateItem('projects', idx, 'description', e.target.value)}
                                                />
                                                <BulletGuidance text={proj.description} />
                                            </div>

                                            <div>
                                                <label style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Tech Stack</label>
                                                <TagInput tags={proj.techStack || []} setTags={(tags) => updateItem('projects', idx, 'techStack', tags)} placeholder="Type tech & press Enter" />
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <div style={{ position: 'relative' }}>
                                                    <LinkIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '1.1rem', color: '#475569' }} />
                                                    <input className="premium-input" style={{ paddingLeft: '2.25rem' }} placeholder="Live URL" value={proj.liveUrl} onChange={(e) => updateItem('projects', idx, 'liveUrl', e.target.value)} />
                                                </div>
                                                <div style={{ position: 'relative' }}>
                                                    <Github size={14} style={{ position: 'absolute', left: '0.75rem', top: '1.1rem', color: '#475569' }} />
                                                    <input className="premium-input" style={{ paddingLeft: '2.25rem' }} placeholder="GitHub URL" value={proj.githubUrl} onChange={(e) => updateItem('projects', idx, 'githubUrl', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>

                        {/* Skills */}
                        <section>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#f1f5f9' }}>Skills</h3>
                                <button className="premium-btn" disabled={suggesting} onClick={suggestSkills} style={{ background: '#1e293b', border: '1px solid #475569', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                                    <Sparkles size={14} /> {suggesting ? "Suggesting..." : "Suggest Skills"}
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginBottom: '0.75rem', display: 'block' }}>Technical Skills ({resumeData.skills.technical.length})</label>
                                    <TagInput tags={resumeData.skills.technical} setTags={(tags) => updateSection('skills', { ...resumeData.skills, technical: tags })} placeholder="Add technical skill..." />
                                </div>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginBottom: '0.75rem', display: 'block' }}>Soft Skills ({resumeData.skills.soft.length})</label>
                                    <TagInput tags={resumeData.skills.soft} setTags={(tags) => updateSection('skills', { ...resumeData.skills, soft: tags })} placeholder="Add soft skill..." />
                                </div>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginBottom: '0.75rem', display: 'block' }}>Tools & Technologies ({resumeData.skills.tools.length})</label>
                                    <TagInput tags={resumeData.skills.tools} setTags={(tags) => updateSection('skills', { ...resumeData.skills, tools: tags })} placeholder="Add tool..." />
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#f1f5f9' }}>Education</h3>
                                <button className="premium-btn" onClick={() => addItem('education', { school: '', degree: '', year: '' })}>
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            {resumeData.education.map((edu, idx) => (
                                <div key={idx} style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '8px', marginBottom: '1rem', position: 'relative', border: '1px solid #334155' }}>
                                    <button onClick={() => removeItem('education', idx)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8', background: 'none' }}><Trash2 size={16} /></button>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '90%' }}>
                                        <input className="premium-input" placeholder="School" value={edu.school} onChange={(e) => updateItem('education', idx, 'school', e.target.value)} />
                                        <input className="premium-input" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', idx, 'degree', e.target.value)} />
                                        <input className="premium-input" placeholder="Year" value={edu.year} onChange={(e) => updateItem('education', idx, 'year', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* ATS Score Section */}
                        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500' }}>ATS Readiness Score</span>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: score > 70 ? '#22c55e' : (score > 40 ? '#eab308' : '#ef4444'), lineHeight: '1' }}>
                                        {score}<span style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '400' }}>/100</span>
                                    </div>
                                </div>
                                <div style={{ width: '80px', height: '80px', position: 'relative' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0f172a" strokeWidth="3" />
                                        <path strokeDasharray={`${score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={score > 70 ? '#22c55e' : (score > 40 ? '#eab308' : '#ef4444')} strokeWidth="3" strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.8s' }} />
                                    </svg>
                                </div>
                            </div>
                            {topImprovements.length > 0 && (
                                <div style={{ borderTop: '1px solid #334155', paddingTop: '1.25rem' }}>
                                    <p style={{ color: '#f8fafc', fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: '600' }}>Top 3 Improvements</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {topImprovements.map((imp, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.85rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                                                <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#94a3b8' }}>{i + 1}</div>
                                                {imp.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ height: '4rem' }}></div>
                    </div>
                </div>

                {/* --- PREVIEW PANEL --- */}
                <div className="preview-panel" style={{ background: '#1e293b', padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '800px' }}>

                        {/* Customization Toolset */}
                        <div style={{ background: '#111827', padding: '1.5rem', borderRadius: '12px', border: '1px solid #374151', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h4 style={{ color: '#f8fafc', fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>Select Template</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pick a layout that fits your industry</p>
                                </div>
                                <button
                                    onClick={() => showToast('PDF export ready! Check your downloads.')}
                                    style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}
                                >
                                    Download PDF
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                {templates.map(t => (
                                    <div
                                        key={t.name}
                                        onClick={() => updateSection('template', t.name)}
                                        style={{
                                            cursor: 'pointer', position: 'relative', borderRadius: '10px', overflow: 'hidden', padding: '0.5rem',
                                            border: `2px solid ${resumeData.template === t.name ? '#3b82f6' : '#374151'}`,
                                            background: resumeData.template === t.name ? '#1e293b' : 'transparent',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: resumeData.template === t.name ? 'translateY(-4px)' : 'none'
                                        }}
                                    >
                                        <div style={{ height: '80px', background: '#374151', borderRadius: '6px', marginBottom: '0.5rem', position: 'relative', border: '1px solid #4b5563' }}>
                                            {/* Minimal Sketch of layout */}
                                            {t.name === 'Classic' && <div style={{ padding: '10px' }}>
                                                <div style={{ height: '4px', width: '60%', background: '#6b7280', margin: '0 auto 8px' }}></div>
                                                <hr style={{ border: 'none', borderTop: '1.5px solid #4b5563', margin: '8px 0' }} />
                                                <div style={{ height: '3px', width: '100%', background: '#4b5563', marginBottom: '4px' }}></div>
                                                <div style={{ height: '3px', width: '100%', background: '#4b5563' }}></div>
                                            </div>}
                                            {t.name === 'Modern' && <div style={{ display: 'flex', height: '100%' }}>
                                                <div style={{ width: '30%', background: resumeData.themeColor, height: '100%' }}></div>
                                                <div style={{ flex: 1, padding: '10px' }}>
                                                    <div style={{ height: '4px', width: '80%', background: '#6b7280', marginBottom: '10px' }}></div>
                                                    <div style={{ height: '3px', width: '100%', background: '#4b5563', marginBottom: '4px' }}></div>
                                                    <div style={{ height: '3px', width: '100%', background: '#4b5563' }}></div>
                                                </div>
                                            </div>}
                                            {t.name === 'Minimal' && <div style={{ padding: '15px' }}>
                                                <div style={{ height: '6px', width: '40%', background: '#6b7280', marginBottom: '12px' }}></div>
                                                <div style={{ height: '3px', width: '100%', background: '#4b5563', marginBottom: '4px' }}></div>
                                                <div style={{ height: '3px', width: '100%', background: '#4b5563' }}></div>
                                            </div>}
                                        </div>
                                        <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>{t.name}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.65rem', textAlign: 'center' }}>{t.desc}</div>
                                        {resumeData.template === t.name && (
                                            <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#3b82f6', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid #374151', paddingTop: '1.5rem' }}>
                                <h4 style={{ color: '#f8fafc', fontWeight: '700', fontSize: '0.85rem', marginBottom: '1rem' }}>Theme Color</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {colors.map(c => (
                                        <button
                                            key={c.name}
                                            onClick={() => updateSection('themeColor', c.value)}
                                            title={c.name}
                                            style={{
                                                width: '32px', height: '32px', borderRadius: '50%', background: c.value, border: resumeData.themeColor === c.value ? '3px solid #fff' : 'none',
                                                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                transform: resumeData.themeColor === c.value ? 'scale(1.2)' : 'none',
                                                boxShadow: resumeData.themeColor === c.value ? `0 0 15px ${c.value}` : 'none'
                                            }}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                            Live Preview ({resumeData.template})
                        </div>
                        <ResumePreview data={resumeData} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Builder;
