import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  // Netlify: data-netlify="true" (works after deploy). Formspree fallback available.
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Netlify-friendly AJAX submit: posts form-encoded data to current origin
  const encode = (data) => Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const payload = { 'form-name': 'contact', ...form }
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="contact-section" id="contact">
      {/* Top Heading */}
      <h1 className="main-heading">
        Get in <span className="highlight">touch</span>
      </h1>

      <div className="contact-container">
        {/* Left Section */}
        <div className="contact-left">
          <h2 className="contact-title">
            <span className="gradient-text">Let's talk</span>
          </h2>
          <p className="contact-desc">
            I'm currently available to take on frontend projects (React / Next / Tailwind / Material UI). Send me a message with project details.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="icon" />
              <span>shaktijat007@gmail.com</span>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="icon" />
              <span>+91-9981960160</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <span>Indore, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <form className="contact-form" onSubmit={onSubmit} name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <label>Your Name</label>
            <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Enter your name" required />

            <label>Your Email</label>
            <input name="email" value={form.email} onChange={onChange} type="email" placeholder="Enter your email" required />

            <label>Write your message here</label>
            <textarea name="message" value={form.message} onChange={onChange} placeholder="Enter your message" required />

            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Submit now'}</button>
            {status === 'sent' && <div className="form-success">Thanks — message sent!</div>}
            {status === 'error' && <div className="form-error">Error sending, try later.</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
