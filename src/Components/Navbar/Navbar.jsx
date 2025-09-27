import React, { useEffect, useState } from 'react'
import logo from '../../assets/Shakti-logo.svg'
import './Navbar.css'

function Navbar() {
  const menu = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ]

  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      let current = 'home'
      for (const m of menu) {
        const el = document.getElementById(m.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) current = m.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <header className='navbar'>
      <img src={logo} alt='logo' className='logo' />

      <nav>
        <ul className="nav-menu">
          {menu.map(m => (
            <li key={m.id}>
              <a
                href={`#${m.id}`}
                onClick={(e) => handleNavClick(e, m.id)}
                className={active === m.id ? 'active' : ''}
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* resume.pdf should be placed into public/ so /resume.pdf works after deploy */}
      <a className="nav-connect" href="/resume.pdf" download="resume.pdf" aria-label="Download Resume">
        Connect With Me
      </a>
    </header>
  )
}

export default Navbar
