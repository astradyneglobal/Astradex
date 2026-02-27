
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkeletonLoader, EmptyState } from '../components/UIUtils';

const StaffDashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        const role = localStorage.getItem("role");

        if (!loggedIn || role !== "staff") {
            navigate("/login");
        }
    }, [navigate]);
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userDepartment = localStorage.getItem("userDepartment");
    const userJoiningDate = localStorage.getItem("userJoiningDate");
    // Video Upload State
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [loading, setLoading] = useState(false); // For future API

    useEffect(() => {
        const saved = localStorage.getItem('staff_uploaded_videos');
        if (saved) {
            setUploadedVideos(JSON.parse(saved));
        }
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();
        if (!videoUrl || !videoTitle) return;

        // Extract video ID from URL (simple regex for youtube)
        const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
            alert('Please enter a valid YouTube URL');
            return;
        }

        const newVideo = {
            id: Date.now(),
            title: videoTitle,
            url: `https://www.youtube.com/embed/${videoId}`,
            date: new Date().toLocaleDateString()
        };

        const updated = [newVideo, ...uploadedVideos];
        setUploadedVideos(updated);
        localStorage.setItem('staff_uploaded_videos', JSON.stringify(updated));
        setVideoTitle('');
        setVideoUrl('');
    };

    const navItems = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'attendance', label: 'Attendance', icon: '📝' },
        { id: 'courses', label: 'Handling Courses', icon: '📚' },
        { id: 'students', label: 'Students with Courses', icon: '👥' },
        { id: 'salary', label: 'Salary Details', icon: '💰' },
        { id: 'timetable', label: 'Timetable & Schedule', icon: '📅' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Staff Profile</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--brand-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white' }}>
                                K
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{userName}</h3>
                                <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>Senior Physics Faculty</p>
                                <div className="badge" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'var(--brand-glow)', color: 'var(--brand-main)', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>Staff ID: AST-402</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div className="meta-block">
                                <strong>Email:</strong> {userEmail}
                            </div>
                            <div className="meta-block">
                                <strong>Department:</strong> {userDepartment}
                            </div>
                            <div className="meta-block">
                                <strong>Joining Date:</strong> {userJoiningDate}
                            </div>
                        </div>
                    </div>
                );

            case 'attendance':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>My Attendance</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                            {[...Array(30)].map((_, i) => (
                                <div key={i} style={{
                                    aspectRatio: '1',
                                    borderRadius: '8px',
                                    background: i === 5 || i === 12 || i === 13 || i === 26 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>{i + 1}</span>
                                    <span style={{ fontSize: '0.7rem' }}>{i === 5 || i === 12 || i === 13 || i === 26 ? 'Absent' : 'Present'}</span>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '1rem', textAlign: 'right', fontWeight: 600 }}>Total Present: 26/30 Days</p>
                    </div>
                );

            case 'courses':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Course Management</h2>

                        <div className="card" style={{ marginBottom: '2rem', background: 'var(--bg-secondary)', border: '1px dashed var(--brand-main)' }}>
                            <h3 style={{ marginTop: 0 }}>Upload New Class Video</h3>
                            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Video Title (e.g., Physics Chapter 4 - Force)"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="YouTube URL (e.g., https://youtu.be/...)"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                    required
                                />
                                <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Upload Video Link</button>
                            </form>
                        </div>

                        <h3 className="course-title">Uploaded Content</h3>
                        <div className="courses-grid" style={{ marginTop: '1rem' }}>
                            {loading
                                ? Array(2).fill(0).map((_, i) => <SkeletonLoader key={i} height={120} />)
                                : uploadedVideos.length === 0
                                    ? <EmptyState message="No videos uploaded yet." />
                                    : uploadedVideos.map(video => (
                                        <div key={video.id} className="card course-card">
                                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem' }}>
                                                <iframe
                                                    src={video.url}
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{video.title}</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Uploaded on: {video.date}</p>
                                        </div>
                                    ))}
                        </div>
                    </div>
                );

            case 'students':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>My Students</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Student Name</th>
                                    <th style={{ padding: '1rem' }}>Grade</th>
                                    <th style={{ padding: '1rem' }}>Enrolled Course</th>
                                    <th style={{ padding: '1rem' }}>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Ashwath', grade: '10', course: '10th Board Science', perf: 'A+' },
                                    { name: 'Rahul', grade: '10', course: '10th Board Science', perf: 'B' },
                                    { name: 'Simran', grade: '11', course: 'Physics Core', perf: 'A' },
                                    { name: 'Dev', grade: '10', course: '10th Board Science', perf: 'B+' },
                                ].map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{s.name}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{s.grade}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{s.course}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}><b>{s.perf}</b></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'salary':
                return (
                    <div className="card">
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Salary Details</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
                                <h4 style={{ margin: 0, color: 'var(--brand-main)' }}>Total Earnings (YTD)</h4>
                                <p style={{ fontSize: '2rem', fontWeight: 900, margin: '0.5rem 0', color: 'var(--brand-main)' }}>₹8,45,000</p>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
                                <h4 style={{ margin: 0, color: '#c026d3' }}>Last Month</h4>
                                <p style={{ fontSize: '2rem', fontWeight: 900, margin: '0.5rem 0', color: '#c026d3' }}>₹75,000</p>
                            </div>
                        </div>

                        <h4 style={{ marginTop: '2rem' }}>Payslips</h4>
                        <ul className="highlight-list">
                            <li><a href="#" style={{ color: 'var(--brand-main)' }}>Payslip_Oct_2025.pdf</a></li>
                            <li><a href="#" style={{ color: 'var(--brand-main)' }}>Payslip_Sep_2025.pdf</a></li>
                            <li><a href="#" style={{ color: 'var(--brand-main)' }}>Payslip_Aug_2025.pdf</a></li>
                        </ul>
                    </div>
                );

            case 'timetable':
                return (
                    <div>
                        <h2 className="heading-medium" style={{ textAlign: 'left', fontSize: '1.8rem' }}>Teaching Schedule</h2>
                        <div className="card">
                            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', gap: '1rem', overflowX: 'auto' }}>
                                <div style={{ fontWeight: 600 }}>Time</div>
                                <div style={{ fontWeight: 600 }}>Mon</div>
                                <div style={{ fontWeight: 600 }}>Tue</div>
                                <div style={{ fontWeight: 600 }}>Wed</div>
                                <div style={{ fontWeight: 600 }}>Thu</div>
                                <div style={{ fontWeight: 600 }}>Fri</div>

                                <div>10:00 AM</div>
                                <div className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>10A Physics</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>10B Physics</div>
                                <div>-</div>
                                <div>-</div>

                                <div>4:00 PM</div>
                                <div className="badge" style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)' }}>12A Physics</div>
                                <div>-</div>
                                <div>-</div>
                                <div className="badge" style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)' }}>12A Doubt Live</div>
                                <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Meeting</div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select search section</div>;
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    Astradex
                    <span>Staff Portal</span>
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
                    onClick={() => navigate('/login')}
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

export default StaffDashboard;
