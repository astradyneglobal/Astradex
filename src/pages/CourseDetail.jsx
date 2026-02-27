
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { SkeletonLoader, EmptyState } from '../components/UIUtils';


export default function CourseDetail() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false); // For future API
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
          <div className="price-box">
            <span className="price-value">{course.currency} {course.price}</span>
            <span className="price-duration">/ full course</span>
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
              {course.highlights.map(h => <li key={h}>{h}</li>)}
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
        <h2 id="instructors-heading" className="section-subheading">Instructors</h2>
        <div className="instructors-grid">
          {course.instructors.map(inst => (
            <div key={inst.id} className="instructor-card">
              <div className="instructor-avatar" aria-hidden="true">{inst.name.charAt(0)}</div>
              <div className="instructor-body">
                <h3 className="instructor-name">{inst.name}</h3>
                <p className="instructor-role">{inst.role}</p>
                <p className="instructor-bio">{inst.bio}</p>
                <p className="instructor-exp">Experience: {inst.experienceYears}+ yrs</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
