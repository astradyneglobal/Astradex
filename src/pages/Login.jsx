import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get role from query parameter
    const queryParams = new URLSearchParams(location.search);
    const selectedRole = queryParams.get('role') || 'student';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    // SVG Icons
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    );
    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
    );

    const validate = () => {
        let errs = {};
        if (!email) {
            errs.email = "Email required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errs.email = "Incorrect mail format or mail format was wrong";
            }
        }
        if (!password) errs.password = "Password required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError('');
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role: selectedRole }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage on success
                localStorage.setItem("userName", data.name);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userGrade", data.grade || "N/A");
                localStorage.setItem("userDepartment", data.department || "N/A");
                localStorage.setItem("userJoiningDate", data.joiningDate || new Date().toLocaleDateString());
                localStorage.setItem("userSchool", data.school || "N/A");
                localStorage.setItem("role", data.role);
                localStorage.setItem("loggedIn", "true");

                // Role-based navigation
                setTimeout(() => {
                    if (data.role === "admin") navigate("/dashboard/admin");
                    else if (data.role === "staff") navigate("/dashboard/staff");
                    else navigate("/dashboard/student");
                }, 400);

            } else {
                setServerError(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setServerError("Internal error occurred during login. Please ensure backend is running.");
        }
    };

    return (
        <main className="auth-layout">
            <section className="auth-panel">
                <div className="auth-card">
                    <h2 className="auth-heading">Welcome back, {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
                    <p className="auth-subheading">
                        Login to your {selectedRole} account to continue.
                    </p>

                    <form onSubmit={handleLogin} className="auth-form">

                        <div className="auth-field">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={errors.email ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>{errors.email}</span>}
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={errors.password ? { borderColor: '#ef4444' } : {}}
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                            {errors.password && <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>{errors.password}</span>}
                        </div>

                        {serverError && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 600 }}>{serverError}</div>}

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', borderRadius: '999px', marginTop: '0.5rem' }}
                        >
                            Login
                        </button>
                    </form>
                    {selectedRole === 'student' && (
                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                            <button
                                onClick={() => navigate('/register')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--brand-main)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    padding: 0,
                                    textDecoration: 'underline'
                                }}
                            >
                                Register here
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <aside className="auth-illustration" aria-hidden="true">
                <div className="auth-blob" />
                <div className="auth-illustration-content">
                    <div className="auth-illustration-inner">
                        <div className="auth-badge">
                            <span>Astradex</span>
                            <span>Board Exam Hub</span>
                        </div>
                        <h2 className="auth-illustration-title">
                            Study smart for 10th, 11th &amp; 12th.
                        </h2>
                        <p className="auth-illustration-text">
                            Interactive classes, instant doubt solving and detailed progress tracking –
                            all in a single beautiful dashboard.
                        </p>
                        <ul className="auth-illustration-points">
                            <li>Live classes from expert faculty</li>
                            <li>AI-powered practice quizzes</li>
                            <li>Personalised progress analytics</li>
                        </ul>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Login;