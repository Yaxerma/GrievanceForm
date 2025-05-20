import React, { useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';

function App() {
  const [mood, setMood] = useState('');
  const [feelings, setFeelings] = useState('');
  const [severity, setSeverity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // EmailJS integration
    emailjs.send(
      'service_ly7arzb', // replace with your EmailJS service ID
      'template_7xnkuih', // replace with your EmailJS template ID
      {
        mood,
        feelings,
        severity,
      },
      'aFNvs73stsFMuvP1d' // replace with your EmailJS public key (user ID)
    )
      .then((result) => {
        setSubmitted(true);
      }, (error) => {
        console.error('EmailJS error:', error);
        alert('There was an error submitting the form. Please try again.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shruti Ka Grievance Form</h1>
        {!submitted ? (
          <form className="grievance-form" onSubmit={handleSubmit}>
            <label>
              Mood:
              <select value={mood} onChange={e => setMood(e.target.value)} required>
                <option value="" disabled>Select mood</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Upset">Upset</option>
                <option value="Disappointed">Disappointed</option>
                <option value="Ignored">Ignored</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="center-label feelings-label">
              <span>📝 Describe Your Feelings:</span>
              <textarea
                value={feelings}
                onChange={e => setFeelings(e.target.value)}
                placeholder="Type your feelings here... 💖"
                required
              />
            </label>
            <label>
              Severity:
              <div className="severity-options">
                <label><input type="radio" name="severity" value="Low" onChange={e => setSeverity(e.target.value)} required /> 💗 Low</label>
                <label><input type="radio" name="severity" value="Medium" onChange={e => setSeverity(e.target.value)} /> 💖 Medium</label>
                <label><input type="radio" name="severity" value="High" onChange={e => setSeverity(e.target.value)} /> 💔 High</label>
                <label><input type="radio" name="severity" value="Critical" onChange={e => setSeverity(e.target.value)} /> 😭 Critical</label>
              </div>
            </label>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        ) : (
          <div className="response-message">
            <h2>OK SHRUTI, YASH WILL GET BACK TO YOU SOON , KEEP IN MIND - HE LOVES YOU THE MOST</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
