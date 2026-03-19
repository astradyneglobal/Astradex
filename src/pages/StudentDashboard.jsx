import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { Home, LineChart, BookOpen, CreditCard, Calendar, Award, AlertCircle, X, TrendingUp, Clock, Target } from 'lucide-react';
import { 
    LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    BarChart, Bar, Cell
} from 'recharts';
import { FacultyModal, EmptyState } from '../components/UIUtils';
import { courses } from '../data/courses';

import facultySaravana from '../assets/faculty/saravana.png';
import facultyGurunathan from '../assets/faculty/gurunathan.jpg';
import facultyJahir from '../assets/faculty/jahir.png';
import facultyLakshmi from '../assets/faculty/lakshmi.png';

import brochureSaravana from '../assets/brochures/brochure_saravana.png';
import brochureGurunathan from '../assets/brochures/brochure_gurunathan.png';
import brochureJahir from '../assets/brochures/brochure_jahir.png';
import brochureLakshmi from '../assets/brochures/brochure_lakshmi.png';

const StudentDashboard = () => {
    // Dynamic enrollment data
    const enrolledIds = ['11-cbse-math', '11-cbse-phy', '11-cbse-chem', '11-cbse-bio'];
    const enrolledCourses = enrolledIds.map(id => courses.find(c => c.id === id)).filter(Boolean);
    
    // Status color logic based on pending days
    const getStatusColor = (days) => {
        if (days > 20) return { color: '#22c55e', grad: 'linear-gradient(90deg, #22c55e, #4ade80)' }; // Green
        if (days > 10) return { color: '#f59e0b', grad: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }; // Light Orange
        if (days > 5) return { color: '#ea580c', grad: 'linear-gradient(90deg, #ea580c, #f97316)' };  // Orange
        return { color: '#ef4444', grad: 'linear-gradient(90deg, #ef4444, #f87171)' };             // Red
    };

    // Detailed enrollment info for Fee Management
    const enrollmentDetails = enrolledCourses.map(course => {
        const days = course.subject === 'Mathematics' ? 22 : course.subject === 'Physics' ? 15 : course.subject === 'Chemistry' ? 8 : 4;
        const status = getStatusColor(days);
        return {
            id: course.id,
            name: course.subject === 'Mathematics' ? 'Maths' : course.subject,
            fullName: course.name,
            active: true,
            days: days,
            price: course.monthlyPrice,
            color: status.color,
            grad: status.grad
        };
    });

    const [activeSection, setActiveSection] = useState('profile');
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedEnrolledCourse, setSelectedEnrolledCourse] = useState(null);
    const [progressFilter, setProgressFilter] = useState('monthly');
    const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        const role = localStorage.getItem("role");

        if (!loggedIn || role !== "student") {
            navigate("/login");
        }
    }, [navigate]);



    const navItems = [
        { id: 'profile', label: 'Overview', icon: <Home size={20} /> },
        { id: 'progress', label: 'My Progress', icon: <LineChart size={20} /> },
        { id: 'courses', label: 'Enrolled Courses', icon: <BookOpen size={20} /> },
        { id: 'fees', label: 'Fee Details', icon: <CreditCard size={20} /> },
        { id: 'timetable', label: 'Class Schedule', icon: <Calendar size={20} /> },
        { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
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

    const RenewModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '1rem'
                    }}
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: '24px',
                            width: '100%',
                            maxWidth: '480px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, #f8fafc, #ffffff)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: '12px', color: '#2563eb' }}>
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Renew Subscriptions</h3>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Select a subject to extend your access</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ 
                            padding: '1.5rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '1.25rem',
                            maxHeight: '420px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#e2e8f0 transparent'
                        }}>
                            {enrollmentDetails.map((sub, idx) => (
                                <div key={idx} style={{ 
                                    padding: '1rem', 
                                    borderRadius: '16px', 
                                    border: '1px solid #eef2f6', 
                                    background: '#fcfdfe',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>{sub.name}</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: '6px', background: '#dcfce7', color: '#16a34a' }}>Enrolled</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e293b' }}>₹{sub.price}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>/month</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                                            <span style={{ color: '#64748b' }}>Remaining Access</span>
                                            <span style={{ color: sub.color }}>{sub.days} days</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ width: `${(sub.days / 30) * 100}%`, height: '100%', background: sub.grad, borderRadius: '3px' }}></div>
                                        </div>
                                    </div>

                                    <button style={{ 
                                        width: '100%',
                                        padding: '0.75rem', 
                                        background: '#2563eb', 
                                        color: '#fff', 
                                        border: 'none', 
                                        borderRadius: '12px', 
                                        fontSize: '0.9rem', 
                                        fontWeight: 800, 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                                    }}>
                                        <CreditCard size={18} />
                                        Renew {sub.name}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ padding: '0.4rem', background: '#fffbeb', borderRadius: '8px', color: '#d97706' }}>
                                <AlertCircle size={16} />
                            </div>
                            <p style={{ margin: 0, fontSize: '0.72rem', color: '#92400e', fontWeight: 600, lineHeight: '1.4' }}>
                                Renewal will extend your current subscription by 30 days from its expiry date.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <>
                    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '2rem', alignItems: 'start' }}>
                        
                        {/* LEFT SECONDARY PANEL */}
                        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Schedule Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-soft)', borderLeft: '4px solid #c026d3' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--brand-main)' }}>Today's Live Class</h4>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>Subject:</strong> Physics / Mathematics / Chemistry / Biology</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>Time:</strong> 5:30 PM – 6:30 PM</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Faculty:</strong> Saravana Kumar K</div>
                                    </div>
                                    <button className="btn-primary" style={{ padding: '0.6rem', borderRadius: '8px', fontSize: '0.85rem', width: '100%' }}>Join Live Class</button>
                                </div>
                                <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.6rem', boxShadow: 'var(--shadow-soft)', borderLeft: '4px solid var(--brand-main)' }}>
                                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Next Scheduled Class</h4>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Subject:</strong> Chemistry</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Date:</strong> March 18</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Time:</strong> 6:00 PM – 7:00 PM</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Topic:</strong> Chemical Bonding</div>
                                </div>
                            </div>

                            {/* Transactions -> Recent Assessments */}
                            <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-soft)' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>Recent Assessments</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    {[
                                        { title: 'Weekly Quiz – Physics', score: 'Score: 18 / 20' },
                                        { title: 'Monthly Test – Mathematics', score: 'Score: 82 / 100' },
                                        { title: 'Weekly Quiz – Chemistry', score: 'Score: 15 / 20' }
                                    ].map((a, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>✓</div>
                                                <div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.title}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{a.score}</div>
                                                </div>
                                            </div>
                                            <div style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 800 }}>⋮</div>
                                        </div>
                                    ))}
                                </div>
                                <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem', background: 'var(--bg-secondary)', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}>View All Results</button>
                            </div>

                            {/* Friends -> Your Mentors */}
                            <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-soft)' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>Your Mentors</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    {[
                                        { name: 'Saravana Kumar K', role: 'Physics Mentor', bg: 'rgba(56, 189, 248, 0.15)', image: facultySaravana, qualification: 'M.Sc. M.Ed., M.Phil.,PGDCA.,', board: 'CBSE', subject: 'Physics', experience: '30 years', brochure: brochureSaravana, videoUrl: 'https://www.youtube.com/embed/5GPTap4ldyg?si=9rbUBxrlAqbb3dsV' },
                                        { name: 'Gurunathan', role: 'Mathematics Mentor', bg: 'rgba(253, 224, 71, 0.2)', image: facultyGurunathan, qualification: 'M.Sc., B.Ed., PGDCA', board: 'TN Board', subject: 'Maths', experience: '7 years', brochure: brochureGurunathan, videoUrl: 'https://www.youtube.com/embed/MuYq5pep3qo' },
                                        { name: 'Jahir Hussain A', role: 'Chemistry Mentor', bg: 'rgba(192, 38, 211, 0.15)', image: facultyJahir, qualification: 'M.Sc.,M.Ed.,', board: 'CBSE', subject: 'Chemistry', experience: '19 years', brochure: brochureJahir, videoUrl: 'https://www.youtube.com/embed/Q18sE426qno?si=oIxokI_EW5R0d9Hk' },
                                        { name: 'Lakshmi S', role: 'Biology Mentor', bg: 'rgba(74, 222, 128, 0.2)', image: facultyLakshmi, qualification: 'M.Sc.,B.Ed.,', board: 'TN Board', subject: 'Biology', experience: '33 years', brochure: brochureLakshmi, videoUrl: 'https://www.youtube.com/embed/Iiu6UpgPUSc?si=TAfCqRh5HWoNz5DB' },
                                    ].map((f, i) => (
                                        <motion.div 
                                            key={i} 
                                            onClick={() => setSelectedFaculty(f)}
                                            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            style={{ background: f.bg, borderRadius: '16px', padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', textAlign: 'center', cursor: 'pointer' }}
                                        >
                                            <div style={{ width: '64px', height: '64px', background: '#fff', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                                <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{f.name}</div>
                                                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{f.role}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.9rem', borderRadius: '12px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>Contact Mentor</button>
                            </div>
                        </motion.div>

                        {/* RIGHT MAIN PANEL */}
                        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>Classroom</h2>
                            </div>

                            {/* Top row: Todays Learning Plan & Subject Performance */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {/* Today's Learning Plan */}
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-soft)' }}>
                                    <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.2rem', fontWeight: 600 }}>Today's Learning Plan</h3>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {[
                                            { subject: 'Physics', topic: 'Topic: Electrostatics', icon: '⚡', color: '#0ea5e9', bg: 'rgba(56, 189, 248, 0.15)' },
                                            { subject: 'Mathematics', topic: 'Topic: Integrals', icon: '➗', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
                                            { subject: 'Chemistry', topic: 'Topic: Chemical Kinetics', icon: '🧪', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
                                            { subject: 'Biology', topic: 'Topic: Molecular Genetics', icon: '🧬', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
                                        ].map((lp, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: lp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lp.color, fontSize: '1.4rem' }}>{lp.icon}</div>
                                                    <div>
                                                        <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '4px' }}>{lp.subject}</strong>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lp.topic}</div>
                                                    </div>
                                                </div>
                                                <div style={{ width: '40px', height: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                                                    <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Subject Performance */}
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-soft)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Subject Performance</h3>
                                        <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>
                                            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Weekly</span>
                                            <span style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '2px', cursor: 'pointer' }}>Monthly</span>
                                        </div>
                                    </div>
                                    <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: '2rem', gap: '1rem', position: 'relative' }}>
                                        {[
                                            { subject: 'Physics', h: 78, color: '#0ea5e9' },
                                            { subject: 'Mathematics', h: 84, color: '#8b5cf6' },
                                            { subject: 'Chemistry', h: 71, color: '#ef4444' },
                                            { subject: 'Biology', h: 80, color: '#22c55e' }
                                        ].map((bar, i) => (
                                            <div key={i} style={{ flex: 1, maxWidth: '60px', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
                                                <motion.div 
                                                    initial={{ height: 0 }} 
                                                    animate={{ height: `${bar.h}%` }} 
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    style={{ width: '36px', background: bar.color, borderRadius: '8px 8px 0 0' }}
                                                ></motion.div>
                                                <div style={{ position: 'absolute', top: `${100 - bar.h}%`, transform: 'translateY(-150%)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid var(--border-color)', zIndex: 10 }}>{bar.h}%</div>
                                                <div style={{ position: 'absolute', bottom: '-28px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                                    {bar.subject.substring(0, 4)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom row: Today's Live Classes & Learning Statistics */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {/* Today's Live Classes */}
                                <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.2rem', fontWeight: 600 }}>Today's Live Classes</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', flex: 1 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {[
                                                { subject: 'Physics', topic: 'Topic: Electric Fields', time: '5:30 PM - 6:30 PM', color: '#0ea5e9' },
                                                { subject: 'Chemistry', topic: 'Topic: Organic Reactions', time: '6:30 PM - 7:30 PM', color: '#ef4444' },
                                                { subject: 'Mathematics', topic: 'Topic: Differential Equations', time: '7:30 PM - 8:30 PM', color: '#8b5cf6' },
                                            ].map((c, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'var(--bg-secondary)', padding: '1.2rem', borderRadius: '16px' }}>
                                                    <div style={{ borderLeft: `4px solid ${c.color}`, paddingLeft: '1rem' }}>
                                                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{c.subject}</div>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{c.topic}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--brand-main)', fontWeight: 600 }}>{c.time}</div>
                                                    </div>
                                                    <button style={{ padding: '0.5rem 1rem', background: 'var(--brand-main)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>Join</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}>View Full Schedule</button>
                                </div>

                                {/* Learning Statistics */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    
                                    <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '1.5rem', boxShadow: 'var(--shadow-soft)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>1450</strong>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Questions<br/>Solved</span>
                                        </div>
                                        <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>32</strong>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tests<br/>Attempted</span>
                                        </div>
                                        <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <strong style={{ fontSize: '1.4rem', display: 'block', color: '#22c55e', marginBottom: '0.3rem' }}>81%</strong>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Average<br/>Score</span>
                                        </div>
                                    </div>

                                    {/* Study Streak */}
                                    <div style={{ background: 'linear-gradient(135deg, #f59e0b, #fb923c)', borderRadius: '24px', padding: '1.5rem 2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}>
                                        <div style={{ fontSize: '2.5rem' }}>🔥</div>
                                        <div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Study Streak</div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>7 Days of Continuous Learning</div>
                                        </div>
                                    </div>

                                    {/* Syllabus Progress */}
                                    <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', padding: '1.5rem 2rem', boxShadow: 'var(--shadow-soft)' }}>
                                        <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Syllabus Progress</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {[
                                                { subject: 'Physics', progress: 65, color: '#0ea5e9' },
                                                { subject: 'Mathematics', progress: 72, color: '#8b5cf6' },
                                                { subject: 'Chemistry', progress: 60, color: '#ef4444' },
                                                { subject: 'Biology', progress: 68, color: '#22c55e' }
                                            ].map((sub, i) => (
                                                <div key={i}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                                        <span>{sub.subject}</span>
                                                        <span>{sub.progress}%</span>
                                                    </div>
                                                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${sub.progress}%` }}
                                                            transition={{ duration: 1, delay: i * 0.1 }}
                                                            style={{ height: '100%', background: sub.color, borderRadius: '4px' }}
                                                        ></motion.div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <AnimatePresence>
                        {selectedFaculty && (
                            <FacultyModal 
                                faculty={selectedFaculty} 
                                onClose={() => setSelectedFaculty(null)} 
                            />
                        )}
                    </AnimatePresence>
                </>
            );

            case 'progress':
                const radarData = [
                    { subject: 'Physics', score: 80, fullMark: 100 },
                    { subject: 'Chemistry', score: 65, fullMark: 100 },
                    { subject: 'Mathematics', score: 90, fullMark: 100 },
                    { subject: 'Biology', score: 75, fullMark: 100 },
                ];

                const trendData = [
                    { name: 'Week 1', score: 65 },
                    { name: 'Week 2', score: 72 },
                    { name: 'Week 3', score: 78 },
                    { name: 'Week 4', score: 84 },
                ];

                const studyTimeData = [
                    { day: 'Mon', hours: 1.5 },
                    { day: 'Tue', hours: 2 },
                    { day: 'Wed', hours: 1 },
                    { day: 'Thu', hours: 2.5 },
                    { day: 'Fri', hours: 1.8 },
                    { day: 'Sat', hours: 2 },
                    { day: 'Sun', hours: 1 },
                ];

                // Helper for circular progress
                const CircularProgress = ({ percent, color, label, subtext, icon }) => {
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (percent / 100) * circumference;
                    
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', position: 'relative' }}>
                            <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-secondary)" strokeWidth="8" />
                                    <motion.circle 
                                        cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
                                        initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                                        animate={{ strokeDashoffset }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {icon}
                                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{label}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{subtext}</span>
                        </div>
                    );
                };

                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <motion.h2 variants={itemVariants} style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, background: 'linear-gradient(90deg, var(--brand-main), var(--brand-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Learning Progress
                            </motion.h2>
                            <motion.p variants={itemVariants} style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                                Track your academic performance, subject mastery, and learning consistency.
                            </motion.p>
                        </div>

                        {/* Top Section - Performance Overview */}
                        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                            <CircularProgress percent={85} color="#3b82f6" label="85%" subtext="Attendance Rate" icon={<Calendar size={18} color="#3b82f6" />} />
                            <CircularProgress percent={78} color="#8b5cf6" label="78%" subtext="Avg Test Score" icon={<Target size={18} color="#8b5cf6" />} />
                            <CircularProgress percent={80} color="#10b981" label="12/15" subtext="Tests Completed" icon={<BookOpen size={18} color="#10b981" />} />
                            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #fb923c)', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</span>
                                <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>7 Days</h3>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.9 }}>Continuous Learning</span>
                            </div>
                        </motion.div>

                        {/* Bottom Section (Moved Up) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr) minmax(280px, 0.8fr)', gap: '1.5rem' }}>
                            
                            {/* Topic Mastery Heatmap */}
                            <motion.div variants={itemVariants} style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 700 }}>Topic Mastery</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { topic: 'Electrostatics', status: 'Strong', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
                                        { topic: 'Magnetism', status: 'Moderate', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
                                        { topic: 'Chemical Kinetics', status: 'Needs Practice', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
                                        { topic: 'Integrals', status: 'Strong', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
                                    ].map((t, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.topic}</span>
                                            <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: t.bg, color: t.color }}>{t.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Test Performance Table */}
                            <motion.div variants={itemVariants} style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 700 }}>Recent Tests</h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '2px solid var(--border-color)' }}>
                                                <th style={{ textAlign: 'left', paddingBottom: '1rem' }}>Subject</th>
                                                <th style={{ textAlign: 'left', paddingBottom: '1rem' }}>Type</th>
                                                <th style={{ textAlign: 'right', paddingBottom: '1rem' }}>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { sub: 'Physics', type: 'Weekly Quiz', score: '18/20' },
                                                { sub: 'Mathematics', type: 'Monthly Test', score: '82/100' },
                                                { sub: 'Chemistry', type: 'Practice', score: '15/20' },
                                                { sub: 'Biology', type: 'Weekly Quiz', score: '17/20' }
                                            ].map((r, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '1rem 0', fontWeight: 600, fontSize: '0.9rem' }}>{r.sub}</td>
                                                    <td style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.type}</td>
                                                    <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 700, color: 'var(--brand-main)' }}>{r.score}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* Right Column: Tracker + Insights */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Study Time Tracker */}
                                <motion.div variants={itemVariants} style={{ background: 'var(--bg-primary)', padding: '1.8rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', flex: 1 }}>
                                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={18} color="var(--brand-main)" /> Study Time
                                    </h3>
                                    <div style={{ height: '150px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={studyTimeData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} />
                                                <RechartsTooltip cursor={{ fill: 'var(--bg-secondary)' }} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '0.85rem' }} />
                                                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                                                    {studyTimeData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.hours >= 2 ? 'var(--brand-main)' : 'rgba(37, 99, 235, 0.4)'} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </motion.div>

                                {/* Insights Card */}
                                <motion.div variants={itemVariants} style={{ background: 'linear-gradient(145deg, var(--brand-main), #1e40af)', padding: '1.8rem', borderRadius: '24px', color: '#fff', boxShadow: '0 15px 30px rgba(37, 99, 235, 0.3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                        <TrendingUp size={24} color="#fcd34d" />
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Learning Insights</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.9 }}>
                                        Your <strong>Mathematics</strong> performance is excellent (90%).<br/><br/>
                                        <strong>Chemistry</strong> requires improvement. Recommended: revise <em>Chemical Kinetics</em> and attempt additional practice quizzes.
                                    </p>
                                    <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', color: '#fff', fontWeight: 600, width: '100%', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.target.style.background='rgba(255,255,255,0.3)'} onMouseLeave={(e)=>e.target.style.background='rgba(255,255,255,0.2)'}>
                                        View Action Plan
                                    </button>
                                </motion.div>
                            </div>
                        </div>

                        {/* Middle Section - Charts (Moved Down) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.5fr)', gap: '1.5rem' }}>
                            
                            {/* Radar Chart */}
                            <motion.div variants={itemVariants} style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 700 }}>Subject Mastery</h3>
                                <div style={{ flex: 1, minHeight: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                            <PolarGrid stroke="var(--border-color)" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="Student" dataKey="score" stroke="var(--brand-main)" fill="var(--brand-main)" fillOpacity={0.4} />
                                            <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Line Graph */}
                            <motion.div variants={itemVariants} style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Learning Progress Trend</h3>
                                    <div style={{ display: 'flex', gap: '0.8rem', background: 'var(--bg-secondary)', padding: '0.3rem', borderRadius: '12px' }}>
                                        <button onClick={() => setProgressFilter('weekly')} style={{ background: progressFilter === 'weekly' ? 'var(--bg-primary)' : 'transparent', color: progressFilter === 'weekly' ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', boxShadow: progressFilter === 'weekly' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}>Weekly</button>
                                        <button onClick={() => setProgressFilter('monthly')} style={{ background: progressFilter === 'monthly' ? 'var(--bg-primary)' : 'transparent', color: progressFilter === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', boxShadow: progressFilter === 'monthly' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}>Monthly</button>
                                    </div>
                                </div>
                                <div style={{ flex: 1, minHeight: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RechartsLineChart data={trendData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} domain={[0, 100]} />
                                            <RechartsTooltip 
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', background: 'var(--bg-primary)' }}
                                                cursor={{ stroke: 'var(--border-color)', strokeWidth: 2 }}
                                            />
                                            <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--brand-main)' }} />
                                        </RechartsLineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                );

            case 'courses':
                const enrolledCourses = [
                    { id: 1, subject: 'Physics', title: 'CBSE Class 11 Physics', instructor: 'Saravana Kumar K', progress: 65, color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', status: 'Active', plan: 'Monthly', startDate: 'March 10, 2026', endDate: 'April 10, 2026', classesAttended: 24, testsAttempted: 8, avgScore: 82 },
                    { id: 2, subject: 'Mathematics', title: 'CBSE Class 11 Mathematics', instructor: 'Gurunathan', progress: 72, color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)', status: 'Active', plan: 'Monthly', startDate: 'March 10, 2026', endDate: 'April 10, 2026', classesAttended: 20, testsAttempted: 6, avgScore: 85 },
                    { id: 3, subject: 'Chemistry', title: 'CBSE Class 11 Chemistry', instructor: 'Chemistry Faculty', progress: 60, color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', status: 'Active', plan: 'Yearly', startDate: 'Oct 15, 2025', endDate: 'Oct 15, 2026', classesAttended: 42, testsAttempted: 12, avgScore: 78 },
                    { id: 4, subject: 'Biology', title: 'CBSE Class 11 Biology', instructor: 'Biology Faculty', progress: 68, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', status: 'Active', plan: 'Yearly', startDate: 'Nov 1, 2025', endDate: 'Nov 1, 2026', classesAttended: 38, testsAttempted: 10, avgScore: 80 }
                ];

                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <motion.h2 variants={itemVariants} style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, color: '#2563eb' }}>
                                My Enrolled Courses
                            </motion.h2>
                            <motion.p variants={itemVariants} style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                                Manage and access all your active courses
                            </motion.p>
                        </div>
                        
                        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.8rem 1.2rem', maxWidth: '600px' }}>
                                <input type="text" placeholder="Search Course" style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: 'var(--text-primary)' }} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="courses-grid" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(4, 1fr)', 
                            gap: '1.5rem' 
                        }}>
                            {enrolledCourses.map((c) => (
                                <motion.div 
                                    key={c.id} 
                                    className="modern-course-card"
                                    onClick={() => setSelectedEnrolledCourse(c)}
                                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                    style={{ 
                                        border: '1px solid #f1f5f9', 
                                        cursor: 'pointer', 
                                        padding: '1.8rem', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: '1.2rem', 
                                        borderRadius: '24px', 
                                        background: '#fff',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Status Badge */}
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '1.2rem', 
                                        right: '1.2rem',
                                        padding: '0.3rem 0.8rem', 
                                        background: 'rgba(34, 197, 94, 0.1)', 
                                        color: '#16a34a', 
                                        borderRadius: '20px', 
                                        fontSize: '0.7rem', 
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {c.status}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                        <h3 style={{ 
                                            fontSize: '1.4rem', 
                                            margin: 0, 
                                            fontWeight: 800, 
                                            color: c.color, 
                                            letterSpacing: '-0.025em' 
                                        }}>{c.subject}</h3>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>CBSE Class 11</div>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.8rem',
                                        background: '#f8fafc',
                                        padding: '0.8rem',
                                        borderRadius: '16px'
                                    }}>
                                        <div style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            borderRadius: '50%', 
                                            background: c.color, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '0.8rem',
                                            fontWeight: 700
                                        }}>
                                            {c.instructor.charAt(0)}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Instructor</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{c.instructor}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Syllabus Completion</span>
                                            <span style={{ color: c.color, fontSize: '1.1rem', fontWeight: 800 }}>{c.progress}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${c.progress}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                style={{ height: '100%', background: c.color, borderRadius: '4px' }}
                                            />
                                        </div>
                                    </div>

                                    <button style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        background: c.color, 
                                        color: '#fff', 
                                        border: 'none', 
                                        borderRadius: '16px', 
                                        fontSize: '0.95rem', 
                                        fontWeight: 700, 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.6rem',
                                        boxShadow: `0 10px 15px -3px ${c.color}33`,
                                        transition: 'all 0.2s'
                                    }}>
                                        Continue Learning
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Course Details Modal */}
                        <AnimatePresence>
                            {selectedEnrolledCourse && (
                                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} onClick={() => setSelectedEnrolledCourse(null)}>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ background: '#fff', width: '100%', maxWidth: '450px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', position: 'relative' }}
                                    >
                                        <button 
                                            onClick={() => setSelectedEnrolledCourse(null)}
                                            style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                        
                                        <div style={{ padding: '2rem 2rem 1rem 2rem' }}>
                                            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', fontWeight: 700, color: '#1e293b' }}>{selectedEnrolledCourse.title}</h2>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                                                    {selectedEnrolledCourse.instructor.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                </div>
                                                <span style={{ fontSize: '0.95rem', color: '#475569' }}>{selectedEnrolledCourse.instructor}</span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Enrolled</span>
                                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                            </div>

                                            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{selectedEnrolledCourse.plan} Plan</h3>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                                                <div>Start Date: <span style={{ fontWeight: 600, color: '#334155' }}>{selectedEnrolledCourse.startDate}</span></div>
                                                <div>End Date: <span style={{ fontWeight: 600, color: '#334155' }}>{selectedEnrolledCourse.endDate}</span></div>
                                            </div>

                                            <button style={{ background: '#ffedd5', color: '#f97316', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', marginBottom: '1.5rem' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                Renew Plan
                                            </button>

                                            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>Syllabus Completion</span>
                                                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>{selectedEnrolledCourse.progress}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                                    <div style={{ width: `${selectedEnrolledCourse.progress}%`, height: '100%', background: '#2563eb', borderRadius: '4px' }}></div>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div style={{ padding: '0.5rem', background: '#dcfce7', borderRadius: '8px', color: '#16a34a' }}>
                                                            <BookOpen size={18} />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Classes<br/>Attended</span>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1 }}>{selectedEnrolledCourse.classesAttended}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{ width: '1px', height: '30px', background: '#e2e8f0' }}></div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div style={{ padding: '0.5rem', background: '#f3e8ff', borderRadius: '8px', color: '#9333ea' }}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Tests<br/>Attempted</span>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1 }}>{selectedEnrolledCourse.testsAttempted}</span>
                                                        </div>
                                                    </div>

                                                    <div style={{ width: '1px', height: '30px', background: '#e2e8f0' }}></div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div style={{ padding: '0.5rem', background: '#ffedd5', borderRadius: '8px', color: '#f97316' }}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Average<br/>Score</span>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1 }}>{selectedEnrolledCourse.avgScore}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                                                <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                    Continue Learning
                                                </button>
                                                <button style={{ background: '#fff', color: '#334155', border: '1px solid #cbd5e1', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                    <CreditCard size={16} />
                                                    View Curriculum
                                                </button>
                                            </div>
                                            
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <button style={{ background: '#f97316', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                    Renew Plan
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );

            case 'fees':


                const paidData = [
                    { name: 'M1', amount: 4000 },
                    { name: 'M2', amount: 3000 },
                    { name: 'M3', amount: 5000 },
                    { name: 'M4', amount: 4500 },
                    { name: 'M5', amount: 4200 },
                    { name: 'M6', amount: 4300 },
                ];

                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', overflow: 'hidden', paddingBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                            <motion.h2 variants={itemVariants} style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>
                                Fee Management
                            </motion.h2>
                            <motion.p variants={itemVariants} style={{ margin: 0, color: '#64748b', fontSize: '0.82rem', fontWeight: 500 }}>
                                Track and manage your subscription plans with ease
                            </motion.p>
                        </div>

                        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', alignItems: 'stretch' }}>
                            {/* YEARLY PLAN CARD */}
                            <div style={{ 
                                background: 'linear-gradient(135deg, #ffffff, #f8fafc)', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '18px', 
                                padding: '0.85rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ padding: '0.4rem', background: '#f1f5f9', borderRadius: '10px', color: '#64748b' }}>
                                            <Award size={18} />
                                        </div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>Yearly Access</span>
                                    </div>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '8px', background: '#f1f5f9', color: '#94a3b8', textTransform: 'uppercase' }}>Inactive</span>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                                    {[
                                        { name: 'Mathematics', active: true, color: '#8b5cf6' },
                                        { name: 'Physics', active: true, color: '#0ea5e9' },
                                        { name: 'Chemistry', active: false, color: '#94a3b8' },
                                        { name: 'Biology', active: false, color: '#94a3b8' }
                                    ].map((sub, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                                                <span style={{ color: sub.active ? sub.color : '#cbd5e1' }}>{sub.name}</span>
                                                <span style={{ color: '#cbd5e1' }}>0d</span>
                                            </div>
                                            <div style={{ width: '100%', height: '4px', background: '#f8fafc', borderRadius: '2px' }}>
                                                <div style={{ width: '0%', height: '100%', background: '#cbd5e1', borderRadius: '2px' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 'auto', padding: '0.55rem', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #e2e8f0', textAlign: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>Plan not activated</span>
                                </div>
                            </div>

                            {/* MONTHLY PLAN CARD */}
                            <div style={{ 
                                background: 'linear-gradient(135deg, #ffffff, #f0f7ff)', 
                                border: '1px solid #bfdbfe', 
                                borderRadius: '18px', 
                                padding: '0.85rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
                                            <CreditCard size={18} />
                                        </div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e40af' }}>Monthly Access</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', textTransform: 'uppercase' }}>Active</span>
                                        <button 
                                            onClick={() => setIsRenewModalOpen(true)}
                                            style={{ padding: '0.2rem 0.55rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '0.6rem', fontWeight: 800, cursor: 'pointer' }}
                                        >
                                            Renew
                                        </button>
                                    </div>
                                </div>
                                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                                    {enrollmentDetails.map((sub, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                                                <span style={{ color: sub.active ? '#1e40af' : '#cbd5e1' }}>{sub.name}</span>
                                                <span style={{ color: sub.active ? sub.color : '#cbd5e1' }}>{sub.days}d</span>
                                            </div>
                                            <div style={{ width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                                                <div style={{ width: sub.active ? `${Math.min(100, (sub.days / 30) * 100)}%` : '0%', height: '100%', background: sub.active ? sub.grad : '#cbd5e1', borderRadius: '2px' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => setIsRenewModalOpen(true)}
                                    style={{ 
                                    marginTop: '0.1rem',
                                    padding: '0.7rem', 
                                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '12px', 
                                    fontSize: '0.85rem', 
                                    fontWeight: 800, 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.45rem',
                                    boxShadow: '0 6px 10px -2px rgba(37, 99, 235, 0.25)'
                                }}>
                                    <Award size={16} />
                                    Upgrade to Yearly Access (Save 20%)
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ 
                            background: 'linear-gradient(90deg, #f0fdf4, #ffffff)', 
                            border: '1px solid #dcfce7', 
                            borderRadius: '16px', 
                            padding: '0.8rem 1.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '10px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>Total Paid (YTD)</span>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e293b' }}>₹33,600</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>2024-25 Session</span>
                                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>Verified</span>
                                </div>
                                <div style={{ height: '32px', width: '100px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={paidData}>
                                            <Bar dataKey="amount" fill="#16a34a" radius={[3, 3, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1.2fr 1.8fr', 
                            gap: '0.8rem',
                            background: '#fff',
                            borderRadius: '20px',
                            border: '1px solid #f1f5f9',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            {/* LEFT DETAIL PANEL */}
                            <div style={{ padding: '0.95rem', borderRight: '1px solid #f1f5f9', background: '#fafafa' }}>
                                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: '#1e293b' }}>Subscription Details</h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Current Plan</span>
                                        <span style={{ fontSize: '0.68rem', color: '#2563eb', fontWeight: 900 }}>MONTHLY</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>{enrollmentDetails.map(d => d.name).join(' & ')}</div>
                                        <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>CBSE Grade 11</div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.3rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Renewal Date:</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Nov 15, 2025</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Subscription Fee:</span>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#1e293b' }}>₹5,600</span>
                                        </div>
                                    </div>
                                </div>

                                <button style={{ 
                                    marginTop: '0.5rem',
                                    padding: '0.6rem',
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    color: '#475569',
                                    fontWeight: 800,
                                    fontSize: '0.78rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.4rem',
                                    cursor: 'pointer'
                                }}>
                                    <CreditCard size={14} />
                                    Change Plan
                                </button>
                            </div>

                            {/* RIGHT LIST PANEL */}
                            <div style={{ padding: '0.95rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 0.8rem 0' }}>
                                    <h3 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>Recent Invoices</h3>
                                    <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}>View All</button>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                                    {[
                                        { id: '1042', date: '01 Oct 2025', amount: '₹5,600' },
                                        { id: '0921', date: '01 Sep 2025', amount: '₹5,600' },
                                        { id: '0815', date: '15 Aug 2025', amount: '₹5,600' }
                                    ].map((inv, i) => (
                                        <div key={i} style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: '0.8fr 1.2fr 1fr 0.8fr', 
                                            alignItems: 'center',
                                            padding: '0.5rem 0.7rem',
                                            background: i === 0 ? '#f8fafc' : 'transparent',
                                            borderRadius: '8px',
                                            borderBottom: i === 2 ? 'none' : '1px solid #f1f5f9'
                                        }}>
                                            <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.88rem' }}>#{inv.id}</span>
                                            <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{inv.date}</span>
                                            <span style={{ fontWeight: 900, color: '#1e293b', fontSize: '0.88rem' }}>{inv.amount}</span>
                                            <div style={{ textAlign: 'right' }}>
                                                <button style={{ 
                                                    background: '#ebf5ff', 
                                                    color: '#2563eb', 
                                                    border: 'none', 
                                                    padding: '0.35rem 0.7rem', 
                                                    borderRadius: '6px', 
                                                    fontSize: '0.7rem', 
                                                    fontWeight: 800, 
                                                    cursor: 'pointer' 
                                                 }}>
                                                    PDF
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );

            case 'timetable':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1.5rem' }}>
                            <motion.h2 variants={itemVariants} style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#2563eb', letterSpacing: '-0.01em' }}>My Class Schedule</motion.h2>
                            <motion.p variants={itemVariants} style={{ margin: 0, color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Weekly class timetable. Keep track of upcoming classes.</motion.p>
                        </div>
                        
                        <motion.div variants={itemVariants} style={{ 
                            background: '#fff', 
                            borderRadius: '24px', 
                            padding: '1.5rem',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>TIME</span>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    background: '#fff', 
                                    borderRadius: '10px',
                                    border: '1px solid #eef2f6',
                                    padding: '0.3rem'
                                }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0.6rem', color: '#64748b', borderRight: '1px solid #eef2f6', display: 'flex', alignItems: 'center' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </button>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb', padding: '0 1rem' }}>This Week</span>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0.6rem', color: '#64748b', borderLeft: '1px solid #eef2f6', display: 'flex', alignItems: 'center' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </button>
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
                                <style>{`
                                    .hide-scrollbar::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', tableLayout: 'fixed' }}>
                                    <thead style={{ background: 'transparent' }}>
                                        <tr style={{ textAlign: 'center' }}>
                                            <th style={{ padding: '1rem 0.5rem', color: '#94a3b8', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', width: '100px' }}>TIME</th>
                                            <th style={{ padding: '1rem', color: '#1e293b', fontWeight: 800, borderLeft: '1px solid #f8fafc', fontSize: '1rem' }}>Monday</th>
                                            <th style={{ padding: '1rem', color: '#1e293b', fontWeight: 800, borderLeft: '1px solid #f8fafc', fontSize: '1rem' }}>Tuesday</th>
                                            <th style={{ padding: '1rem', color: '#1e293b', fontWeight: 800, borderLeft: '1px solid #f8fafc', fontSize: '1rem' }}>Wed</th>
                                            <th style={{ padding: '1rem', color: '#1e293b', fontWeight: 800, borderLeft: '1px solid #f8fafc', fontSize: '1rem' }}>Thu</th>
                                            <th style={{ padding: '1rem', color: '#1e293b', fontWeight: 800, borderLeft: '1px solid #f8fafc', fontSize: '1rem' }}>Fri</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { 
                                                time: '04:00 PM', 
                                                mon: { name: 'Physics', icon: true, type: 'blue' }, 
                                                tue: { name: 'Chemistry', icon: true, type: 'purple' }, 
                                                wed: { name: 'Mathematics', icon: false, type: 'green' }, 
                                                thu: null, 
                                                fri: { name: 'Physics - Mock', icon: false, type: 'blue' } 
                                            },
                                            { 
                                                time: '05:30 PM', 
                                                mon: null, 
                                                tue: null, 
                                                wed: null, 
                                                thu: null, 
                                                fri: null 
                                            },
                                            { 
                                                time: '05:30 PM', 
                                                mon: { name: 'Chemistry Doubt', icon: true, type: 'purple', boldPart: 'Doubt' }, 
                                                tue: null, 
                                                wed: null, 
                                                thu: null, 
                                                fri: { name: 'Math Live', icon: true, type: 'blue' } 
                                            },
                                            { 
                                                time: '05:30 PM', 
                                                mon: null, 
                                                tue: null, 
                                                wed: null, 
                                                thu: null, 
                                                fri: { name: 'Math Live', icon: false, type: 'green', boldAll: true } 
                                            }
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td style={{ padding: '1.2rem 0.5rem', borderTop: '1px solid #f8fafc', fontWeight: 800, color: '#3b82f6', textAlign: 'center', fontSize: '0.9rem' }}>{row.time}</td>
                                                {['mon', 'tue', 'wed', 'thu', 'fri'].map(day => (
                                                    <td key={day} style={{ padding: '0.4rem 0.5rem', borderTop: '1px solid #f8fafc', borderLeft: '1px solid #f8fafc', textAlign: 'center' }}>
                                                        {row[day] ? (
                                                            <div style={{ 
                                                                background: row[day].type === 'blue' ? '#eff6ff' : row[day].type === 'purple' ? '#faf5ff' : '#ecfdf5',
                                                                color: row[day].type === 'blue' ? '#2563eb' : row[day].type === 'purple' ? '#9333ea' : '#059669',
                                                                padding: '0.8rem 0.4rem',
                                                                borderRadius: '10px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: row[day].boldAll ? 800 : 700,
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '0.4rem',
                                                                width: '100%',
                                                                justifyContent: 'center',
                                                                boxSizing: 'border-box'
                                                            }}>
                                                                {row[day].icon && <Clock size={14} />}
                                                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {row[day].boldPart ? (
                                                                        <>
                                                                            {row[day].name.replace(row[day].boldPart, '')}
                                                                            <span style={{ fontWeight: 800 }}>{row[day].boldPart}</span>
                                                                        </>
                                                                    ) : row[day].name}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '1rem' }}>-</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                );

            case 'certificates':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="modern-card">
                        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <h2 className="heading-medium" style={{ margin: 0, fontSize: '2rem' }}>My Achievements</h2>
                            <span style={{ padding: '0.6rem 1.2rem', background: 'var(--brand-glow)', color: 'var(--brand-main)', borderRadius: '12px', fontWeight: 700 }}>2 Certificates Earned</span>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[
                                { title: 'Excellence in Preliminary Exam', date: 'August 2024', grade: 'A+' },
                                { title: 'Science Fair Participant', date: 'May 2024', grade: 'Pass' }
                            ].map((cert, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--brand-main), #c026d3)' }}></div>
                                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🏆</span>
                                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{cert.title}</h4>
                                    <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Issued: {cert.date}</p>
                                    <span style={{ display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '8px', fontWeight: 700, marginBottom: '1.5rem' }}>Grade: {cert.grade}</span>
                                    <button className="btn-secondary" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }}>Download Certificate</button>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                );

            default:
                return <EmptyState message="Select a section" />;
        }
    };

    return (
        <DashboardLayout 
            role="Student"
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={setActiveSection}
            onLogout={() => {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("role");
            }}
        >
            {renderContent()}
            <RenewModal isOpen={isRenewModalOpen} onClose={() => setIsRenewModalOpen(false)} />
        </DashboardLayout>
    );
};

export default StudentDashboard;
