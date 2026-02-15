export const calculateATSScore = (data) => {
    let score = 0;
    const improvements = [];
    const { personalInfo, summary, experience, education, projects, skills, links } = data;

    // 1. Name (+10)
    if (personalInfo.fullName?.trim()) {
        score += 10;
    } else {
        improvements.push({ type: 'personalInfo', text: 'Add your full name (+10 points)', points: 10 });
    }

    // 2. Email (+10)
    if (personalInfo.email?.trim()) {
        score += 10;
    } else {
        improvements.push({ type: 'personalInfo', text: 'Add your email address (+10 points)', points: 10 });
    }

    // 3. Summary length > 50 chars (+10)
    if (summary?.trim().length > 50) {
        score += 10;
    } else {
        improvements.push({ type: 'summary', text: 'Add a professional summary > 50 chars (+10 points)', points: 10 });
    }

    // 4. Case for action verbs (+10)
    const actionVerbs = ['built', 'led', 'designed', 'implemented', 'improved', 'created', 'optimized', 'automated', 'developed', 'managed'];
    const hasActionVerbs = actionVerbs.some(verb => summary?.toLowerCase().includes(verb));
    if (hasActionVerbs) {
        score += 10;
    } else {
        improvements.push({ type: 'summary', text: 'Include action verbs in summary (+10 points)', points: 10 });
    }

    // 5. Experience with bullets (+15)
    if (experience?.length > 0) {
        const hasBullets = experience.some(exp => exp.description?.includes('\n') || exp.description?.includes('-') || exp.description?.includes('•'));
        if (hasBullets) {
            score += 15;
        } else {
            improvements.push({ type: 'experience', text: 'Use bullet points in experience descriptions (+15 points)', points: 15 });
        }
    } else {
        improvements.push({ type: 'experience', text: 'Add at least one work experience entry (+15 points)', points: 15 });
    }

    // 6. Education (+10)
    if (education?.length > 0) {
        score += 10;
    } else {
        improvements.push({ type: 'education', text: 'Add your education details (+10 points)', points: 10 });
    }

    // 7. Skills >= 5 (+10)
    const totalSkills = (skills.technical?.length || 0) + (skills.soft?.length || 0) + (skills.tools?.length || 0);
    if (totalSkills >= 5) {
        score += 10;
    } else {
        improvements.push({ type: 'skills', text: 'Add at least 5 skills (+10 points)', points: 10 });
    }

    // 8. Project (+10)
    if (projects?.length > 0) {
        score += 10;
    } else {
        improvements.push({ type: 'projects', text: 'Add at least one project (+10 points)', points: 10 });
    }

    // 9. Phone (+5)
    if (personalInfo.phone?.trim()) {
        score += 5;
    } else {
        improvements.push({ type: 'personalInfo', text: 'Add your phone number (+5 points)', points: 5 });
    }

    // 10. LinkedIn (+5)
    if (links.linkedin?.trim()) {
        score += 5;
    } else {
        improvements.push({ type: 'links', text: 'Add your LinkedIn profile (+5 points)', points: 5 });
    }

    // 11. GitHub (+5)
    if (links.github?.trim()) {
        score += 5;
    } else {
        improvements.push({ type: 'links', text: 'Add your GitHub profile (+5 points)', points: 5 });
    }

    return {
        score: Math.min(score, 100),
        improvements: improvements.sort((a, b) => b.points - a.points)
    };
};
