import React from 'react';
import './Portfolio.css';
import project1 from '../../assets/mywork3.png';
import project2 from '../../assets/mywork2.png';
import project3 from '../../assets/mywork1.png';

const projects = [
  { id: 1, title: 'Modern Web App', img: project1, desc: 'A modern web application for businesses.' },
  { id: 2, title: 'Creative Landing Page', img: project2, desc: 'A landing page for a creative agency.' },
  { id: 3, title: 'iGaming Platform', img: project3, desc: 'A full-featured iGaming platform.' },
];

function Portfolio() {
  return (
    <div className="portfolio-section">
      <h2 className="portfolio-title">My Latest Work</h2>
      <div className="portfolio-grid">
        {projects.map(project => (
          <div className="portfolio-card" key={project.id}>
            <img src={project.img} alt={project.title} className="portfolio-img" />
            <div className="portfolio-project-title">{project.title}</div>
            <div className="portfolio-desc">{project.desc}</div>
          </div>
        ))}
      </div>
      <button className="portfolio-showmore">Show More</button>
    </div>
  );
}

export default Portfolio;
