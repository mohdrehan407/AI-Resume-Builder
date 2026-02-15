
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const Home = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                }}>
                    Build a Resume That Gets Read.
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
                    An AI-powered builder designed to bypass filtering algorithms and catch the human recruiter's eye with precision.
                </p>
                <button
                    className="premium-btn"
                    style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
                    onClick={() => navigate('/builder')}
                >
                    Start Building
                </button>
            </div>
        </MainLayout>
    );
};

export default Home;
