import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope as faEnvelopeSolid, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // faEnvelope'ı farklı bir adla import ettik

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionError, setSubmissionError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionError(false);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (name && email && message) {
      setSubmissionMessage('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSubmissionError(true);
      setSubmissionMessage('Please fill in all fields.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact" id="contact">
      <h1>Contact Me</h1>
      <p className="contact-intro">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
      <div className="contact-wrapper">
        {/* İletişim Bilgileri Kısmı Çıkarıldı */}

        <div className="contact-form">
          <h3>Send me a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><FontAwesomeIcon icon={faUser} className="form-icon" /> Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"><FontAwesomeIcon icon={faEnvelopeSolid} className="form-icon" /> Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message"><FontAwesomeIcon icon={faPaperPlane} className="form-icon" /> Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submissionMessage && (
              <p className={submissionError ? 'submission-error' : 'submission-success'}>
                {submissionMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;