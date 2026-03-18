import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, LogOut } from 'lucide-react';

const DashboardLayout = ({ role, navItems, activeSection, onNavClick, onLogout, children }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const handleNav = (id) => {
        onNavClick(id);
        if (isMobile) setIsMobileMenuOpen(false);
    };

    return (
        <div className="modern-dashboard layout-solid">
            {/* Mobile Header */}
            {isMobile && (
                <header className="mobile-dash-header">
                    <div className="mobile-brand">
                        Astradex
                        <span className="role-pill">{role} Panel</span>
                    </div>
                    <button 
                        className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Dashboard Menu"
                        style={{ display: 'flex' }}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </header>
            )}

            {/* Sidebar */}
            <aside 
                className={`dash-sidebar ${isMobile ? 'mobile' : 'desktop'} ${isMobileMenuOpen ? 'open' : ''}`}
            >
                {!isMobile && (
                    <div className="dash-brand" style={{ justifyContent: 'center', padding: '2rem 0', borderBottom: 'none' }}>
                        <div className="brand-logo" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--brand-main)' }}>A</div>
                    </div>
                )}

                <nav className="dash-nav" style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ul style={{ width: '100%', gap: '1.5rem', alignItems: 'center' }}>
                        {navItems.map(item => (
                            <li key={item.id} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button
                                    onClick={() => handleNav(item.id)}
                                    className={`dash-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                                    style={{ justifyContent: 'center', padding: '1rem', width: 'auto', borderRadius: '16px' }}
                                    title={item.label}
                                >
                                    <span className="nav-icon" style={{ fontSize: '1.5rem', margin: 0 }}>{item.icon}</span>
                                    {activeSection === item.id && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="active-indicator-pill"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            style={{ borderRadius: '16px' }}
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="dash-footer" style={{ padding: '1.5rem 0', borderTop: 'none', display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => {
                        onLogout();
                        navigate('/login');
                    }} className="logout-btn" style={{ justifyContent: 'center', padding: '1rem', width: 'auto', borderRadius: '50%', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }} title="Logout">
                        <span className="nav-icon" style={{ margin: 0, display: 'flex' }}><LogOut size={24} /></span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobile && isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Main Content Area */}
            <main className="dash-main">
                <header className="dash-global-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem 0', background: 'transparent' }}>
                    <div className="global-greeting">
                        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>Hello, {role}</h2>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome back to your dashboard</p>
                    </div>
                    <div className="global-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div className="search-container" style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', width: '280px', boxShadow: 'var(--shadow-soft)' }}>
                            <input type="text" placeholder="Search Class" style={{ flex: 1, border: 'none', padding: '0.8rem 1rem', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
                            <button style={{ width: '45px', height: '45px', background: 'var(--brand-main)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Search size={20} />
                            </button>
                        </div>
                        <button className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={20} />
                        </button>
                        <div className="profile-btn" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-main), #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            {role.charAt(0)}
                        </div>
                    </div>
                </header>
                <div className="dash-content-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="dash-animate-wrapper"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
