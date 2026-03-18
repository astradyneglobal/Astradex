import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedCounter, SkeletonLoader } from '../components/UIUtils';
import DashboardLayout from '../components/DashboardLayout';
import { LayoutDashboard, Users, BookOpen, TrendingUp, Settings } from 'lucide-react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        const loggedIn = localStorage.getItem("loggedIn");

        if (!loggedIn || role !== "admin") {
            navigate("/login");
        }
    }, [navigate]);

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'User Management', icon: <Users size={20} /> },
        { id: 'courses', label: 'Course Management', icon: <BookOpen size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    const [loading] = useState(false);
    const stats = [
        { label: 'Total Students', value: 1240, color: 'var(--brand-main)' },
        { label: 'Total Staff', value: 45, color: '#22c55e' },
        { label: 'Active Courses', value: 12, color: '#f59e0b' },
        { label: 'Monthly Revenue', value: 1250000, color: '#ef4444', prefix: '₹' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.div variants={itemVariants} className="dash-hero-banner">
                            <div className="dash-hero-content">
                                <span className="dash-hero-badge">System Status: Optimal</span>
                                <h2 className="dash-hero-title">Platform insights at a glance</h2>
                                <p className="dash-hero-text">View real-time analytics for students, staff, and revenue to make data-driven decisions today.</p>
                                <button className="btn-primary" style={{ background: '#fff', color: 'var(--brand-main)', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>Generate Detailed Report</button>
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="dashboard-grid cols-4">
                            {loading
                                ? Array(4).fill(0).map((_, i) => <SkeletonLoader key={i} height={120} />)
                                : stats.map((stat, i) => (
                                    <div key={i} className="metric-card">
                                        <div className="metric-header">
                                            <h4 className="metric-title">{stat.label}</h4>
                                            <span style={{ fontSize: '1.2rem', background: `${stat.color}20`, color: stat.color, padding: '0.2rem 0.6rem', borderRadius: '8px' }}>📈</span>
                                        </div>
                                        <p className="metric-value" style={{ color: stat.color }}>
                                            {stat.prefix || ''}<AnimatedCounter value={stat.value} />
                                        </p>
                                    </div>
                                ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="dashboard-grid cols-2" style={{ marginTop: '1.5rem' }}>
                            <div className="metric-card" style={{ height: '350px' }}>
                                <div className="metric-header">
                                    <h3 className="metric-title" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Traffic Analytics</h3>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4%', padding: '1rem 0 2rem' }}>
                                    {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                                            style={{ flex: 1, background: 'var(--brand-main)', borderRadius: '4px 4px 0 0', position: 'relative' }}
                                        >
                                            <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>D{i+1}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-header">
                                    <h3 className="metric-title" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Recent Activity</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '3px solid var(--brand-main)' }}>
                                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>New student registered: Ashwath (10th Board)</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>2 mins ago</span>
                                    </li>
                                    <li style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '3px solid #10b981' }}>
                                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>Payment received from 120 students today</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Today</span>
                                    </li>
                                    <li style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '3px solid #f59e0b' }}>
                                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>Staff meeting scheduled for tomorrow at 10 AM</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>4 hours ago</span>
                                    </li>
                                    <li style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '3px solid #c026d3' }}>
                                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>New course added: 12th CBSE Physics Special</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Yesterday</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                );

            case 'users':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem', marginTop: 0 }}>User Management</motion.h2>
                        
                        <motion.div variants={itemVariants} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}>+ Add New User</button>
                            <input
                                type="text"
                                placeholder="Search users by name, email, or role..."
                                style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)', flex: 1, background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="metric-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        <th style={{ padding: '0 1rem 1rem' }}>Name</th>
                                        <th style={{ padding: '0 1rem 1rem' }}>Role</th>
                                        <th style={{ padding: '0 1rem 1rem' }}>Status</th>
                                        <th style={{ padding: '0 1rem 1rem', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Dr. Kavita Rao', role: 'Staff', status: 'Active' },
                                        { name: 'Ashwath', role: 'Student', status: 'Active' },
                                        { name: 'Rahul Sharma', role: 'Student', status: 'Pending' },
                                        { name: 'Prof. S. Kumar', role: 'Staff', status: 'Inactive' },
                                    ].map((u, i) => (
                                        <motion.tr 
                                            key={i} 
                                            whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
                                            style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                                        >
                                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>{u.name}</td>
                                            <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{u.role}</td>
                                            <td style={{ padding: '1.2rem 1rem' }}>
                                                <span style={{
                                                    padding: '0.3rem 0.8rem',
                                                    borderRadius: '2rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    background: u.status === 'Active' ? 'rgba(34, 197, 94, 0.15)' : u.status === 'Pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                    color: u.status === 'Active' ? '#22c55e' : u.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                                }}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                                                <button style={{ background: 'rgba(56, 189, 248, 0.1)', border: 'none', color: 'var(--brand-main)', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '8px', marginRight: '0.5rem', fontWeight: 600 }}>Edit</button>
                                                <button style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: 600 }}>Delete</button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                );

            case 'courses':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h2 className="heading-medium" style={{ margin: 0, fontSize: '2rem' }}>Course Management</h2>
                            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}>+ Create New Course</button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="dashboard-grid cols-3">
                            {[
                                { title: '10th Board Math', students: 450, staff: 'S. Kumar', color: 'var(--brand-main)' },
                                { title: '12th Physics', students: 320, staff: 'Kavita Rao', color: '#c026d3' },
                                { title: '8th Science', students: 180, staff: 'M. Gupta', color: '#10b981' },
                            ].map((c, i) => (
                                <motion.div 
                                    key={i} 
                                    className="metric-card"
                                    style={{ borderTop: `4px solid ${c.color}` }}
                                >
                                    <h3 className="course-title" style={{ fontSize: '1.25rem', marginTop: 0 }}>{c.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Staff</span>
                                            <strong style={{ color: 'var(--text-primary)' }}>{c.staff}</strong>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Active Students</span>
                                            <strong style={{ color: 'var(--text-primary)' }}>{c.students}</strong>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem', borderRadius: '8px' }}>Manage</button>
                                        <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>Disable</button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                );

            case 'analytics':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="modern-card glass-panel">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginTop: 0 }}>System Analytics</motion.h2>
                        
                        <motion.div variants={itemVariants} style={{ height: '350px', display: 'flex', alignItems: 'flex-end', gap: '2%', padding: '2rem 1rem', background: 'var(--bg-secondary)', borderRadius: '16px', marginTop: '2rem', border: '1px solid var(--border-color)' }}>
                            {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                                    style={{ flex: 1, background: 'linear-gradient(to top, var(--brand-main), var(--brand-glow))', borderRadius: '6px 6px 0 0', position: 'relative', boxShadow: '0 0 20px rgba(56,189,248,0.2)' }}
                                >
                                    <span style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Day {i + 1}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                        <p style={{ marginTop: '3.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>Daily User Traffic Analysis (Current Week)</p>
                    </motion.div>
                );

            case 'settings':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="metric-card" style={{ maxWidth: '600px' }}>
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginTop: 0 }}>Global Settings</motion.h2>
                        
                        <motion.div variants={itemVariants} style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Site Name</label>
                                <input type="text" defaultValue="Astradex Learning" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Contact Email</label>
                                <input type="email" defaultValue="admin@astradex.com" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                            </div>
                            
                            <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>Open Registration</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Allow new users to sign up via the homepage.</p>
                                </div>
                                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                    <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                                    <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--brand-main)', borderRadius: '34px', transition: '0.4s' }}>
                                        <span style={{ position: 'absolute', content: '""', height: '20px', width: '20px', left: '26px', bottom: '4px', backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' }}></span>
                                    </span>
                                </label>
                            </div>

                            <button className="btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 2rem', borderRadius: '12px', marginTop: '1rem' }}>Save Changes</button>
                        </motion.div>
                    </motion.div>
                );

            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <DashboardLayout 
            role="Admin"
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={setActiveSection}
            onLogout={() => localStorage.clear()}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default AdminDashboard;
