
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { SkeletonLoader, EmptyState } from '../components/UIUtils';
import { motion } from 'framer-motion';


export default function CourseDetail() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false); // For future API
  const [planFilter, setPlanFilter] = useState('Yearly');
  const course = getCourseById(courseId);

  if (loading) {
    return <main className="course-detail"><SkeletonLoader height={320} /><SkeletonLoader height={180} /><SkeletonLoader height={180} /></main>;
  }
  if (!course) {
    return (
      <main className="course-detail" style={{ padding: '2rem 1.5rem' }}>
        <EmptyState message="The course you are looking for does not exist or has been removed." />
        <Link to="/courses" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to Catalog</Link>
      </main>
    );
  }

  return (
    <main className="course-detail" aria-labelledby="course-title">
      <div className="detail-top">
        <div className="detail-head-text">
          <h1 id="course-title" className="heading-medium" style={{ textTransform: 'none' }}>{course.name}</h1>
          <p className="paragraph-main" style={{ marginBottom: '1rem' }}>{course.tagline}</p>
          <p className="course-desc" style={{ marginBottom: '1.25rem' }}>{course.description}</p>
          <div className="catalog-filters-container" style={{ marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
            <div className="tab-group plan-tabs" role="tablist">
              {['Yearly', 'Monthly'].map((plan) => (
                <button
                  key={plan}
                  role="tab"
                  aria-selected={planFilter === plan}
                  className={`tab-item ${planFilter === plan ? 'is-active' : ''}`}
                  onClick={() => setPlanFilter(plan)}
                >
                  <span style={{ position: 'relative', zIndex: 3 }}>{plan}</span>
                  {planFilter === plan && (
                    <motion.div
                      layoutId="plan-indicator"
                      className="tab-indicator"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="price-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div className="price-item">
              <span className="price-value" style={{ fontSize: '1.6rem', color: 'var(--brand-main)', fontWeight: '700' }}>
                {course.currency} {(planFilter === 'Monthly' ? course.monthlyPrice : course.yearlyPrice).toLocaleString()}
                {planFilter === 'Monthly' && <small style={{ fontSize: '0.9rem', opacity: 0.8, marginLeft: '4px' }}>/monthly</small>}
              </span>
            </div>
          </div>
          <button
            className="btn-primary enroll-btn"
            onClick={() => alert(`Enrollment flow for ${course.name} coming soon!`)}
          >Enroll Now</button>
          <Link to="/courses" className="inline-back">Back to catalog</Link>
        </div>
        <aside className="detail-meta">
          <div className="meta-block">
            <h2 className="meta-heading">Quick Facts</h2>
            <ul className="meta-list">
              <li><strong>Level:</strong> {course.level}</li>
              <li><strong>Duration:</strong> {course.durationWeeks} weeks</li>
              <li><strong>Modules:</strong> {course.curriculum.length}</li>
              <li><strong>Instructors:</strong> {course.instructors.length}</li>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <li><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</li>
              )}
            </ul>
          </div>
          <div className="meta-block">
            <h2 className="meta-heading">Highlights</h2>
            <ul className="highlight-list">
              {(planFilter === 'Monthly' ? course.monthlyHighlights : course.highlights).map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
          {course.tags && course.tags.length > 0 && (
            <div className="meta-block">
              <h2 className="meta-heading">Tags</h2>
              <ul className="highlight-list">
                {course.tags.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}
          {course.upcomingBatches && course.upcomingBatches.length > 0 && (
            <div className="meta-block">
              <h2 className="meta-heading">Upcoming Batches</h2>
              <ul className="highlight-list">
                {course.upcomingBatches.map(b => (
                  <li key={b.code}>{b.code} — starts {b.start} · {b.seats} seats</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {course.demoVideo && (
        <section className="demo-video-section" style={{ marginBottom: '3.5rem' }}>
          <h2 className="section-subheading">Free Demo Lesson</h2>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '1.2rem', boxShadow: '0 10px 30px -5px var(--shadow-color)' }}>
            <iframe
              src={course.demoVideo}
              title={`Demo video for ${course.name}`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <section className="curriculum-section" aria-labelledby="curriculum-heading">
        <h2 id="curriculum-heading" className="section-subheading">Curriculum Outline</h2>
        <div className="curriculum-grid">
          {course.curriculum.map(m => (
            <div key={m.module} className="curriculum-card">
              <h3 className="curriculum-module">{m.module}</h3>
              <ul className="lesson-list">
                {m.lessons.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="instructors-section" aria-labelledby="instructors-heading">
        <h2 id="instructors-heading" className="section-subheading">Our Experts</h2>
        <div className="instructors-grid">
          {course.instructors.map(inst => (
            <div key={inst.id} className="instructor-card modern-card">
              <div className="instructor-photo-container">
                {inst.photo ? (
                  <img src={inst.photo} alt={inst.name} className="instructor-photo" />
                ) : (
                  <div className="instructor-avatar-modern">{inst.name.charAt(0)}</div>
                )}
              </div>
              <div className="instructor-body">
                <h3 className="instructor-name">{inst.name}</h3>
                <div className="instructor-labels">
                  <div className="label-item">
                    <span className="label-tag">Qualification:</span>
                    <span className="label-text">{inst.qualification}</span>
                  </div>
                  <div className="label-item">
                    <span className="label-tag">Board:</span>
                    <span className="label-text">{inst.boardInfo}</span>
                  </div>
                  <div className="label-item">
                    <span className="label-tag">Subject:</span>
                    <span className="label-text">{inst.subjectInfo}</span>
                  </div>
                  <div className="label-item">
                    <span className="label-tag">Experience:</span>
                    <span className="label-text">{inst.experienceYears} years</span>
                  </div>
                </div>
                {inst.videoUrl && (
                  <button 
                    className="btn-watch-intro"
                    onClick={() => window.open(inst.videoUrl, '_blank')}
                  >
                    <span className="play-icon">▶</span> Watch Intro
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
