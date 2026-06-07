"use client";

import { useState } from "react";
import CosmicCanvas from "../components/CosmicCanvas";

export default function Home() {
    const [imgError, setImgError] = useState(false);

    return (
        <>
            {/* Header Section */}
            <header>
                <nav>
                    <div className="logo">
                        <h2 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>VISHNU</h2>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#extra">Experience</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Fixed 3D Canvas Background */}
            <CosmicCanvas />

            {/* Side navigation menu */}
            <div id="side-menu" className="side-menu">
                <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="vertical-text">PORTFOLIO</div>
            </div>

            {/* Scroll progress indicator */}
            <div id="scroll-progress" className="scroll-progress">
                <div className="scroll-text">SPACE</div>
                <div className="progress-track">
                    <div id="progress-fill" className="progress-fill" style={{ width: "0%" }}></div>
                </div>
                <div id="section-counter" className="section-counter">00 / 02</div>
            </div>

            {/* Main Scroll Content Wrapper */}
            <div className="scroll-sections">

                {/* 1. PORTFOLIO (Hero Section) */}
                <section id="hero" className="hero-container">
                    <div className="hero-content">
                        <div className="profile-container">
                            <div className="profile-pic">
                                {!imgError ? (
                                    <img 
                                        src="/profile.jpg" 
                                        alt="Munipalle Vishnu Vardhan" 
                                        onError={() => setImgError(true)} 
                                    />
                                ) : (
                                    <div className="profile-fallback">
                                        <i className="fas fa-user"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <h1 className="hero-title">
                            MY PORTFOLIO
                        </h1>
                        
                        <div className="hero-subtitle">
                            <p>I am <span className="subtitle-highlight">Munipalle Vishnu Vardhan</span></p>
                            <p>AI & Data Science Student | Full-Stack Developer</p>
                        </div>

                        <div className="hero-contact-row">
                            <span><i className="fas fa-phone"></i> +91 7259771410</span>
                            <span><i className="fas fa-envelope"></i> <a href="mailto:vishnuvardhanmunipalle@gmail.com">vishnuvardhanmunipalle@gmail.com</a></span>
                            <span><i className="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/vishnu-vardhan-3587a9386/" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
                            <span><i className="fab fa-github"></i> <a href="https://github.com/therealvishnuvardhan" target="_blank" rel="noopener noreferrer">GitHub</a></span>
                        </div>

                        <div className="hero-btns">
                            <a href="#about" className="btn primary">Explore Portfolio</a>
                            <a href="#contact" className="btn secondary">Get In Touch</a>
                        </div>
                    </div>
                </section>

                {/* 2. COSMOS (About, Education, Skills) */}
                <section id="about" className="content-section">
                    <div className="container">
                        <h2 className="section-title">ABOUT ME</h2>
                        
                        <div className="about-grid">
                            <div className="about-text glass-panel">
                                <p>
                                    I am a passionate Artificial Intelligence and Data Science student at NMAMIT. My interests lie at the intersection of AI, machine learning, and full-stack software development. I enjoy engineering intelligent systems and architecting robust solutions that solve real-world problems.
                                </p>
                                
                                <div className="details-grid">
                                    <div className="detail-card">
                                        <div className="detail-label">Current Role</div>
                                        <div className="detail-value">B.Tech Student in AI & DS</div>
                                    </div>
                                    <div className="detail-card">
                                        <div className="detail-label">Institution</div>
                                        <div className="detail-value">NMAM Institute of Technology</div>
                                    </div>
                                    <div className="detail-card">
                                        <div className="detail-label">Graduation Year</div>
                                        <div className="detail-value">2028</div>
                                    </div>
                                    <div className="detail-card">
                                        <div className="detail-label">CGPA</div>
                                        <div className="detail-value">8.98 / 10</div>
                                    </div>
                                </div>
                            </div>

                            <div className="education-timeline glass-panel">
                                <div className="edu-item">
                                    <div className="edu-date">2024 - 2028</div>
                                    <div className="edu-title">B.Tech in Artificial Intelligence & Data Science</div>
                                    <div className="edu-inst">NMAM Institute of Technology, Nitte, Udupi</div>
                                    <span className="edu-score">CGPA: 8.98</span>
                                </div>
                                <div className="edu-item">
                                    <div className="edu-date">2022 - 2024</div>
                                    <div className="edu-title">CBSE Class XI & XII</div>
                                    <div className="edu-inst">Sri Chaitanya PU College, Mangalore</div>
                                    <span className="edu-score">Class XII: 74.5% | Class XI: 85%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Sub-Section */}
                <section id="skills" className="content-section">
                    <div className="container">
                        <h2 className="section-title">Technical Expertise</h2>
                        
                        <div className="skills-container">
                            {/* Languages */}
                            <div className="skill-category glass-panel">
                                <div className="skill-category-title">
                                    <i className="fas fa-code"></i> Languages
                                </div>
                                <div className="skills-list">
                                    <span className="skill-badge">Python</span>
                                    <span className="skill-badge">Java</span>
                                    <span className="skill-badge">C</span>
                                    <span className="skill-badge">SQL</span>
                                    <span className="skill-badge">JavaScript</span>
                                    <span className="skill-badge">HTML</span>
                                    <span className="skill-badge">CSS</span>
                                </div>
                            </div>

                            {/* Frontend */}
                            <div className="skill-category glass-panel">
                                <div className="skill-category-title">
                                    <i className="fab fa-react"></i> Frontend
                                </div>
                                <div className="skills-list">
                                    <span className="skill-badge">React.js</span>
                                    <span className="skill-badge">Next.js</span>
                                    <span className="skill-badge">HTML5</span>
                                    <span className="skill-badge">CSS3</span>
                                </div>
                            </div>

                            {/* Backend & Databases */}
                            <div className="skill-category glass-panel">
                                <div className="skill-category-title">
                                    <i className="fas fa-server"></i> Backend & DB
                                </div>
                                <div className="skills-list">
                                    <span className="skill-badge">Node.js</span>
                                    <span className="skill-badge">Express.js</span>
                                    <span className="skill-badge">FastAPI</span>
                                    <span className="skill-badge">MongoDB</span>
                                    <span className="skill-badge">PostgreSQL</span>
                                    <span className="skill-badge">MySQL</span>
                                </div>
                            </div>

                            {/* Libraries & Tools */}
                            <div className="skill-category glass-panel">
                                <div className="skill-category-title">
                                    <i className="fas fa-cubes"></i> Libraries & Tools
                                </div>
                                <div className="skills-list">
                                    <span class="skill-badge">Pandas</span>
                                    <span class="skill-badge">NumPy</span>
                                    <span class="skill-badge">Matplotlib</span>
                                    <span class="skill-badge">Scikit-learn</span>
                                    <span class="skill-badge">Socket.IO</span>
                                    <span class="skill-badge">Axios</span>
                                    <span class="skill-badge">Git & GitHub</span>
                                    <span class="skill-badge">VS Code</span>
                                    <span class="skill-badge">REST APIs</span>
                                    <span class="skill-badge">Machine Learning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. INFINITY (Projects, Achievements, Responsibility) */}
                <section id="projects" className="content-section">
                    <div className="container">
                        <h2 className="section-title">PROJECTS</h2>
                        
                        <div className="projects-grid">
                            {/* Project 1 */}
                            <div className="project-card glass-panel">
                                <div className="project-card-header">
                                    <div className="project-icon-box">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                    <div className="project-links">
                                        <span className="project-link-btn"><i className="fab fa-python"></i></span>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3 className="project-card-title">Agentic CI/CD Repair System</h3>
                                    <div className="project-date">2026</div>
                                    <ul className="project-bullets">
                                        <li>Developed an AI-driven DevOps platform using a Multi-Agent architecture to autonomously detect, diagnose, and suggest fixes for CI/CD failures.</li>
                                        <li>Implemented specialized agents for log analysis, root-cause identification, and code-fix generation with human approval workflows.</li>
                                        <li>Reduced developer effort in debugging build failures caused by syntax errors, dependency conflicts, and upstream breaking changes.</li>
                                    </ul>
                                </div>
                                <div className="project-tech-tags">
                                    <span className="tech-tag">Python</span>
                                    <span className="tech-tag">FastAPI</span>
                                    <span className="tech-tag">Multi-Agent AI</span>
                                    <span className="tech-tag">CI/CD</span>
                                </div>
                            </div>

                            {/* Project 2 */}
                            <div className="project-card glass-panel">
                                <div className="project-card-header">
                                    <div className="project-icon-box">
                                        <i className="fas fa-dna"></i>
                                    </div>
                                    <div className="project-links">
                                        <span className="project-link-btn"><i className="fab fa-react"></i></span>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3 className="project-card-title">Moleculens</h3>
                                    <div className="project-date">2026</div>
                                    <ul className="project-bullets">
                                        <li>Built an end-to-end chemistry platform for generating and visualizing interactive 3D molecular structures from natural-language prompts.</li>
                                        <li>Integrated a high-fidelity Three.js viewer with atom-level metadata generation and color-legend explanations.</li>
                                        <li>Implemented persistent chat sessions, molecule library exploration, and an immersive 3D user experience.</li>
                                    </ul>
                                </div>
                                <div className="project-tech-tags">
                                    <span className="tech-tag">React</span>
                                    <span className="tech-tag">Django</span>
                                    <span className="tech-tag">Three.js</span>
                                    <span className="tech-tag">AI</span>
                                </div>
                            </div>

                            {/* Project 3 */}
                            <div className="project-card glass-panel">
                                <div className="project-card-header">
                                    <div className="project-icon-box">
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="project-links">
                                        <a href="https://github.com/therealvishnuvardhan/inspirante-Vishnu" target="_blank" rel="noopener noreferrer" className="project-link-btn"><i className="fab fa-github"></i></a>
                                        <a href="https://inspirante-vishnu.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link-btn"><i className="fas fa-external-link-alt"></i></a>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3 className="project-card-title">Inspirante - Event Portal</h3>
                                    <div className="project-date">2026</div>
                                    <ul className="project-bullets">
                                        <li>Created a Next.js 15 college event management system with a secure admin control center and registration dashboard.</li>
                                        <li>Designed student dashboard featuring client-side search, caching, real-time indicators, and optimistic UI registrations.</li>
                                        <li>Implemented secure JWT authentication and role-based route protection.</li>
                                    </ul>
                                </div>
                                <div className="project-tech-tags">
                                    <span className="tech-tag">Next.js 15</span>
                                    <span className="tech-tag">MongoDB</span>
                                    <span className="tech-tag">JWT</span>
                                    <span className="tech-tag">Vanilla CSS</span>
                                </div>
                            </div>

                            {/* Project 4 */}
                            <div className="project-card glass-panel">
                                <div className="project-card-header">
                                    <div className="project-icon-box">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="project-links">
                                        <span className="project-link-btn"><i className="fas fa-brain"></i></span>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3 className="project-card-title">Intrusion Detection System</h3>
                                    <div className="project-date">2025 - Present</div>
                                    <ul className="project-bullets">
                                        <li>Developed a machine learning security platform to classify network traffic datasets as normal or malicious.</li>
                                        <li>Currently extending into a real-time security monitor capable of continuous threat assessment and log analysis.</li>
                                        <li>Implemented real-time anomaly detection, alert generation inspired by SIEM and antivirus solutions.</li>
                                    </ul>
                                </div>
                                <div className="project-tech-tags">
                                    <span className="tech-tag">Python</span>
                                    <span className="tech-tag">Scikit-learn</span>
                                    <span className="tech-tag">FastAPI</span>
                                    <span className="tech-tag">Pandas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience, Extra and Achievements */}
                <section id="extra" className="content-section">
                    <div className="container">
                        <h2 className="section-title">Leadership & Achievements</h2>
                        
                        <div className="extra-grid">
                            {/* Positions of Responsibility */}
                            <div className="glass-panel">
                                <div className="skill-category-title" style={{ marginBottom: "30px" }}>
                                    <i className="fas fa-users-cog"></i> Positions of Responsibility
                                </div>
                                
                                <div className="resp-item">
                                    <div className="resp-header">
                                        <h4 className="resp-title">Technical Team Member</h4>
                                        <span className="resp-date">2025 - Present</span>
                                    </div>
                                    <div className="resp-org">IDEA (AI & Data Science Association) - NMAMIT</div>
                                    <p className="resp-desc">Organized AI and Data Science workshops and assisted in technical project demonstrations.</p>
                                </div>

                                <div className="resp-item">
                                    <div className="resp-header">
                                        <h4 className="resp-title">NCC Cadet (Retired Hurt)</h4>
                                        <span className="resp-date">2025 - 2026</span>
                                    </div>
                                    <div className="resp-org">National Cadet Corps (Naval 6 KAR Sub Unit)</div>
                                    <p className="resp-desc">Participated in leadership training, drills, and discipline-focused activities.</p>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="glass-panel">
                                <div className="skill-category-title" style={{ marginBottom: "30px" }}>
                                    <i className="fas fa-trophy"></i> Key Achievements
                                </div>
                                
                                <ul className="achievements-list">
                                    <li className="achievement-card">
                                        <i className="fas fa-medal achievement-icon"></i>
                                        <span className="achievement-detail">Winner (1st Prize) – DSA Sprint 2026</span>
                                    </li>
                                    <li className="achievement-card">
                                        <i className="fas fa-medal achievement-icon"></i>
                                        <span className="achievement-detail">2nd Prize – Locked in Reality Technical Event (Inter-College Fest)</span>
                                    </li>
                                    <li className="achievement-card">
                                        <i className="fas fa-medal achievement-icon"></i>
                                        <span className="achievement-detail">2nd Prize – Ideathon Hackathon organized by IDEA</span>
                                    </li>
                                    <li className="achievement-card">
                                        <i className="fas fa-medal achievement-icon"></i>
                                        <span className="achievement-detail">4th Place – HackToFuture 4.0</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="content-section">
                    <div className="container">
                        <h2 className="section-title">Connect</h2>
                        
                        <div className="contact-container glass-panel">
                            <p className="contact-text">
                                I am currently open to internship opportunities, collaboration requests, and interesting technical discussions. Feel free to reach out via email!
                            </p>
                            
                            <a href="mailto:vishnuvardhanmunipalle@gmail.com" className="contact-email-btn">
                                <i className="fas fa-paper-plane"></i> vishnuvardhanmunipalle@gmail.com
                            </a>
                            
                            <div className="social-links-row">
                                <a href="https://www.linkedin.com/in/vishnu-vardhan-3587a9386/" target="_blank" rel="noopener noreferrer" className="social-circle-link linkedin">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="https://github.com/therealvishnuvardhan" target="_blank" rel="noopener noreferrer" className="social-circle-link github">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.instagram.com/therealvishnuvardhan" target="_blank" rel="noopener noreferrer" className="social-circle-link instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Footer */}
            <footer>
                <div className="container">
                    <p>&copy; 2026 Munipalle Vishnu Vardhan. All Rights Reserved. Powered by Starfield Space Engine.</p>
                </div>
            </footer>
        </>
    );
}
