
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="app-container">
            <nav className="main-nav">
                <div className="nav-logo">
                    <Link to="/">AI Resume Builder</Link>
                </div>
                <div className="nav-links">
                    <NavLink to="/builder" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Builder</NavLink>
                    <NavLink to="/preview" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Preview</NavLink>
                    <NavLink to="/proof" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Proof</NavLink>
                </div>
            </nav>
            <main className="content-area">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
