import React from 'react'
import profile_img from '../../assets/26.jpg'
import './Hero.css'

function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className='hero' id='home'>
      <img src={profile_img} alt='Profile' />
      <h1> <span> I'm shakti jat,   </span> frontend developer based in India.</h1>
      <p>I am a frontend developer from Indore Madhya Pradesh India with 3.5 years of experiance</p>
      <div className='hero-action'>
        <button className="hero-connect" onClick={scrollToContact} aria-label="Contact">Connect With Me</button>
        <a className="hero-resume" href="/resume.pdf" download="Shakti-Jat-Resume.pdf" aria-label="Download Resume">My Resume</a>
      </div>
    </div>
  )
}

export default Hero
