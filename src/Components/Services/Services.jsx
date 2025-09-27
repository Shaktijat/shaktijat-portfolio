import React from 'react';
import './Services.css';


const services = [
  { id: 1, title: 'React JS Development', desc: 'Building modern, scalable web apps using React JS.', icon: '⚛️' },
  { id: 2, title: 'Next JS Development', desc: 'Server-side rendering and static site generation with Next JS.', icon: '⏭️' },
  { id: 3, title: 'HTML & CSS', desc: 'Responsive layouts and pixel-perfect UI with HTML & CSS.', icon: '🌐' },
  { id: 4, title: 'Tailwind CSS', desc: 'Rapid UI development with Tailwind CSS utility classes.', icon: '�' },
  { id: 5, title: 'Material UI', desc: 'Professional interfaces with Material UI components.', icon: '📦' },
];

function Services() {
  return (
    <div className="services-section">
      <h2 className="services-title">My Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-title">{service.title}</div>
            <div className="service-desc">{service.desc}</div>
            <a href="#" className="service-link">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
