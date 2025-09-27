import React from 'react'
import profile from '././../../assets/26.jpg'
import './About.css'

function About() {
  return (
    <div className='about'>
      <div className="about-title">
        About <span className="about-title-accent">me</span>
      </div>
      <div className="about-main">
        <div className="about-img">
          <img src={profile} alt="Profile" />
        </div>
        <div className="about-info">
          <div className="about-content">
            I am an experienced Frontend Developer with over a decade of professional expertise in the field. Throughout my career, I have had the privilege of collaborating with prestigious organizations, contributing to their success and growth.<br /><br />
            My passion for frontend development is not only reflected in my extensive experience but also in the enthusiasm and dedication I bring to each project.
          </div>
          <div className="about-skills">
            <div className="skill-row">
              <span className="skill-label">HTML &amp; CSS</span>
              <div className="skill-bar"><div className="skill-bar-fill" style={{width:'98%'}}></div></div>
            </div>
            <div className="skill-row">
              <span className="skill-label">React JS</span>
              <div className="skill-bar"><div className="skill-bar-fill" style={{width:'95%'}}></div></div>
            </div>
            <div className="skill-row">
              <span className="skill-label">JavaScript</span>
              <div className="skill-bar"><div className="skill-bar-fill" style={{width:'90%'}}></div></div>
            </div>
            <div className="skill-row">
              <span className="skill-label">Next JS</span>
              <div className="skill-bar"><div className="skill-bar-fill" style={{width:'85%'}}></div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-stats">
        <div className="stat">
          <div className="stat-number">10+</div>
          <div className="stat-label">YEARS OF EXPERIENCE</div>
        </div>
        <div className="stat">
          <div className="stat-number">90+</div>
          <div className="stat-label">PROJECTS COMPLETED</div>
        </div>
        <div className="stat">
          <div className="stat-number">45+</div>
          <div className="stat-label">HAPPY CLIENTS</div>
        </div>
      </div>
    </div>
  );
}

export default About;
