
import { useState, useEffect } from 'react';

const INITIAL_DATA = {
    template: 'Classic',
    themeColor: 'hsl(168, 60%, 40%)',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    links: {
        github: '',
        linkedin: '',
    }
};

const SAMPLE_DATA = {
    template: 'Modern',
    themeColor: 'hsl(220, 60%, 35%)',
    personalInfo: {
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
    },
    summary: 'Innovative Software Engineer with 5+ years of experience in building scalable web applications. Passionate about AI integration and user-centric design.',
    education: [
        { school: 'Tech Institute of California', degree: 'B.S. Computer Science', year: '2018' }
    ],
    experience: [
        { company: 'CloudScale AI', role: 'Senior Developer', duration: '2021 - Present', description: 'Led the development of a real-time analytics dashboard using React and Node.js.' },
        { company: 'WebFlow Systems', role: 'Frontend Engineer', duration: '2018 - 2021', description: 'Optimized frontend performance by 40% using advanced caching techniques.' }
    ],
    projects: [
        {
            name: 'AI Resume Scanner',
            description: 'Developed an NLP-based tool to match resumes with job descriptions.',
            techStack: ['Python', 'NLP', 'React', 'FastAPI'],
            liveUrl: 'https://scanner.ai',
            githubUrl: 'https://github.com/alex/scanner'
        }
    ],
    skills: {
        technical: ['React', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['AWS', 'Docker', 'Git']
    },
    links: {
        github: 'github.com/alexrivera',
        linkedin: 'linkedin.com/in/alexrivera',
    }
};

export function useResumeData() {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData');
        if (!saved) return INITIAL_DATA;

        try {
            const parsed = JSON.parse(saved);
            // Simple migration for skills if it's still a string
            if (typeof parsed.skills === 'string') {
                parsed.skills = {
                    technical: parsed.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
                    soft: [],
                    tools: []
                };
            }
            // Migration for projects to ensure techStack and URLs exist
            if (Array.isArray(parsed.projects)) {
                parsed.projects = parsed.projects.map(p => ({
                    ...p,
                    techStack: p.techStack || [],
                    liveUrl: p.liveUrl || '',
                    githubUrl: p.githubUrl || ''
                }));
            }
            return { ...INITIAL_DATA, ...parsed };
        } catch (e) {
            return INITIAL_DATA;
        }
    });

    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    const updateSection = (section, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const loadSample = () => {
        setResumeData(SAMPLE_DATA);
    };

    return {
        resumeData,
        updateSection,
        loadSample
    };
}
