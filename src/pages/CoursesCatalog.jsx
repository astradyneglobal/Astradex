
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { SkeletonLoader, EmptyState } from '../components/UIUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursesCatalog() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [boardFilter, setBoardFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('Yearly');
  const [loading] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
      const matchesBoard = boardFilter === 'All' || course.board === boardFilter;
      const matchesSearch =
        !search ||
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.subject.toLowerCase().includes(search.toLowerCase()) ||
        course.tagline.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesBoard && matchesSearch;
    });
  }, [search, levelFilter, boardFilter]);

  const levels = [
    { id: 'All', label: 'All' },
    { id: 'Grade 11', label: 'Class 11' },
    { id: 'Grade 12', label: 'Class 12' }
  ];

  const boards = [
    { id: 'All', label: 'All' },
    { id: 'CBSE', label: 'CBSE' },
    { id: 'TN Board', label: 'TN Board' }
  ];

  const handleLevelChange = (lvlId) => {
    setLevelFilter(lvlId);
    setBoardFilter('All'); // Reset board filter to 'All' whenever level changes
  };

  return (
    <main className="catalog-wrapper" aria-labelledby="catalog-heading">
      <header className="catalog-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="catalog-header-main"
        >
          <h1 id="catalog-heading" className="heading-medium">
            Explore Academic Excellence
          </h1>
          <p className="paragraph-main">
            Discover specialized courses tailored for your board exam success.
          </p>

          <div className="catalog-filters-container">
            <div className="filter-row-combined" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {/* Level Tabs - Left Aligned */}
              <div className="tab-group mini-tabs" role="tablist" style={{ margin: 0 }}>
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    role="tab"
                    aria-selected={levelFilter === lvl.id}
                    className={`tab-item ${levelFilter === lvl.id ? 'is-active' : ''}`}
                    onClick={() => handleLevelChange(lvl.id)}
                  >
                    <span style={{ position: 'relative', zIndex: 3 }}>{lvl.label}</span>
                    {levelFilter === lvl.id && (
                      <motion.div
                        layoutId="level-indicator"
                        className="tab-indicator"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Plan Toggle (Yearly/Monthly) - Center Aligned */}
              <div className="tab-group plan-tabs" role="tablist" style={{ margin: '0 auto' }}>
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

              {/* Spacer to help center the plan toggle if needed */}
              <div className="flex-spacer" style={{ flex: 1, visibility: 'hidden', maxWidth: '200px' }} />
            </div>

            {/* Board Tabs - Stacked below */}
            <AnimatePresence>
              {(levelFilter === 'Grade 11' || levelFilter === 'Grade 12') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="filter-row center-row"
                >
                  <div className="tab-group mini-tabs" role="tablist">
                    {boards.map((brd) => (
                      <button
                        key={brd.id}
                        role="tab"
                        aria-selected={boardFilter === brd.id}
                        className={`tab-item ${boardFilter === brd.id ? 'is-active' : ''}`}
                        onClick={() => setBoardFilter(brd.id)}
                      >
                        <span style={{ position: 'relative', zIndex: 3 }}>{brd.label}</span>
                        {boardFilter === brd.id && (
                          <motion.div
                            layoutId="board-indicator"
                            className="tab-indicator"
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="catalog-search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '2rem', maxWidth: '400px' }}
        >
          <input
            type="search"
            placeholder="Search your subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="auth-input mini-input"
            style={{ textAlign: 'left' }}
            aria-label="Search courses"
          />
        </motion.div>
      </header >

      <motion.div
        layout
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="catalog-grid grid-4"
      >
        <AnimatePresence mode="popLayout">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonLoader key={i} height={180} />)
            : filteredCourses.length === 0
              ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ gridColumn: '1 / -1' }}
                >
                  <EmptyState message={`No courses found for ${levelFilter === 'All' ? 'selected level' : levelFilter} ${levelFilter === 'All' ? '' : boardFilter}.`} />
                </motion.div>
              )
              : filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 100, damping: 15 }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                >
                  <Link to={`/courses/${course.id}`} className="catalog-card compact-card">
                    <span className="course-badge mini-badge">{course.subject}</span>
                    <div className="catalog-card-body">
                      <h3>{course.name}</h3>
                      <p className="compact-desc">{course.tagline}</p>
                    </div>
                    <div className="price-line compact-price">
                      <span className="price-value">
                        {course.currency} {(planFilter === 'Monthly' ? course.monthlyPrice : course.yearlyPrice).toLocaleString()}
                        {planFilter === 'Monthly' && <small className="price-period">/monthly</small>}
                      </span>
                      <span className="view-details">Details</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>
    </main >
  );
}
