// Central course data model
// Structured as 16 courses: 
// 11th CBSE (Mat, Phy, Chem, Bio), 12th CBSE (Mat, Phy, Chem, Bio)
// 11th TN (Mat, Phy, Chem, Bio), 12th TN (Mat, Phy, Chem, Bio)

// Instructor Photos (Original)
import sakthivelPhoto from '../assets/faculty/sakthivel.png';
import jahirPhoto from '../assets/faculty/jahir.png';
import naabirajanPhoto from '../assets/faculty/naabirajan.png';
import lakshmiPhoto from '../assets/faculty/lakshmi.png';
import saravanaPhoto from '../assets/faculty/saravana.png';
import gurunathanPhoto from '../assets/faculty/gurunathan.jpg';

// Brochure Photos
import brochureSakthivel from '../assets/brochures/brochure_sakthivel.png';
import brochureJahir from '../assets/brochures/brochure_jahir.png';
import brochureNaabirajan from '../assets/brochures/brochure_naabirajan.png';
import brochureLakshmi from '../assets/brochures/brochure_lakshmi.png';
import brochureSaravana from '../assets/brochures/brochure_saravana.png';
import brochureGurunathan from '../assets/brochures/brochure_gurunathan.png';

const standardHighlights = [
  '✔ 9–10 Classes per Month',
  '✔ Weekly Doubt Sessions',
  '✔ Weekly Concept Quizzes',
  '✔ Monthly Exam-Style Tests',
  '✔ Personal Mentoring Support',
  '✔ Real-Time Progress Tracking',
  '✔ Career Guidance Sessions'
];

const monthlyHighlights = [
  '✔ 9–10 Live Classes per Month',
  '✔ Weekly Doubt Sessions',
  '✔ Weekly Concept Quizzes',
  '✔ Interactive Live Learning',
  '✔ Mentor Support for Academic Guidance'
];

