import React from 'react';
import { motion } from 'framer-motion';
import brochurePlaceholder from '../assets/faculty_brochure_placeholder.png';
import '../styles.css';

export function SkeletonLoader({ width = '100%', height = 24, style = {}, className = '' }) {
  return (
    <div
      className={`skeleton-loader shimmer ${className}`}
      style={{ width, height, borderRadius: 8, ...style }}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
}

export function EmptyState({ message = 'No data found.', icon = '📭', style = {} }) {
  return (
    <div className="empty-state" style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8', ...style }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{message}</div>
    </div>
  );
}

export function AnimatedCounter({ value, duration = 1200, isVisible = true, className = '', style = {} }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = Number(value);
    if (start === end) return;
    const increment = Math.ceil(end / (duration / 30));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value, duration, isVisible]);
  return <span className={className} style={style}>{count}</span>;
}

export function FacultyModal({ faculty, onClose }) {
  if (!faculty) return null;

  return (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-spacer" />
      <motion.div 
        className="modal-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="modal-inner">
            <div className="modal-left">
              <div className="modal-header">
                <div className="modal-faculty-img">
                  <img src={faculty.image} alt={faculty.name} />
                </div>
                <div className="modal-title-group">
                  <h3 className="modal-name">{faculty.name}</h3>
                  <p className="modal-subtitle">{faculty.subject} Mentor</p>
                </div>
              </div>

              <div className="modal-info-grid">
                <div className="info-item">
                  <span className="info-label">Qualification</span>
                  <span className="info-value">{faculty.qualification}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Experience</span>
                  <span className="info-value">{faculty.experience}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Board</span>
                  <span className="info-value">{faculty.board}</span>
                </div>
              </div>

              <div className="modal-video-section">
                <h4 className="video-title">Introduction Video</h4>
                <div className="video-container">
                  {faculty.videoUrl ? (
                    <iframe
                      src={faculty.videoUrl}
                      title={`${faculty.name} Introduction`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                      Video not available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-right">
              <div className="modal-brochure-section">
                <h4 className="brochure-title">Faculty Brochure</h4>
                <div className="brochure-container">
                  <img
                    src={faculty.brochure || brochurePlaceholder}
                    alt="Faculty Brochure"
                    className="brochure-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
