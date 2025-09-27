import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  // Netlify: data-netlify="true" (works after deploy). Formspree fallback available.
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Netlify-friendly AJAX submit: posts form-encoded data to /contact
  const encode = (data) => Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
  // Optional external fallback endpoint (set in Vite env: VITE_FORM_ENDPOINT)
  // Example for Formsubmit.co AJAX: https://formsubmit.co/ajax/youremail@example.com
  const FALLBACK_ENDPOINT = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FORM_ENDPOINT ? import.meta.env.VITE_FORM_ENDPOINT : ''

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const payload = { 'form-name': 'contact', ...form }
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        const text = await res.text()
        console.error('Netlify response error', res.status, text)
        setStatus({ state: 'error', detail: `Server ${res.status}: ${text}` })
        // Fallback: build and submit a native form (will navigate away)
        // Try external fallback endpoint first (AJAX). If configured and fails, fall back to native submit.
        if (FALLBACK_ENDPOINT) {
          try {
            const extRes = await fetch(FALLBACK_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({ name: payload.name, email: payload.email, message: payload.message })
            })
            if (extRes && (extRes.ok || extRes.status === 200 || extRes.status === 201)) {
              setStatus('sent')
              setForm({ name: '', email: '', message: '' })
              return
            }
            // if external failed, continue to native fallback
            console.warn('External form endpoint did not accept submission', extRes && extRes.status)
          } catch (e) {
            console.warn('External fallback submit failed', e)
          }
        }
        fallbackNativeSubmit(payload, '/contact-success.html')
      }
    } catch (err) {
      console.error('Netlify submit exception', err)
      setStatus({ state: 'error', detail: err.message || String(err) })
      // Network error: try native form submit as a fallback
      try { 
        // try external fallback first
        if (FALLBACK_ENDPOINT) {
          try {
            await fetch(FALLBACK_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
            })
            setStatus('sent')
            setForm({ name: '', email: '', message: '' })
            return
          } catch (e) {
            console.warn('External fallback failed', e)
          }
        }
        fallbackNativeSubmit({ 'form-name': 'contact', ...form }, '/contact-success.html') 
      } catch (e) { console.error('fallback submit failed', e) }
    }
  }

  // If AJAX posting fails, create a regular form and submit it so Netlify can process it
  const fallbackNativeSubmit = (payload, redirect = '/') => {
    if (typeof document === 'undefined') return
    const formEl = document.createElement('form')
    formEl.method = 'POST'
    formEl.action = '/contact'
    formEl.style.display = 'none'
    formEl.setAttribute('data-netlify', 'true')
    formEl.name = 'contact'

    Object.keys(payload).forEach((key) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = payload[key]
      formEl.appendChild(input)
    })

    // Add a redirect field Netlify supports via 'redirect' query or native HTML redirect
    const redirectInput = document.createElement('input')
    redirectInput.type = 'hidden'
    redirectInput.name = 'redirect'
    redirectInput.value = redirect
    formEl.appendChild(redirectInput)

    document.body.appendChild(formEl)
    formEl.submit()
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
            {status && status.state === 'error' && <div className="form-error">Error sending: {status.detail}</div>}
            {status === 'error' && <div className="form-error">Error sending, try later.</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