// Subject-Specific Curriculum Data (Full)
const curriculumData = {
  // CBSE Grade 11
  '11-cbse-math': [
    { module: 'Unit 1 – Sets', lessons: ['Concepts of sets and representations', 'Empty set, finite and infinite sets'] },
    { module: 'Unit 2 – Relations & Functions', lessons: ['Ordered pairs and Cartesian product', 'Domain, co-domain and range of functions'] },
    { module: 'Unit 3 – Trigonometric Functions', lessons: ['Positive and negative angles', 'Trigonometric functions and identities'] },
    { module: 'Unit 4 – Complex Numbers and Quadratic Equations', lessons: ['Need for complex numbers', 'Fundamental theorem of algebra'] },
    { module: 'Unit 5 – Linear Inequalities', lessons: ['Algebraic solutions of linear inequalities', 'Graphical representation'] },
    { module: 'Unit 6 – Permutations and Combinations', lessons: ['Fundamental principle of counting', 'Permutations and combinations formulas'] },
    { module: 'Unit 7 – Binomial Theorem', lessons: ['History and statement of the theorem', 'Pascal’s triangle and general term'] },
    { module: 'Unit 8 – Sequences and Series', lessons: ['Arithmetic and geometric progressions', 'Arithmetic and geometric means'] },
    { module: 'Unit 9 – Straight Lines', lessons: ['Slope of a line and angle between lines', 'Various forms of equations of a line'] },
    { module: 'Unit 10 – Conic Sections', lessons: ['Sections of a cone: circle, ellipse, parabola', 'Standard equations and properties'] },
    { module: 'Unit 11 – Introduction to Three Dimensional Geometry', lessons: ['Coordinate axes and planes', 'Distance between two points'] }
  ],
  '11-cbse-phy': [
    { module: 'Unit 1 – Units and Measurements', lessons: ['International system of units', 'Significant figures and error analysis'] },
    { module: 'Unit 2 – Motion in a Straight Line', lessons: ['Frame of reference and position-time graph', 'Speed and velocity concepts'] },
    { module: 'Unit 3 – Motion in a Plane', lessons: ['Scalar and vector quantities', 'Projectile and circular motion'] },
    { module: 'Unit 4 – Laws of Motion', lessons: ['Newton’s laws and applications', 'Friction and circular dynamics'] },
    { module: 'Unit 5 – Work, Energy and Power', lessons: ['Work-energy theorem and power', 'Collisions and potential energy'] },
    { module: 'Unit 6 – System of Particles and Rotational Motion', lessons: ['Center of mass and torque', 'Angular momentum and inertia'] },
    { module: 'Unit 7 – Gravitation', lessons: ['Kepler’s laws and planetary motion', 'Universal law of gravitation'] },
    { module: 'Unit 8 – Mechanical Properties of Solids & Fluids', lessons: ['Stress-strain relationship', 'Viscosity and surface tension'] },
    { module: 'Unit 9 – Thermal Properties of Matter & Thermodynamics', lessons: ['Heat, temperature and expansion', 'Laws of thermodynamics'] },
    { module: 'Unit 10 – Kinetic Theory & Oscillations and Waves', lessons: ['Equation of state of a perfect gas', 'Simple harmonic motion and wave motion'] }
  ],
  '11-cbse-chem': [
    { module: 'Unit 1 – Some Basic Concepts of Chemistry', lessons: ['Fundamental laws of chemical combination', 'Mole concept and stoichiometric calculations', 'Concentration terms and problem solving'] },
    { module: 'Unit 2 – Structure of Atom', lessons: ['Discovery of subatomic particles and atomic models', 'Quantum numbers and electronic configuration', 'Atomic orbitals and energy levels'] },
    { module: 'Unit 3 – Classification of Elements and Periodicity', lessons: ['Modern periodic table and periodic trends', 'Atomic radius, ionization energy and electronegativity', 'Periodic classification of elements'] },
    { module: 'Unit 4 – Chemical Bonding and Molecular Structure', lessons: ['Ionic and covalent bonding principles', 'VSEPR theory and molecular geometry', 'Hybridization and bond parameters'] },
    { module: 'Unit 5 – Chemical Thermodynamics', lessons: ['Laws of thermodynamics', 'Enthalpy and entropy changes'] },
    { module: 'Unit 6 – Equilibrium', lessons: ['Law of mass action', 'Ionic and chemical equilibrium'] },
    { module: 'Unit 7 – Redox Reactions', lessons: ['Oxidation and reduction concepts', 'Balancing redox equations'] },
    { module: 'Unit 8 – Organic Chemistry: Some Basic Principles and Techniques', lessons: ['Nomenclature and electronic displacements', 'Purification and analysis', 'Inductive and resonance effects'] },
    { module: 'Unit 9 – Hydrocarbons', lessons: ['Classification of hydrocarbons', 'Alkanes, Alkenes and Alkynes basics'] }
  ],
  '11-cbse-bio': [
    { module: 'Unit 1 – Diversity in Living World', lessons: ['The living world and biological classification', 'Taxonomic categories and hierarchy'] },
    { module: 'Unit 2 – Plant Kingdom & Animal Kingdom', lessons: ['Salient features and classification', 'Major groups and characteristic features'] },
    { module: 'Unit 3 – Morphology & Anatomy of Flowering Plants', lessons: ['Structural organization of plants', 'Tissue systems and functions'] },
    { module: 'Unit 4 – Structural Organisation in Animals', lessons: ['Animal tissues and organ systems', 'Morphology and anatomy of frog/cockroach'] },
    { module: 'Unit 5 – Cell: The Unit of Life', lessons: ['Cell theory and organization', 'Organelles and their functions'] },
    { module: 'Unit 6 – Biomolecules & Cell Cycle', lessons: ['Structure and function of biomolecules', 'Mitosis and Meiosis processes'] },
    { module: 'Unit 7 – Photosynthesis & Respiration in Plants', lessons: ['Light and dark reactions', 'Glycolysis and Krebs cycle'] },
    { module: 'Unit 8 – Plant Growth and Development', lessons: ['Growth regulators and hormones', 'Photoperiodism and vernalization'] },
    { module: 'Unit 9 – Breathing and Exchange of Gases & Body Fluids', lessons: ['Mechanism of breathing', 'Composition of blood and circulation'] },
    { module: 'Unit 10 – Excretory Products & Locomotion', lessons: ['Urine formation and osmoregulation', 'Skeletal and muscular systems'] }
  ],

  // CBSE Grade 12
  '12-cbse-math': [
    { module: 'Unit 1 – Relations and Functions', lessons: ['Types of relations and functions', 'Binary operations'] },
    { module: 'Unit 2 – Inverse Trigonometric Functions', lessons: ['Definition, range, domain, principal value', 'Graphs of inverse functions'] },
    { module: 'Unit 3 – Matrices', lessons: ['Concept, notation, order, equality', 'Operations and inverse of a matrix'] },
    { module: 'Unit 4 – Determinants', lessons: ['Determinant of a square matrix', 'Adjoint and inverse of a matrix'] },
    { module: 'Unit 5 – Continuity and Differentiability', lessons: ['Continuity and differentiability concepts', 'Derivative of composite functions'] },
    { module: 'Unit 6 – Application of Derivatives', lessons: ['Rate of change, tangents and normals', 'Maxima and minima problems'] },
    { module: 'Unit 7 – Integrals', lessons: ['Integration as inverse of differentiation', 'Definite and indefinite integrals'] },
    { module: 'Unit 8 – Application of Integrals', lessons: ['Area under simple curves', 'Area between two curves'] },
    { module: 'Unit 9 – Differential Equations', lessons: ['Order and degree of equations', 'Solutions of differential equations'] },
    { module: 'Unit 10 – Vector Algebra', lessons: ['Vectors and scalars, magnitude and direction', 'Dot and cross products'] },
    { module: 'Unit 11 – Three Dimensional Geometry', lessons: ['Direction cosines and direction ratios', 'Equations of lines and planes'] },
    { module: 'Unit 12 – Linear Programming', lessons: ['Introduction and related terminology', 'Mathematical formulation of LPP'] },
    { module: 'Unit 13 – Probability', lessons: ['Conditional probability and Bayes’ Theorem', 'Random variables and probability distributions'] }
  ],
  '12-cbse-phy': [
    { module: 'Unit 1 – Electric Charges and Fields', lessons: ['Coulomb’s law and electric fields', 'Electric flux and Gauss’s law'] },
    { module: 'Unit 2 – Electrostatic Potential and Capacitance', lessons: ['Potential and potential energy', 'Capacitors and dielectrics'] },
    { module: 'Unit 3 – Current Electricity', lessons: ['Ohm’s law and electrical resistance', 'Kirchhoff’s laws and circuits'] },
    { module: 'Unit 4 – Moving Charges and Magnetism', lessons: ['Magnetic field and Lorentz force', 'Biot-Savart law and Ampere’s law'] },
    { module: 'Unit 5 – Magnetism and Matter', lessons: ['Earth’s magnetism and field lines', 'Magnetic properties of materials'] },
    { module: 'Unit 6 – Electromagnetic Induction', lessons: ['Faraday’s laws and Lenz’s law', 'Self and mutual induction'] },
    { module: 'Unit 7 – Alternating Current', lessons: ['LCR series circuit and resonance', 'Transformers and AC generators'] },
    { module: 'Unit 8 – Electromagnetic Waves', lessons: ['Displacement current and waves', 'Electromagnetic spectrum properties'] },
    { module: 'Unit 9 – Ray Optics and Optical Instruments', lessons: ['Reflection and refraction of light', 'Mirrors, lenses and telescopes'] },
    { module: 'Unit 10 – Wave Optics', lessons: ['Huygens principle and diffraction', 'Interference and polarization'] }
  ],
  '12-cbse-chem': [
    { module: 'Unit 1 – Solutions', lessons: ['Types of solutions and solubility', 'Colligative properties and Raoult’s law'] },
    { module: 'Unit 2 – Electrochemistry', lessons: ['Electrochemical and electrolytic cells', 'Nernst equation and conductance'] },
    { module: 'Unit 3 – Chemical Kinetics', lessons: ['Rate of reaction and order', 'Arrhenius equation and activation energy'] },
    { module: 'Unit 4 – d-and f-Block Elements', lessons: ['Transition elements and inner transition elements', 'Lanthanoids and actinoids properties'] },
    { module: 'Unit 5 – Coordination Compounds', lessons: ['Ligands and coordination number', 'Werner’s theory and VBT/CFT'] },
    { module: 'Unit 6 – Haloalkanes and Haloarenes', lessons: ['Nature of C-X bond and nomenclature', 'Mechanisms of substitution reactions'] },
    { module: 'Unit 7 – Alcohols, Phenols and Ethers', lessons: ['Classification and acidity', 'Preparation and reactions'] },
    { module: 'Unit 8 – Aldehydes, Ketones and Carboxylic Acids', lessons: ['Nucleophilic addition reactions', 'Preparation and acidity of acids'] },
    { module: 'Unit 9 – Amines & Biomolecules', lessons: ['Structure and basicity of amines', 'Carbohydrates, proteins and vitamins'] }
  ],
  '12-cbse-bio': [
    { module: 'Unit 1 – Sexual Reproduction in Flowering Plants', lessons: ['Stamen, microsporangium and pollen grain', 'Double fertilization and seed development'] },
    { module: 'Unit 2 – Human Reproduction', lessons: ['Male and female reproductive systems', 'Gametogenesis and pregnancy'] },
    { module: 'Unit 3 – Reproductive Health', lessons: ['Birth control and medical termination', 'STD and infertility issues'] },
    { module: 'Unit 4 – Principles of Inheritance and Variation', lessons: ['Mendelian inheritance and polygenic inheritance', 'Chromosomal theory and sex determination'] },
    { module: 'Unit 5 – Molecular Basis of Inheritance', lessons: ['DNA and RNA structure', 'Replication, transcription and translation'] },
    { module: 'Unit 6 – Evolution', lessons: ['Origin of life and biological evolution', 'Evidences and mechanism of evolution'] },
    { module: 'Unit 7 – Human Health and Disease', lessons: ['Pathogens causing diseases', 'Immunity, cancer and AIDS'] },
    { module: 'Unit 8 – Microbes in Human Welfare', lessons: ['Microbes in household and industrial products', 'Sewage treatment and biogas production'] },
    { module: 'Unit 9 – Biotechnology: Principles and Processes', lessons: ['Genetic engineering and cloning', 'Tools of recombinant DNA technology'] },
    { module: 'Unit 10 – Biotechnology and its Applications', lessons: ['Application in health and agriculture', 'Transgenic animals and ethical issues'] },
    { module: 'Unit 11 – Organisms and Populations', lessons: ['Organisms and environment', 'Population attributes and interactions'] },
    { module: 'Unit 12 – Ecosystem', lessons: ['Structure and function of ecosystem', 'Energy flow and ecological successions'] },
    { module: 'Unit 13 – Biodiversity and Conservation', lessons: ['Patterns and importance of biodiversity', 'Loss and conservation of biodiversity'] }
  ],

  // TN Board Grade 11
  '11-tn-math': [
    { module: 'Unit 1 – Sets, Relations and Functions', lessons: ['Basics of sets and mapping', 'Algebraic functions and types'] },
    { module: 'Unit 2 – Basic Algebra', lessons: ['Logarithms and indices', 'Partial fractions and inequalities'] },
    { module: 'Unit 3 – Trigonometry', lessons: ['Compound angles and transformations', 'Multiple and sub-multiple angles'] },
    { module: 'Unit 4 – Combinatorics and Mathematical Induction', lessons: ['Fundamental principle of counting', 'Mathematical induction principles'] },
    { module: 'Unit 5 – Binomial Theorem, Sequences and Series', lessons: ['Binomial expansion basics', 'Special series and progressions'] },
    { module: 'Unit 6 – Two Dimensional Analytical Geometry', lessons: ['Locus and straight lines', 'Pair of straight lines'] },
    { module: 'Unit 7 – Matrices and Determinants', lessons: ['Operations and properties of matrices', 'Evaluation of determinants'] },
    { module: 'Unit 8 – Vector Algebra', lessons: ['Types of vectors and scalars', 'Section formula and application'] },
    { module: 'Unit 9 – Differential Calculus - Limits and Continuity', lessons: ['Algebra of limits', 'Concepts of continuity'] },
    { module: 'Unit 10 – Differential Calculus - Differentiability and Methods of Differentiation', lessons: ['Differentiability and basic rules', 'Chain rule and parametric differentiation'] },
    { module: 'Unit 11 – Integral Calculus', lessons: ['Indefinite integrals', 'Methods of integration'] },
    { module: 'Unit 12 – Introduction to Probability Theory', lessons: ['Axiomatic approach to probability', 'Conditional probability basics'] }
  ],
  '11-tn-phy': [
    { module: 'Unit 1 – Nature of Physical World and Measurement', lessons: ['Scientific method and measurements', 'Errors in measurement'] },
    { module: 'Unit 2 – Kinematics', lessons: ['Scalars and vectors', 'Uniform circular motion'] },
    { module: 'Unit 3 – Laws of Motion', lessons: ['Newton’s laws and inertia', 'Conservation of momentum'] },
    { module: 'Unit 4 – Work, Energy and Power', lessons: ['Potential and kinetic energy', 'Perfectly elastic collisions'] },
    { module: 'Unit 5 – Motion of System of Particles and Rigid Body', lessons: ['Center of mass of bodies', 'Rotational flow and torque'] },
    { module: 'Unit 6 – Gravitation', lessons: ['Kepler’s laws and gravitation', 'Universal law of gravitation'] },
    { module: 'Unit 7 – Properties of Matter', lessons: ['Elastic property of matter', 'Fluid dynamics and viscosity'] },
    { module: 'Unit 8 – Heat and Thermodynamics', lessons: ['Thermal properties and expansion', 'Zeroth and first laws'] },
    { module: 'Unit 9 – Kinetic Theory of Gases', lessons: ['Molecules and gas laws', 'Degrees of freedom'] },
    { module: 'Unit 10 – Oscillations', lessons: ['Periodic and oscillatory motion', 'Simple harmonic motion'] },
    { module: 'Unit 11 – Waves', lessons: ['Transverse and longitudinal waves', 'Sound waves and doppler effect'] }
  ],
  '11-tn-chem': [
    { module: 'Unit 1 – Basic Concepts of Chemistry and Chemical Calculations', lessons: ['Mole concept and oxidation-reduction', 'Equivalent mass calculations'] },
    { module: 'Unit 2 – Quantum Mechanical Model of Atom', lessons: ['Bohr’s model and dual nature', 'Heisenberg’s uncertainty principle'] },
    { module: 'Unit 3 – Periodic Classification of Elements', lessons: ['Periodic trends in properties', 'Effective nuclear charge'] },
    { module: 'Unit 4 – Hydrogen', lessons: ['Isotopes of hydrogen', 'Preparation and properties'] },
    { module: 'Unit 5 – Alkali and Alkaline Earth Metals', lessons: ['Group 1 and 2 properties', 'Compounds of alkali metals'] },
    { module: 'Unit 6 – Gaseous State', lessons: ['Gas laws and ideal gas equation', 'Dalton’s law and Graham’s law'] },
    { module: 'Unit 7 – Thermodynamics', lessons: ['System and surrounding', 'First and second laws'] },
    { module: 'Unit 8 – Physical and Chemical Equilibrium', lessons: ['Law of mass action', 'Le-Chatelier’s principle'] },
    { module: 'Unit 9 – Solutions', lessons: ['Types and concentration terms', 'Colligative properties'] },
    { module: 'Unit 10 – Chemical Bonding', lessons: ['Ionic and covalent bonding', 'Hybridization and resonance'] },
    { module: 'Unit 11 – Fundamentals of Organic Chemistry', lessons: ['Classification and nomenclature', 'Purification of compounds'] },
    { module: 'Unit 12 – Basic Concepts of Organic Reactions', lessons: ['Electronic displacements', 'Types of organic reactions'] },
    { module: 'Unit 13 – Hydrocarbons', lessons: ['Preparation and properties of alkanes', 'Alkenes and organic chemistry'] },
    { module: 'Unit 14 – Haloalkanes and Haloarenes', lessons: ['Classification and nature of C-X bond', 'Mechanisms of reactions'] },
    { module: 'Unit 15 – Environmental Chemistry', lessons: ['Environmental pollution and control'] }
  ],
  '11-tn-bio': [
    { module: 'Unit 1 – The Living World', lessons: ['Classification of living organisms', 'Viruses and bacteria basics'] },
    { module: 'Unit 2 – Plant Kingdom', lessons: ['Classification of plants', 'Life cycles in plants'] },
    { module: 'Unit 3 – Vegetative Morphology', lessons: ['Root and stem modifications', 'Leaf structure and types'] },
    { module: 'Unit 4 – Reproductive Morphology', lessons: ['Inflorescence and flower types', 'Fruits and seeds study'] },
    { module: 'Unit 5 – Taxonomy and Systematic Botany', lessons: ['Study of plant families', 'Binomial nomenclature'] },
    { module: 'Unit 6 – Cell: The Unit of Life', lessons: ['Cell wall and membrane', 'Nucleus and organelles'] },
    { module: 'Unit 7 – Cell Cycle', lessons: ['Phases of cell cycle', 'Mitosis and Meiosis'] },
    { module: 'Unit 8 – Biomolecules', lessons: ['Enzymes and proteins', 'Nucleic acids and lipids'] },
    { module: 'Unit 9 – Tissue Level of Organisation', lessons: ['Animal tissues classification', 'Glandular epithelium'] },
    { module: 'Unit 10 – Organ and Organ System in Animals', lessons: ['Anatomy of earthworm and cockroach', 'Frog internal anatomy'] },
    { module: 'Unit 11 – Digestion and Absorption', lessons: ['Digestive system structure', 'Mechanism of digestion'] },
    { module: 'Unit 12 – Breathing and Exchange of Gases', lessons: ['Respiratory organs and volumes', 'Exchange in tissues'] },
    { module: 'Unit 13 – Body Fluids and Circulation', lessons: ['Composition of blood', 'Circulatory pathways/Cardiac cycle'] },
    { module: 'Unit 14 – Excretory Products and Their Elimination', lessons: ['Urine formation mechanism', 'Dialysis and kidney issues'] },
    { module: 'Unit 15 – Locomotion and Movement', lessons: ['Muscular and skeletal systems', 'Joints and disorders'] }
  ],

  // TN Board Grade 12
  '12-tn-math': [
    { module: 'Unit 1 – Applications of Matrices and Determinants', lessons: ['Rank of a matrix and consistency', 'Inverse of a matrix concepts'] },
    { module: 'Unit 2 – Complex Numbers', lessons: ['Polar and Euler forms', 'De Moivre’s Theorem and roots'] },
    { module: 'Unit 3 – Theory of Equations', lessons: ['Roots and coefficients relations', 'Polynomial equations'] },
    { module: 'Unit 4 – Inverse Trigonometric Functions', lessons: ['Principal value branches', 'Properties of inverse functions'] },
    { module: 'Unit 5 – Two Dimensional Analytical Geometry-II', lessons: ['Circle and parabola properties', 'Ellipse and hyperbola'] },
    { module: 'Unit 6 – Applications of Vector Algebra', lessons: ['Vector and scalar triple products', 'Lines and planes applications'] },
    { module: 'Unit 7 – Applications of Differential Calculus', lessons: ['Mean value theorem and tangents', 'Indeterminate forms/Maxima/Minima'] },
    { module: 'Unit 8 – Differentials and Partial Derivatives', lessons: ['Linear approximation and differentials', 'Partial derivatives concepts'] },
    { module: 'Unit 9 – Applications of Integration', lessons: ['Area under curves and between curves', 'Volume of solids of revolution'] },
    { module: 'Unit 10 – Ordinary Differential Equations', lessons: ['Formation of equations', 'Methods of solving equations'] },
    { module: 'Unit 11 – Probability Distributions', lessons: ['Discrete and continuous variables', 'Normal and binomial distribution'] },
    { module: 'Unit 12 – Discrete Mathematics', lessons: ['Binary operations and logic', 'Truth tables and switches'] }
  ],
  '12-tn-phy': [
    { module: 'Unit 1 – Electrostatics', lessons: ['Electric potential and energy', 'Coulomb’s law and Gauss’s law'] },
    { module: 'Unit 2 – Current Electricity', lessons: ['Drift velocity and mobility', 'Kirchhoff’s laws and Wheatstone bridge'] },
    { module: 'Unit 3 – Magnetism and Magnetic Effects of Electric Current', lessons: ['Magnetic dipole and torque', 'Earth’s magnetism and materials'] },
    { module: 'Unit 4 – Electromagnetic Induction and Alternating Current', lessons: ['Faraday’s laws and AC generators', 'Self and mutual induction'] },
    { module: 'Unit 5 – Electromagnetic Waves', lessons: ['Displacement current properties', 'Electromagnetic spectrum'] },
    { module: 'Unit 6 – Optics', lessons: ['Ray optics and optical instruments', 'Wave optics and diffraction'] },
    { module: 'Unit 7 – Dual Nature of Radiation and Matter', lessons: ['Photoelectric effect and matter waves', 'Davisson-Germer experiment'] },
    { module: 'Unit 8 – Atomic and Nuclear Physics', lessons: ['Bohr’s atomic model', 'Nucleus and radioactivity'] },
    { module: 'Unit 9 – Semiconductor Electronics', lessons: ['P-N junction diode and transistors', 'Logic gates and applications'] },
    { module: 'Unit 10 – Communication Systems', lessons: ['Modulation and demodulation', 'Satellite and fiber communication'] },
    { module: 'Unit 11 – Recent Developments in Physics', lessons: ['Nanoscience and robotic basics'] }
  ],
  '12-tn-chem': [
    { module: 'Unit 1 – Metallurgy', lessons: ['Concentration of ores', 'Extraction and refining of metals'] },
    { module: 'Unit 2 – p-Block Elements-I', lessons: ['Group 13 and 14 trends', 'Anomalous behavior of elements'] },
    { module: 'Unit 3 – p-Block Elements-II', lessons: ['Group 15-18 properties', 'Important compounds preparation'] },
    { module: 'Unit 4 – d and f-Block Elements', lessons: ['Transition elements and inner transition elements', 'Molar conductivity and oxidation states'] },
    { module: 'Unit 5 – Coordination Chemistry', lessons: ['Ligands, coordination number', 'VBT and CFT theories'] },
    { module: 'Unit 6 – Solid State', lessons: ['Classification of solids', 'Unit cells and packing efficiency'] },
    { module: 'Unit 7 – Chemical Kinetics', lessons: ['Rate law and order of reaction', 'Arrhenius equation and activation energy'] },
    { module: 'Unit 8 – Ionic Equilibrium', lessons: ['Acids and bases theories', 'pH and buffer solutions'] },
    { module: 'Unit 9 – Electrochemistry', lessons: ['Specific and molar conductance', 'Fuel cells and corrosion'] },
    { module: 'Unit 10 – Surface Chemistry', lessons: ['Adsorption and catalysis', 'Colloids and emulsions'] },
    { module: 'Unit 11 – Hydroxy Compounds and Ethers', lessons: ['Preparation and properties of alcohols', 'Phenols and ethers reactions'] },
    { module: 'Unit 12 – Carbonyl Compounds and Carboxylic Acids', lessons: ['Nucleophilic addition reactions', 'Aldol and Cannizzaro reactions'] },
    { module: 'Unit 13 – Organic Nitrogen Compounds', lessons: ['Nitro-compounds and amines', 'Cyanides and isocyanides'] },
    { module: 'Unit 14 – Biomolecules', lessons: ['Carbohydrates, proteins, vitamins', 'Nucleic acids and enzymes'] },
    { module: 'Unit 15 – Chemistry in Everyday Life', lessons: ['Medicine and food chemistry'] }
  ],
  '12-tn-bio': [
    { module: 'Unit 1 – Reproduction in Organisms', lessons: ['Asexual and sexual reproduction modes', 'Gametogenesis and fertilization'] },
    { module: 'Unit 2 – Sexual Reproduction in Flowering Plants', lessons: ['Stamen and pollen grain structure', 'Double fertilization and seed development'] },
    { module: 'Unit 3 – Principles of Inheritance and Variation', lessons: ['Mendel’s laws and sex determination', 'Inheritance and variations study'] },
    { module: 'Unit 4 – Molecular Genetics', lessons: ['Structure of DNA and RNA', 'Replication, transcription and translation'] },
    { module: 'Unit 5 – Evolution', lessons: ['Origin of life and biological theories', 'Evidence and mechanism of evolution'] },
    { module: 'Unit 6 – Human Health and Diseases', lessons: ['Pathogens causing diseases', 'Immunity, cancer and HIV/AIDS'] },
    { module: 'Unit 7 – Microbes in Human Welfare', lessons: ['Microbes in food and industry', 'Biogas and sewage treatment'] },
    { module: 'Unit 8 – Principles and Processes of Biotechnology', lessons: ['Genetic engineering tools', 'Techniques in biotechnology'] },
    { module: 'Unit 9 – Applications of Biotechnology', lessons: ['Biotech in agriculture and medicine', 'Ethical and moral issues'] },
    { module: 'Unit 10 – Organisms and Populations', lessons: ['Adaptations and environment interactions', 'Population growth and attributes'] },
    { module: 'Unit 11 – Ecosystem', lessons: ['Components and food chains/webs', 'Energy flow and material cycles'] },
    { module: 'Unit 12 – Environmental Issues', lessons: ['Air and water pollution control', 'Global warming and ozone layer'] },
    { module: 'Unit 13 – Strategies for Enhancement in Food Production', lessons: ['Animal husbandry and plant breeding', 'Tissue culture and biofortification'] },
    { module: 'Unit 14 – Human Reproduction', lessons: ['Male and female systems', 'Pregnancy and embryonic development'] },
    { module: 'Unit 15 – Reproductive Health', lessons: ['Birth control and safe practices', 'Population explosion and control'] }
  ]
};


