import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleHashLink = (e, target) => {
        if (location.pathname !== '/') {
            // If not on homepage, navigate to homepage + hash
            navigate('/' + target);
        } else if (target === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <header className="navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', boxSizing: 'border-box' }}>
            <div className="brand">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img
                        src={theme === 'light' ? logoLight : logoDark}
                        alt="Astradex Logo"
                        style={{ height: '40px', objectFit: 'contain' }}
                    />
                </Link>
            </div>

            <nav className={menuOpen ? 'nav-menu open' : 'nav-menu'}>
                <ul>
                    {['Home', 'Courses', 'Faculty', 'About', 'Contact'].map((link) => (
                        <li key={link}>
                            {link === 'Courses' ? (
                                <Link to="/courses" onClick={() => setMenuOpen(false)}>
                                    {link}
                                </Link>
                            ) : (
                                <a
                                    href={link === 'Home' ? '#' : `/#${link.toLowerCase().replace(' ', '-')}`}
                                    onClick={(e) => handleHashLink(e, link === 'Home' ? '#' : `#${link.toLowerCase().replace(' ', '-')}`)}
                                >
                                    {link}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                        className="btn-secondary"
                        style={{
                            padding: '0 1rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            textDecoration: 'none',
                            border: '2px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '34px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginLeft: '4px', transform: loginDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    {loginDropdownOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                right: 0,
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-elevated)',
                                padding: '0.5rem',
                                minWidth: '140px',
                                zIndex: 1001,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}
                        >
                            {['Student', 'Staff', 'Admin'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => {
                                        setLoginDropdownOpen(false);
                                        navigate(`/login?role=${role.toLowerCase()}`);
                                    }}
                                    style={{
                                        padding: '0.6rem 1rem',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
                                    onMouseLeave={(e) => e.target.style.background = 'none'}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={toggleTheme}
                    className="btn-secondary"
                    style={{
                        padding: '0',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--border-color)',
                        background: 'transparent'
                    }}
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    )}
                </button>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    aria-label="Toggle menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
