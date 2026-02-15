
import { useState, useEffect } from 'react';

const STEPS = [
  { id: 1, name: 'Problem', path: '/rb/01-problem' },
  { id: 2, name: 'Market', path: '/rb/02-market' },
  { id: 3, name: 'Architecture', path: '/rb/03-architecture' },
  { id: 4, name: 'HLD', path: '/rb/04-hld' },
  { id: 5, name: 'LLD', path: '/rb/05-lld' },
  { id: 6, name: 'Build', path: '/rb/06-build' },
  { id: 7, name: 'Test', path: '/rb/07-test' },
  { id: 8, name: 'Ship', path: '/rb/08-ship' }
];

export function useBuildSystem(currentStepId) {
  const [artifact, setArtifact] = useState(null);
  const [status, setStatus] = useState('pending'); // pending, success, error

  useEffect(() => {
    if (!currentStepId) return;
    const key = `rb_step_${currentStepId}_artifact`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setArtifact(saved);
      setStatus('success');
    } else {
      setArtifact(null);
      setStatus('pending');
    }
  }, [currentStepId]);

  const saveArtifact = (data) => {
    if (!currentStepId) return;
    const key = `rb_step_${currentStepId}_artifact`;
    localStorage.setItem(key, data);
    setArtifact(data);
    setStatus('success');
  };

  const getStepStatus = (stepId) => {
    const key = `rb_step_${stepId}_artifact`;
    return localStorage.getItem(key) ? 'completed' : 'locked';
  };
  
  // Unlock logic: previous step must be completed
  const isStepAccessible = (stepId) => {
    if (stepId === 1) return true;
    const prevKey = `rb_step_${stepId - 1}_artifact`;
    return !!localStorage.getItem(prevKey);
  };

  return {
    steps: STEPS,
    currentArtifact: artifact,
    saveArtifact,
    status,
    isStepAccessible,
    getStepStatus
  };
}