const instructors = {
  cbsePhy: { 
    id: 'i1', 
    name: 'SARAVANA KUMAR K', 
    role: 'Physics Expert (CBSE)', 
    photo: saravanaPhoto,
    qualification: 'M.Sc. M.Ed., M.Phil.,PGDCA.',
    boardInfo: 'CBSE',
    subjectInfo: 'Physics',
    bio: 'Senior Physics Faculty with deep expertise in CBSE curriculum and competitive coaching.', 
    experienceYears: 30,
    videoUrl: 'https://www.youtube.com/embed/5GPTap4ldyg?si=9rbUBxrlAqbb3dsV',
    brochure: brochureSaravana
  },
  cbseChem: { 
    id: 'i2', 
    name: 'JAHIR HUSSAIN A', 
    role: 'Chemistry Expert (CBSE)', 
    photo: jahirPhoto,
    qualification: 'M.Sc.,M.Ed.',
    boardInfo: 'CBSE',
    subjectInfo: 'Chemistry',
    bio: 'Specialist in Chemistry teaching for secondary and senior secondary boards with a result-oriented approach.', 
    experienceYears: 19,
    videoUrl: 'https://www.youtube.com/embed/Q18sE426qno?si=oIxokI_EW5R0d9Hk',
    brochure: brochureJahir
  },
  cbseBio: { 
    id: 'i3', 
    name: 'NAABIRAJAN V E', 
    role: 'Biology Expert (CBSE)', 
    photo: naabirajanPhoto,
    qualification: 'M.Sc.,B.Ed.',
    boardInfo: 'CBSE',
    subjectInfo: 'Biology',
    bio: 'Veteran Biology educator dedicated to medical entrance and board excellence for over three decades.', 
    experienceYears: 33,
    videoUrl: 'https://www.youtube.com/embed/5sCIAr6TmlY?si=FvseYQpaw3ZF23if',
    brochure: brochureNaabirajan
  },
  tnPhy: { 
    id: 'i4', 
    name: 'SAKTHIVEL M', 
    role: 'Physics Expert (TN Board)', 
    photo: sakthivelPhoto,
    qualification: 'M.Sc.,Mphil.,M.Ed.',
    boardInfo: 'TN Board',
    subjectInfo: 'Physics',
    bio: 'Physics specialist with extensive experience in the TN State Board curriculum and exam patterns.', 
    experienceYears: 16,
    videoUrl: 'https://www.youtube.com/embed/HQFmdI6gE2o?si=cniWUcIxmecR2yh5',
    brochure: brochureSakthivel
  },
  tnBio: { 
    id: 'i5', 
    name: 'LAKSHMI S', 
    role: 'Biology Expert (TN Board)', 
    photo: lakshmiPhoto,
    qualification: 'M.Sc.,B.Ed.',
    boardInfo: 'TN Board',
    subjectInfo: 'Biology',
    bio: 'Senior Biology mentor with over three decades of teaching mastery and student success stories.', 
    experienceYears: 33,
    videoUrl: 'https://www.youtube.com/embed/Iiu6UpgPUSc?si=TAfCqRh5HWoNz5DB',
    brochure: brochureLakshmi
  },
  mathLead: { 
    id: 'i6', 
    name: 'Prof. Anita Rao', 
    role: 'Mathematics Lead', 
    photo: null, // Placeholder for Math
    qualification: 'M.Sc., Ph.D.',
    boardInfo: 'CBSE / TN Board',
    subjectInfo: 'Mathematics',
    bio: 'Renowned mathematician specializing in calculus and complex analysis for senior grades.', 
    experienceYears: 20,
    videoUrl: '',
    brochure: null
  },
  tnChemLead: { 
    id: 'i7', 
    name: 'Dr. V. Rajesh', 
    role: 'Chemistry Specialist (TN Board)', 
    photo: null, // Placeholder
    qualification: 'M.Sc., Ph.D.',
    boardInfo: 'TN Board',
    subjectInfo: 'Chemistry',
    bio: 'Expert in state board chemistry curriculum and competitive exam preparation strategies.', 
    experienceYears: 11,
    videoUrl: '',
    brochure: null
  },
  tnMath: {
    id: 'i8',
    name: 'GURUNATHAN D',
    role: 'Mathematics Expert (TN Board)',
    photo: gurunathanPhoto,
    qualification: 'M.Sc., B.Ed., PGDCA',
    boardInfo: 'TN Board',
    subjectInfo: 'Maths',
    bio: 'Experienced Mathematics educator specializing in TN Board curriculum with a strong concept-oriented teaching approach.',
    experienceYears: 7,
    videoUrl: '', // placeholder if none provided
    brochure: brochureGurunathan
  }
};

