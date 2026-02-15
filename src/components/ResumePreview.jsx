import { Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const ResumePreview = ({ data, minimal = false }) => {
    const {
        personalInfo, summary, education, experience,
        projects, skills, links, template = 'Classic',
        themeColor = 'hsl(168, 60%, 40%)'
    } = data;

    const baseFont = template === 'Classic' ? '"Libre Baskerville", serif' : '"Inter", sans-serif';
    const headingFont = template === 'Minimal' ? '"Inter", sans-serif' : (template === 'Modern' ? '"Inter", sans-serif' : '"Libre Baskerville", serif');

    const containerStyle = {
        background: '#fff',
        color: '#1a1a1a',
        width: '100%',
        minHeight: minimal ? '100%' : '29.7cm',
        boxShadow: minimal ? 'none' : '0 10px 25px rgba(0,0,0,0.3)',
        fontFamily: baseFont,
        fontSize: minimal ? '0.7rem' : (template === 'Minimal' ? '0.85rem' : '0.9rem'),
        lineHeight: '1.6',
        position: 'relative',
        display: template === 'Modern' ? 'flex' : 'block',
        overflow: 'hidden'
    };

    const sectionTitleStyle = {
        fontFamily: headingFont,
        fontSize: template === 'Minimal' ? '0.8rem' : '0.9rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: template === 'Modern' ? themeColor : (template === 'Classic' ? themeColor : '#000'),
        marginBottom: '0.75rem',
        marginTop: template === 'Minimal' ? '1.5rem' : '1.25rem',
        borderBottom: template === 'Classic' ? `2px solid ${themeColor}` : 'none',
        paddingBottom: template === 'Classic' ? '0.2rem' : '0'
    };

    // Shared Components
    const ContactLink = ({ icon: Icon, text, link }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
            <Icon size={12} color={template === 'Modern' ? '#fff' : '#666'} />
            {link ? <a href={link} style={{ color: 'inherit', textDecoration: 'none' }}>{text}</a> : <span>{text}</span>}
        </div>
    );

    const ExperienceItem = ({ item }) => (
        <div style={{ marginBottom: '1.25rem', breakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#111' }}>
                <span>{item.company}</span>
                <span style={{ fontWeight: '500', color: '#666', fontSize: '0.8rem' }}>{item.duration}</span>
            </div>
            <div style={{ fontStyle: 'italic', marginBottom: '0.4rem', color: '#444', fontSize: '0.85rem' }}>{item.role}</div>
            <p style={{ margin: 0, color: '#333', whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>{item.description}</p>
        </div>
    );

    const ProjectItem = ({ item }) => (
        <div style={{ marginBottom: '1.25rem', breakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <div style={{ fontWeight: '700', color: '#111' }}>{item.name}</div>
                <div style={{ display: 'flex', gap: '0.6rem' }} className="no-print">
                    {item.githubUrl && <a href={item.githubUrl} style={{ color: '#666' }}><Github size={12} /></a>}
                    {item.liveUrl && <a href={item.liveUrl} style={{ color: '#666' }}><ExternalLink size={12} /></a>}
                </div>
            </div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#444', fontSize: '0.85rem' }}>{item.description}</p>
            {item.techStack?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {item.techStack.map((tech, i) => (
                        <span key={i} style={{
                            background: '#f1f5f9', color: '#475569', padding: '0.1rem 0.4rem',
                            borderRadius: '3px', fontSize: '0.65rem', fontWeight: '600', border: '1px solid #e2e8f0'
                        }}>{tech}</span>
                    ))}
                </div>
            )}
        </div>
    );

    // --- TEMPLATE: MODERN (Two Column) ---
    if (template === 'Modern') {
        return (
            <div style={containerStyle} className="resume-container">
                {/* Sidebar */}
                <div style={{ width: '32%', background: themeColor, color: '#fff', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem', fontFamily: '"Inter", sans-serif' }}>
                        {personalInfo.fullName || 'Full Name'}
                    </h1>

                    <div style={{ marginBottom: '2rem' }}>
                        <ContactLink icon={Mail} text={personalInfo.email} />
                        <ContactLink icon={Phone} text={personalInfo.phone} />
                        <ContactLink icon={MapPin} text={personalInfo.location} />
                        {links.github && <ContactLink icon={Github} text="GitHub" link={links.github} />}
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ ...sectionTitleStyle, color: '#fff', border: 'none', marginTop: 0 }}>Skills</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['technical', 'soft', 'tools'].map(cat => (
                                skills[cat]?.length > 0 && (
                                    <div key={cat}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.4rem' }}>{cat}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                            {skills[cat].map((s, i) => (
                                                <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.15rem 0.4rem', borderRadius: '3px', fontSize: '0.7rem' }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: '2rem', background: '#fff' }}>
                    {summary && (
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={sectionTitleStyle}>Profile</div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#333' }}>{summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div>
                            <div style={sectionTitleStyle}>Experience</div>
                            {experience.map((exp, idx) => <ExperienceItem key={idx} item={exp} />)}
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div>
                            <div style={sectionTitleStyle}>Projects</div>
                            {projects.map((proj, idx) => <ProjectItem key={idx} item={proj} />)}
                        </div>
                    )}

                    {education.length > 0 && (
                        <div>
                            <div style={sectionTitleStyle}>Education</div>
                            {education.map((edu, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: '700', color: '#111' }}>{edu.school}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span>{edu.degree}</span>
                                        <span style={{ color: '#666' }}>{edu.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- TEMPLATE: CLASSIC & MINIMAL (Single Column) ---
    return (
        <div style={{ ...containerStyle, padding: template === 'Minimal' ? '3rem' : '2.5rem' }} className="resume-container">
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem', fontWeight: template === 'Minimal' ? '800' : '900',
                    color: template === 'Minimal' ? themeColor : '#000', marginBottom: '0.5rem',
                    fontFamily: headingFont
                }}>
                    {personalInfo.fullName || 'Full Name'}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#555' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {summary && (
                <div style={{ marginBottom: '1.5rem', borderLeft: template === 'Minimal' ? `4px solid ${themeColor}` : 'none', paddingLeft: template === 'Minimal' ? '1rem' : 0 }}>
                    {template !== 'Minimal' && <div style={sectionTitleStyle}>Professional Summary</div>}
                    <p style={{ margin: 0, fontStyle: template === 'Minimal' ? 'italic' : 'normal' }}>{summary}</p>
                </div>
            )}

            {experience.length > 0 && (
                <div>
                    <div style={sectionTitleStyle}>Work Experience</div>
                    {experience.map((exp, idx) => <ExperienceItem key={idx} item={exp} />)}
                </div>
            )}

            {projects.length > 0 && (
                <div>
                    <div style={sectionTitleStyle}>Key Projects</div>
                    {projects.map((proj, idx) => <ProjectItem key={idx} item={proj} />)}
                </div>
            )}

            {skills && (
                <div>
                    <div style={sectionTitleStyle}>Expertise</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['technical', 'soft', 'tools'].map(cat => (
                            skills[cat]?.length > 0 && (
                                <div key={cat} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: '700', minWidth: '100px', color: themeColor }}>{cat}:</span>
                                    <span>{skills[cat].join(', ')}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {education.length > 0 && (
                <div>
                    <div style={sectionTitleStyle}>Education</div>
                    {education.map((edu, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div>
                                <span style={{ fontWeight: '700' }}>{edu.school}</span> — <span>{edu.degree}</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>{edu.year}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumePreview;
