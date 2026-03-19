import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SkeletonLoader, EmptyState } from '../components/UIUtils';
import DashboardLayout from '../components/DashboardLayout';
import { User, ClipboardList, BookOpen, Users, Banknote, Calendar } from 'lucide-react';

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
    const [loading] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('staff_uploaded_videos');
        if (saved) {
            setUploadedVideos(JSON.parse(saved));
        }
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();
        if (!videoUrl || !videoTitle) return;

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
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        { id: 'attendance', label: 'Attendance', icon: <ClipboardList size={20} /> },
        { id: 'courses', label: 'Handling Courses', icon: <BookOpen size={20} /> },
        { id: 'students', label: 'Students with Courses', icon: <Users size={20} /> },
        { id: 'salary', label: 'Salary Details', icon: <Banknote size={20} /> },
        { id: 'timetable', label: 'Timetable & Schedule', icon: <Calendar size={20} /> },
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
            case 'profile':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.div variants={itemVariants} className="dash-hero-banner">
                            <div className="dash-hero-content">
                                <span className="dash-hero-badge">Staff ID: AST-402</span>
                                <h2 className="dash-hero-title">Welcome back, {userName}!</h2>
                                <p className="dash-hero-text">Here is what is happening with your Senior {userDepartment || 'Subject'} Faculty responsibilities today.</p>
                                <button className="btn-primary" style={{ background: '#fff', color: 'var(--brand-main)', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>View Schedule</button>
                            </div>
                            <div 
                                style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', flexShrink: 0, width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
                            >
                                {userName ? userName[0].toUpperCase() : 'S'}
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="dashboard-grid cols-3" style={{ marginTop: '2.5rem' }}>
                            <div className="metric-card">
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Email Address</span>
                                <strong style={{ fontSize: '1.1rem', wordBreak: 'break-all' }}>{userEmail}</strong>
                            </div>
                            <div className="metric-card">
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Department</span>
                                <strong style={{ fontSize: '1.1rem' }}>{userDepartment || 'General'}</strong>
                            </div>
                            <div className="metric-card">
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Joining Date</span>
                                <strong style={{ fontSize: '1.1rem' }}>{userJoiningDate || '2023-08-15'}</strong>
                            </div>
                        </motion.div>
                    </motion.div>
                );

            case 'attendance':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="modern-card">
                        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <h2 className="heading-medium" style={{ margin: 0, fontSize: '2rem' }}>My Attendance</h2>
                            <div style={{ padding: '0.6rem 1.2rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', fontWeight: 600 }}>Total Present: <span style={{ color: '#22c55e' }}>26</span> / 30 Days</div>
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
                            {[...Array(30)].map((_, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ backgroundColor: i === 5 || i === 12 || i === 13 || i === 26 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)' }}
                                    style={{
                                        aspectRatio: '1',
                                        borderRadius: '12px',
                                        background: i === 5 || i === 12 || i === 13 || i === 26 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: `1px solid ${i === 5 || i === 12 || i === 13 || i === 26 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                                        cursor: 'pointer'
                                    }}>
                                    <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{i + 1}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '4px', color: i === 5 || i === 12 || i === 13 || i === 26 ? '#ef4444' : '#22c55e' }}>
                                        {i === 5 || i === 12 || i === 13 || i === 26 ? 'Absent' : 'Present'}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                );

            case 'courses':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '2rem' }}>Handling Courses & Content</motion.h2>

                        <motion.div variants={itemVariants} className="modern-card glass-panel" style={{ marginBottom: '3rem', border: '1px dashed var(--brand-main)' }}>
                            <h3 style={{ marginTop: 0, fontSize: '1.3rem', marginBottom: '1.5rem' }}>Upload New Class Video</h3>
                            <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1.5rem', alignItems: 'end' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Video Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Physics Chapter 4 - Force"
                                        value={videoTitle}
                                        onChange={(e) => setVideoTitle(e.target.value)}
                                        style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>YouTube URL</label>
                                    <input
                                        type="url"
                                        placeholder="e.g., https://youtu.be/..."
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                                        required
                                    />
                                </div>
                                <button className="btn-primary" style={{ padding: '0.9rem 2rem', borderRadius: '12px', height: 'fit-content' }}>Upload Source</button>
                            </form>
                        </motion.div>

                        <motion.h3 variants={itemVariants} className="course-title" style={{ fontSize: '1.4rem' }}>Uploaded Content Library</motion.h3>
                        <motion.div variants={itemVariants} className="courses-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
                            {loading
                                ? Array(2).fill(0).map((_, i) => <SkeletonLoader key={i} height={200} />)
                                : uploadedVideos.length === 0
                                    ? <EmptyState message="No videos uploaded yet. Add your first resource above." />
                                    : uploadedVideos.map((video, idx) => (
                                        <motion.div 
                                            key={video.id} 
                                            className="modern-card" 
                                            style={{ padding: '1.5rem' }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', marginBottom: '1.5rem', background: '#000' }}>
                                                <iframe
                                                    src={video.url}
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', color: 'var(--text-primary)' }}>{video.title}</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>{video.date}</p>
                                                <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, cursor: 'pointer', padding: '0.2rem' }}>Delete</button>
                                            </div>
                                        </motion.div>
                                    ))}
                        </motion.div>
                    </motion.div>
                );

            case 'students':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="modern-card">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginTop: 0, marginBottom: '2rem' }}>My Students Performance</motion.h2>
                        
                        <motion.div variants={itemVariants} style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        <th style={{ padding: '0 1rem 1rem' }}>Student Name</th>
                                        <th style={{ padding: '0 1rem 1rem' }}>Grade Structure</th>
                                        <th style={{ padding: '0 1rem 1rem' }}>Enrolled Module</th>
                                        <th style={{ padding: '0 1rem 1rem', textAlign: 'center' }}>Avg Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Ashwath', grade: '10th STD', course: '10th Board Science', perf: 'A+' },
                                        { name: 'Rahul', grade: '10th STD', course: '10th Board Science', perf: 'B' },
                                        { name: 'Simran', grade: '11th STD', course: 'Physics Core', perf: 'A' },
                                        { name: 'Dev', grade: '10th STD', course: '10th Board Science', perf: 'B+' },
                                    ].map((s, i) => (
                                        <motion.tr 
                                            key={i}
                                            whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
                                            style={{ background: 'var(--bg-primary)', transition: 'background 0.2s', boxShadow: 'var(--shadow-soft)' }}    
                                        >
                                            <td style={{ padding: '1.2rem 1rem', borderRadius: '12px 0 0 12px', fontWeight: 600 }}>{s.name}</td>
                                            <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{s.grade}</td>
                                            <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{s.course}</td>
                                            <td style={{ padding: '1.2rem 1rem', borderRadius: '0 12px 12px 0', textAlign: 'center' }}>
                                                <span style={{ 
                                                    padding: '0.4rem 1rem', 
                                                    borderRadius: '8px', 
                                                    fontWeight: 800,
                                                    background: s.perf.includes('A') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                                                    color: s.perf.includes('A') ? '#22c55e' : 'var(--brand-main)'
                                                }}>{s.perf}</span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                );

            case 'salary':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="modern-card">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginTop: 0, marginBottom: '2rem' }}>Compensation Portal</motion.h2>
                        
                        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--brand-glow)' }}>
                                <h4 style={{ margin: '0 0 0.5rem', color: 'var(--brand-main)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Total Earnings (YTD)</h4>
                                <p style={{ fontSize: '3rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>₹8,45,000</p>
                                <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1rem' }}>↑ 12% from last year</span>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(192, 38, 211, 0.3)' }}>
                                <h4 style={{ margin: '0 0 0.5rem', color: '#c026d3', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Last Month Salary</h4>
                                <p style={{ fontSize: '3rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>₹75,000</p>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', display: 'block', marginTop: '1rem' }}>Deposited on 1st Oct, 2025</span>
                            </div>
                        </motion.div>

                        <motion.h4 variants={itemVariants} style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Payslip Archives</motion.h4>
                        <motion.div variants={itemVariants} style={{ display: 'grid', gap: '1rem' }}>
                            {['October 2025', 'September 2025', 'August 2025'].map((month, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📄</span>
                                        <span style={{ fontWeight: 600 }}>Payslip_{month.replace(' ', '_')}.pdf</span>
                                    </div>
                                    <button className="btn-secondary" style={{ padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem' }}>Download PDF</button>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                );

            case 'timetable':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.h2 variants={itemVariants} className="heading-medium" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '2rem' }}>Teaching Schedule</motion.h2>
                        
                        <motion.div variants={itemVariants} className="modern-card glass-panel" style={{ padding: '2rem 1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 1fr) repeat(5, minmax(120px, 1.5fr))', gap: '1.5rem', overflowX: 'auto', minWidth: '700px' }}>
                                {/* Header */}
                                <div style={{ fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Time Phase</div>
                                <div style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>Mon</div>
                                <div style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>Tue</div>
                                <div style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>Wed</div>
                                <div style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>Thu</div>
                                <div style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)' }}>Fri</div>

                                {/* Row 1 */}
                                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'var(--brand-main)' }}>10:00 AM</div>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(34,197,94,0.2)' }}>10A Physics</div>
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>-</div>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(34,197,94,0.2)' }}>10B Physics</div>
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>-</div>
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>-</div>

                                {/* Row 2 */}
                                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'var(--brand-main)', marginTop: '1rem' }}>04:00 PM</div>
                                <div style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.2)', marginTop: '1rem' }}>12A Physics</div>
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>-</div>
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>-</div>
                                <div style={{ background: 'var(--brand-glow)', color: 'var(--brand-main)', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.2)', marginTop: '1rem' }}>12A Doubt Live</div>
                                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '1rem' }}>Staff Sync</div>
                            </div>
                        </motion.div>
                    </motion.div>
                );

            default:
                return <div>Select search section</div>;
        }
    };

    return (
        <DashboardLayout 
            role="Staff"
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={setActiveSection}
            onLogout={() => {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("role");
            }}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default StaffDashboard;