const demoVideoUrl = 'https://www.youtube.com/embed/TBmFf9Ouwe0';

const createCourse = (id, name, level, subject, board) => {
  const isCBSE = board === 'CBSE';
  
  // Assign Specific Instructor
  let instructor = instructors.mathLead; // Default
  if (subject === 'Mathematics' && board === 'TN Board') {
    instructor = instructors.tnMath;
  } else if (subject === 'Physics') {
    instructor = isCBSE ? instructors.cbsePhy : instructors.tnPhy;
  } else if (subject === 'Chemistry') {
    instructor = isCBSE ? instructors.cbseChem : instructors.tnChemLead;
  } else if (subject === 'Biology') {
    instructor = isCBSE ? instructors.cbseBio : instructors.tnBio;
  }

  return {
    id,
    name,
    tagline: `Master ${subject} for ${level} (${board})`,
    description: `Comprehensive ${subject} course for ${level} ${board} students. Focus on conceptual clarity and exam success.`,
    level: level,
    durationWeeks: 40,
    yearlyPrice: isCBSE ? 13000 : 12000,
    monthlyPrice: isCBSE ? 1400 : 1300,
    currency: 'INR',
    demoVideo: demoVideoUrl,
    highlights: standardHighlights,
    monthlyHighlights: monthlyHighlights,
    curriculum: curriculumData[id] || [],
    instructors: [instructor],
    board: board,
    subject: subject
  };
};

