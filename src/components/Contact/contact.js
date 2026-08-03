import React, { useState } from "react";
import "./contact.css";
import profile from "../../data/profile";
import useScrollReveal from "../../hooks/useScrollReveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../Icons/Icons";

const Contact = () => {
  const revealRef = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner reveal" ref={revealRef}>
        <p className="section-eyebrow mono">03 / Contact</p>
        <h2 className="section-title">Let's talk</h2>
        <p className="contact__intro">
          Have a role, a project, or a question about my work? Reach out directly or use the form.
        </p>

        <div className="contact__grid">
          <div className="contact__links">
            <a className="contact__link" href={`mailto:${profile.email}`}>
              <MailIcon /> <span>{profile.email}</span>
            </a>
            <a
              className="contact__link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon /> <span>LinkedIn</span>
            </a>
            <a
              className="contact__link"
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon /> <span>GitHub</span>
            </a>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="contact__field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label className="contact__field">
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="contact__field">
              <span>Message</span>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn--primary">
              Send message
            </button>
            {sent && (
              <p className="contact__note" role="status">
                Opening your email client to send this — if nothing opened, email me directly instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
