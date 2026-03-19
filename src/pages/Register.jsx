import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1: Basic Info
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [grade, setGrade] = useState("");
    const [school, setSchool] = useState("");

    // Step 2: OTP
    const [otp, setOtp] = useState("");

    // Step 3: Passwords
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // SVG Icons
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    );
    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
    );


    const [serverError, setServerError] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState({ label: "", color: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Real-time Email Domain Check
    useEffect(() => {
        if (!email) {
            setEmailValid(true);
            return;
        }
        const commonDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com", "zoho.com"];
        const domain = email.split("@")[1];
        if (domain && !commonDomains.includes(domain.toLowerCase())) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    }, [email]);

    // Password Strength Logic
    useEffect(() => {
        if (!password) {
            setPasswordStrength({ label: "", color: "" });
            return;
        }
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        if (hasUpper && hasLower && hasNumber && hasSymbol && isLongEnough) {
            setPasswordStrength({ label: "Strong", color: "#10b981" });
        } else {
            setPasswordStrength({ label: "Weak", color: "#ef4444" });
        }
    }, [password]);

    const [successMessage, setSuccessMessage] = useState("");

    const handleSendOtp = async () => {
        if (!name || !email || !mobile || !grade || !school || !emailValid) {
            setServerError("Please fill all fields correctly first.");
            return;
        }

        // Mobile number validation (exactly 10 digits)
        const mobileDigits = mobile.replace(/\D/g, '');
        if (mobileDigits.length !== 10) {
            setServerError("Mobile number must be exactly 10 digits.");
            return;
        }

        setIsLoading(true);
        setServerError("");
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok) {
                setStep(2);
                setSuccessMessage(`Verification code sent to ${email}. Please check your inbox.`);
            } else {
                setServerError(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            console.error(err);
            setServerError("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setServerError("Please enter the OTP.");
            return;
        }

        setIsLoading(true);
        setServerError("");
        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                setServerError("");
                setSuccessMessage("Your OTP has been successfully verified.");
                // Delay moving to step 3 so the user can see the success message
                setTimeout(() => {
                    setStep(3);
                    setSuccessMessage(""); // Clear message for step 3
                }, 1500);
            } else {
                const data = await response.json();
                setServerError(data.message || "Invalid OTP code. Please try again.");
            }
        } catch (err) {
            setServerError("Failed to verify OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setServerError("");

        if (password !== confirmPassword) {
            setServerError("Passwords do not match.");
            return;
        }

        if (passwordStrength.label !== "Strong") {
            setServerError("Password does not meet the safety requirements.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, grade, school, mobile }),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                setServerError(data.message || "Registration failed");
            }
        } catch (error) {
            setServerError("Internal error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth-layout">
            <section className="auth-panel">
                <div className="auth-card">
                    <h2 className="auth-heading">Step {step}: {step === 1 ? "Your Info" : step === 2 ? "Verify Email" : "Set Password"}</h2>

                    {serverError && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>{serverError}</div>}

                    {step === 1 && (
                        <div className="auth-form">
                            <div className="auth-field">
                                <label>Full name</label>
                                <input type="text" className="auth-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="auth-field">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="auth-input"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={!emailValid ? { borderColor: '#ef4444' } : {}}
                                />
                                {!emailValid && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>Invalid official domain. Use Gmail, Outlook, etc.</span>}
                            </div>

                            <div className="auth-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Grade</label>
                                    <select className="auth-select" value={grade} onChange={(e) => setGrade(e.target.value)} required>
                                        <option value="">Select</option>
                                        {["IX", "X", "XI", "XII"].map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label>School</label>
                                    <input type="text" className="auth-input" placeholder="School Name" value={school} onChange={(e) => setSchool(e.target.value)} required />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Mobile Number</label>
                                <input type="tel" className="auth-input" placeholder="+91 98765 43210" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                            </div>

                            <button
                                onClick={handleSendOtp}
                                className="btn-primary"
                                style={{ width: '100%', borderRadius: '999px', marginTop: '1rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="auth-form">
                            <div className="success-banner">
                                <span>📩</span>
                                <div>
                                    {successMessage || `Verification code sent to ${email}.`}
                                </div>
                            </div>
                            <div className="auth-field">
                                <label>Enter OTP</label>
                                <input type="text" className="auth-input" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            </div>
                            <button
                                onClick={handleVerifyOtp}
                                className="btn-primary"
                                style={{ width: '100%', borderRadius: '999px', marginTop: '1rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Checking..." : "Verify OTP"}
                            </button>
                            <button onClick={() => setStep(1)} className="btn-secondary" style={{ width: '100%', borderRadius: '999px', marginTop: '0.5rem', background: 'transparent', border: 'none' }}>
                                Back to Step 1
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="auth-field">
                                <label>Set Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                                {password && (
                                    <div className="password-strength-text" style={{ color: passwordStrength.color }}>
                                        <span>{passwordStrength.label === "Strong" ? "✅" : "❌"}</span>
                                        {passwordStrength.label}
                                    </div>
                                )}
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                                    Must contain: 8+ chars, 1 Uppercase, 1 Lowercase, 1 Symbol, 1 Number.
                                </p>
                            </div>

                            <div className="auth-field">
                                <label>Confirm Password</label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', borderRadius: '999px', marginTop: '1rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Registering..." : "Register & Submit"}
                            </button>
                        </form>
                    )}

                    <div className="auth-footer-text" style={{ marginTop: '1.5rem' }}>
                        Already have an account?{' '}
                        <span className="auth-footer-link" onClick={() => navigate('/login')}>Login</span>
                    </div>
                </div>
            </section>

            <aside className="auth-illustration" aria-hidden="true">
                <div className="auth-blob" />
                <div className="auth-illustration-content">
                    <div className="auth-illustration-inner">
                        <div className="auth-badge">
                            <span>{step === 3 ? "Almost there" : "New here?"}</span>
                            <span>{step === 3 ? "Secure your account" : "Start strong"}</span>
                        </div>
                        <h2 className="auth-illustration-title">
                            {step === 3 ? "Safety first, always." : "Ready to ace your board exams?"}
                        </h2>
                        <p className="auth-illustration-text">
                            {step === 3 ? "Create a strong password to protect your progress and access your study materials securely." : "Create your free account, pick your course and start learning with our expert faculty from day one."}
                        </p>
                        <ul className="auth-illustration-points">
                            <li>Live doubt-clearing sessions</li>
                            <li>Exam-style mock tests</li>
                            <li>Track your progress in real time</li>
                        </ul>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Register;




