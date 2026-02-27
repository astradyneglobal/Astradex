import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validate = () => {
        let errs = {};
        if (!email) errs.email = "Email required";
        if (!password) errs.password = "Password required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError('');
        if (!validate()) return;

        try {
            // Demo Accounts for testing
            const demoAccounts = [
                { email: "admin@astradex.com", password: "admin", name: "System Admin", role: "admin", department: "Central Admin", school: "Astradex HQ", joiningDate: "01/01/2024" },
                { email: "staff@astradex.com", password: "staff", name: "Prof. S. Sharma", role: "staff", department: "Physics Dept", school: "Astradex School", joiningDate: "15/03/2024" }
            ];

            const registeredUsers = JSON.parse(localStorage.getItem("astradex_users") || "[]");
            const allUsers = [...demoAccounts, ...registeredUsers];

            const user = allUsers.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("userName", user.name);
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userGrade", user.grade || "N/A");
                localStorage.setItem("userDepartment", user.department || "N/A");
                localStorage.setItem("userJoiningDate", user.joiningDate || new Date().toLocaleDateString());
                localStorage.setItem("userSchool", user.school || "N/A");
                localStorage.setItem("role", user.role);
                localStorage.setItem("loggedIn", "true");

                // Role-based navigation
                setTimeout(() => {
                    if (user.role === "admin") navigate("/dashboard/admin");
                    else if (user.role === "staff") navigate("/dashboard/staff");
                    else navigate("/dashboard/student");
                }, 400);

            } else {
                setServerError("Invalid email or password");
            }
        } catch (error) {
            setServerError("Internal error occurred during login");
        }
    };

    return (
        <main className="auth-layout">
            <section className="auth-panel">
                <div className="auth-card">
                    <h2 className="auth-heading">Welcome back</h2>
                    <p className="auth-subheading">
                        Login to continue your board exam preparation with live classes and smart practice.
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
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={errors.password ? { borderColor: '#ef4444' } : {}}
                            />
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