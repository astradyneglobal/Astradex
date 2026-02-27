import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedCounter, SkeletonLoader, EmptyState } from '../components/UIUtils';

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
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'courses', label: 'Course Management', icon: '📚' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    const [loading] = useState(false); // Placeholder for future API loading state
    const stats = [
        { label: 'Total Students', value: 1240, color: 'var(--brand-main)' },
        { label: 'Total Staff', value: 45, color: '#22c55e' },
        { label: 'Active Courses', value: 12, color: '#f59e0b' },
        { label: 'Monthly Revenue', value: 1250000, color: '#ef4444', prefix: '₹' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Admin Overview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                            {loading
                                ? Array(4).fill(0).map((_, i) => <SkeletonLoader key={i} height={80} />)
                                : stats.map((stat, i) => (
                                    <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <h4 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{stat.label}</h4>
                                        <p style={{ fontSize: '2rem', fontWeight: 900, margin: '0.5rem 0', color: stat.color }}>
                                            {stat.prefix || ''}<AnimatedCounter value={stat.value} />
                                        </p>
                                    </div>
                                ))}
                        </div>

                        <div className="card" style={{ marginTop: '2rem' }}>
                            <h3 className="course-title">Recent Activity</h3>
                            <ul className="highlight-list">
                                <li>New student registered: Ashwath (10th Board)</li>
                                <li>New course added: 12th CBSE Physics Special</li>
                                <li>Staff meeting scheduled for tomorrow at 10 AM</li>
                                <li>Payment received from 120 students today</li>
                            </ul>
                        </div>
                    </div>
                );

            case 'users':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>User Management</h2>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>+ Add New User</button>
                            <input
                                type="text"
                                placeholder="Search users..."
                                style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1 }}
                            />
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Dr. Kavita Rao', role: 'Staff', status: 'Active' },
                                    { name: 'Ashwath', role: 'Student', status: 'Active' },
                                    { name: 'Rahul Sharma', role: 'Student', status: 'Pending' },
                                    { name: 'Prof. S. Kumar', role: 'Staff', status: 'Inactive' },
                                ].map((u, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{u.name}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{u.role}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                background: u.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : u.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: u.status === 'Active' ? '#22c55e' : u.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                            }}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--brand-main)', cursor: 'pointer', marginRight: '0.5rem' }}>Edit</button>
                                            <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'courses':
                return (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem', margin: 0 }}>Course Management</h2>
                            <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>+ Create New Course</button>
                        </div>
                        <div className="courses-grid" style={{ marginTop: '2rem' }}>
                            {[
                                { title: '10th Board Math', students: 450, staff: 'S. Kumar' },
                                { title: '12th Physics', students: 320, staff: 'Kavita Rao' },
                                { title: '8th Science', students: 180, staff: 'M. Gupta' },
                            ].map((c, i) => (
                                <div key={i} className="card">
                                    <h3 className="course-title" style={{ fontSize: '1.1rem' }}>{c.title}</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Staff:</strong> {c.staff}</p>
                                    <p style={{ fontSize: '0.9rem' }}><strong>Students:</strong> {c.students}</p>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit</button>
                                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }}>Disable</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'analytics':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>System Analytics</h2>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                <div key={i} style={{ flex: 1, background: 'var(--brand-main)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                    <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem' }}>Day {i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Traffic analysis for the current week</p>
                    </div>
                );

            case 'settings':
                return (
                    <div className="card" style={{ maxWidth: '600px' }}>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Global Settings</h2>
                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Site Name</label>
                                <input type="text" defaultValue="Astradex Learning" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Contact Email</label>
                                <input type="email" defaultValue="admin@astradex.com" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <input type="checkbox" defaultChecked id="maintenance" />
                                <label htmlFor="maintenance" style={{ fontWeight: 600 }}>Enable Registration</label>
                            </div>
                            <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                        </div>
                    </div>
                );

            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    Astradex
                    <span>Admin Panel</span>
                </div>
                <nav className="dashboard-nav">
                    <ul className="dashboard-nav-list">
                        {navItems.map(item => (
                            <li key={item.id} className="dashboard-nav-item">
                                <button
                                    onClick={() => setActiveSection(item.id)}
                                    className={`dashboard-nav-button ${activeSection === item.id ? 'is-active' : ''}`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate('/login');
                    }}
                    className="dashboard-logout"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main" style={{ overflowY: 'auto', boxSizing: 'border-box' }}>
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