export const courses = [
  // 11th CBSE
  createCourse('11-cbse-math', '11th CBSE Math', 'Grade 11', 'Mathematics', 'CBSE'),
  createCourse('11-cbse-phy', '11th CBSE Physics', 'Grade 11', 'Physics', 'CBSE'),
  createCourse('11-cbse-chem', '11th CBSE Chemistry', 'Grade 11', 'Chemistry', 'CBSE'),
  createCourse('11-cbse-bio', '11th CBSE Biology', 'Grade 11', 'Biology', 'CBSE'),

  // 12th CBSE
  createCourse('12-cbse-math', '12th CBSE Math', 'Grade 12', 'Mathematics', 'CBSE'),
  createCourse('12-cbse-phy', '12th CBSE Physics', 'Grade 12', 'Physics', 'CBSE'),
  createCourse('12-cbse-chem', '12th CBSE Chemistry', 'Grade 12', 'Chemistry', 'CBSE'),
  createCourse('12-cbse-bio', '12th CBSE Biology', 'Grade 12', 'Biology', 'CBSE'),

  // 11th TN Board
  createCourse('11-tn-math', '11th TN Board Math', 'Grade 11', 'Mathematics', 'TN Board'),
  createCourse('11-tn-phy', '11th TN Board Physics', 'Grade 11', 'Physics', 'TN Board'),
  createCourse('11-tn-chem', '11th TN Board Chemistry', 'Grade 11', 'Chemistry', 'TN Board'),
  createCourse('11-tn-bio', '11th TN Board Biology', 'Grade 11', 'Biology', 'TN Board'),

  // 12th TN Board
  createCourse('12-tn-math', '12th TN Board Math', 'Grade 12', 'Mathematics', 'TN Board'),
  createCourse('12-tn-phy', '12th TN Board Physics', 'Grade 12', 'Physics', 'TN Board'),
  createCourse('12-tn-chem', '12th TN Board Chemistry', 'Grade 12', 'Chemistry', 'TN Board'),
  createCourse('12-tn-bio', '12th TN Board Biology', 'Grade 12', 'Biology', 'TN Board'),
];

export function getCourseById(id) {
  return courses.find(c => c.id === id);
}
