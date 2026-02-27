
import React, { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from '../data/courses';
import { SkeletonLoader, EmptyState, AnimatedCounter } from '../components/UIUtils';

// Reusing some styles from global CSS, but adding specific dashboard layout styles inline for simplicity
// or we could add them to styles.css. For now, inline/object styles for layout.

const StudentDashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const navigate = useNavigate();
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        const role = localStorage.getItem("role");

        if (!loggedIn || role !== "student") {
            navigate("/login");
        }
    }, [navigate]);

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userGrade = localStorage.getItem("userGrade");
    const userSchool = localStorage.getItem("userSchool");

    // Simulate loading state for enrolled courses (future API)
    const [loading, setLoading] = useState(false);
    const enrolledCourses = courses.slice(0, 2); // First 2 courses as enrolled
    const userProfile = {
        name: userName,
        email: userEmail,
        grade: "Grade " + userGrade,
        school: userSchool
    };

    const navItems = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'enrolled', label: 'Enrolled Courses', icon: '📚' },
        { id: 'courses', label: 'All Courses', icon: '🔍' },
        { id: 'mentors', label: 'Mentors / Staffs', icon: '👨‍🏫' },
        { id: 'payment', label: 'Payment Details', icon: '💳' },
        { id: 'upgrade', label: 'Upgrade Plans', icon: '⭐' },
        { id: 'refer', label: 'Refer and Earn', icon: '🎁' },
        { id: 'timetable', label: 'Timetable & Schedule', icon: '📅' },
    ];

    const handleNavClick = (id) => {
        if (id === 'courses') {
            navigate('/courses');
        } else {
            setActiveSection(id);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>My Profile</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--brand-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white' }}>
                                {userProfile.name ? userProfile.name[0] : ""}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{userProfile.name}</h3>
                                <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>{userProfile.grade}</p>
                                <div className="badge" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'var(--brand-glow)', color: 'var(--brand-main)', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>Student</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div className="meta-block">
                                <strong>Email:</strong> {userProfile.email}
                            </div>
                            <div className="meta-block">
                                <strong>School:</strong> {userProfile.school}
                            </div>
                        </div>
                    </div>
                );

            case 'enrolled':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>My Learning</h2>
                        <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                            {loading
                                ? Array(2).fill(0).map((_, i) => <SkeletonLoader key={i} height={180} />)
                                : enrolledCourses.length === 0
                                    ? <EmptyState message="You are not enrolled in any courses yet." />
                                    : enrolledCourses.map(course => (
                                        <div key={course.id} className="card course-card">
                                            <h3 className="course-title">{course.name}</h3>
                                            <p className="course-desc" style={{ fontSize: '0.9rem' }}>{course.tagline}</p>
                                            <div style={{ marginTop: '1rem' }}>
                                                <div style={{ background: 'var(--border-color)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, var(--brand-main), var(--brand-light))' }}></div>
                                                </div>
                                                <p style={{ fontSize: '0.8rem', textAlign: 'right', marginTop: '0.2rem' }}>35% Complete</p>
                                            </div>
                                            <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate(`/courses/${course.id}`)}>Continue</button>
                                        </div>
                                    ))}
                        </div>
                    </div>
                );

            case 'mentors':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>My Mentors</h2>
                        <div className="features-grid">
                            {loading
                                ? Array(2).fill(0).map((_, i) => <SkeletonLoader key={i} height={120} />)
                                : enrolledCourses.length === 0
                                    ? <EmptyState message="No mentors found. Enroll in a course to get assigned mentors." />
                                    : enrolledCourses.flatMap(c => c.instructors).map((inst, idx) => (
                                        <div key={idx} className="instructor-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                            <div className="instructor-avatar" style={{ margin: '0 auto' }}>{inst.name[0]}</div>
                                            <div>
                                                <h4 style={{ margin: '0.5rem 0' }}>{inst.name}</h4>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--brand-main)', margin: 0 }}>{inst.role}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{inst.bio}</p>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                );

            case 'payment':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Payment History</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                    <th style={{ padding: '1rem' }}>Course</th>
                                    <th style={{ padding: '1rem' }}>Amount</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Oct 12, 2025</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>10th Board Science</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>₹4,999</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}><span style={{ color: 'green', fontWeight: 600 }}>Paid</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );

            case 'upgrade':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="heading-medium">Upgrade Your Plan</h2>
                        <div className="courses-grid">
                            <div className="card" style={{ border: '2px solid var(--brand-gold, #f59e0b)' }}>
                                <h3 className="course-title">Premium Access</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--brand-main)', margin: '1rem 0' }}>₹1,999<span style={{ fontSize: '1rem' }}>/mo</span></div>
                                <ul className="highlight-list" style={{ textAlign: 'left', margin: '0 auto', maxWidth: '80%' }}>
                                    <li>Unlimited Live Classes</li>
                                    <li>1-on-1 Doubt Solving</li>
                                    <li>Printed Material Delivery</li>
                                </ul>
                                <button className="btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Upgrade Now</button>
                            </div>
                        </div>
                    </div>
                );

            case 'refer':
                return (
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <h2 className="heading-medium">Refer and Earn</h2>
                        <p className="paragraph-main">Invite your friends and earn ₹500 for every enrollment!</p>
                        <div style={{ margin: '2rem 0' }}>
                            <span style={{ background: 'var(--bg-secondary)', padding: '1rem 2rem', borderRadius: '8px', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', border: '2px dashed var(--brand-main)', display: 'inline-block' }}>ASH2025</span>
                        </div>
                        <button className="btn-secondary">Copy Code</button>
                    </div>
                );

            case 'timetable':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Weekly Schedule</h2>
                        <div className="card">
                            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', gap: '1rem', overflowX: 'auto' }}>
                                <div style={{ fontWeight: 600 }}>Time</div>
                                <div style={{ fontWeight: 600 }}>Mon</div>
                                <div style={{ fontWeight: 600 }}>Tue</div>
                                <div style={{ fontWeight: 600 }}>Wed</div>
                                <div style={{ fontWeight: 600 }}>Thu</div>
                                <div style={{ fontWeight: 600 }}>Fri</div>

                                <div>4:00 PM</div>
                                <div className="badge" style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)' }}>Physics</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)' }}>Physics</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Math Test</div>

                                <div>5:30 PM</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>Biology</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>Biology</div>
                                <div>-</div>
                            </div>
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
                    <span>Student Portal</span>
                </div>
                <nav className="dashboard-nav">
                    <ul className="dashboard-nav-list">
                        {navItems.map(item => (
                            <li key={item.id} className="dashboard-nav-item">
                                <button
                                    onClick={() => handleNavClick(item.id)}
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
                        localStorage.removeItem("loggedIn");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("role");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userGrade");
                        localStorage.removeItem("userSchool");
                        navigate('/login');
                    }}
                    className="dashboard-logout"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {renderContent()}
            </main>
        </div>
    );
};

export default StudentDashboard;
