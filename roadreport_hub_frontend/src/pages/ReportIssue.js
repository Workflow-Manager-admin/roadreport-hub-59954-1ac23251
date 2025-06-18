import React, { useState } from 'react';
import IssueForm from '../components/IssueForm';

// PUBLIC_INTERFACE
function ReportIssue() {
  // These are local state copies, decoupled from App.js to maintain independent form state
  const [formState, setFormState] = useState({ type: "", description: "" });
  const [formPhotos, setFormPhotos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFormChange(field, val) {
    setFormState(fs => ({ ...fs, [field]: val }));
  }
  function handleFormPhotoUpload(photo) {
    setFormPhotos(ps => [...ps, photo]);
  }
  function handleFormRemovePhoto(idx) {
    setFormPhotos(ps => ps.filter((_, i) => i !== idx));
  }
  function handleLocationDemo() {
    // Provide a fake location for demo since no map is rendered here
    setSelectedLocation({ lat: 12.9716, lng: 77.5946 });
  }
  function handleSubmitIssue() {
    // Just simulate submit for demo (reset form)
    setSubmitted(true);
    setFormState({ type: "", description: "" });
    setFormPhotos([]);
    setTimeout(() => setSubmitted(false), 2400);
    setSelectedLocation(null);
  }

  // Use dark layout and padding consistent with established theme
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--base-dark)',
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 110,
    }}>
      <div className="container" style={{ maxWidth: 520, width: '100%', margin: '0 auto' }}>
        <h1 className="title" style={{ fontSize: 36, marginBottom: 10, color: '#fff' }}>
          Report an Issue
        </h1>
        <div className="description" style={{
          color: 'var(--text-secondary)',
          marginBottom: 28,
          fontSize: 18,
        }}>
          Please fill out the form below to report a road issue. Fields marked <span style={{ color: '#ff4c4c' }}>*</span> are required.
        </div>

        <IssueForm
          formState={formState}
          onChange={handleFormChange}
          onSubmit={handleSubmitIssue}
          onPhotoUpload={handleFormPhotoUpload}
          photos={formPhotos}
          onRemovePhoto={handleFormRemovePhoto}
          location={selectedLocation}
        />

        <button
          className="btn btn-large"
          style={{ marginTop: 20, background: 'var(--base-light)', color: '#fff', width: '100%' }}
          onClick={handleLocationDemo}
          type="button"
        >
          Demo: Use My Location
        </button>

        {submitted &&
          <div style={{
            marginTop: 22,
            color: '#70ff97',
            fontWeight: 600,
            fontSize: '1.15em',
            background: '#202c1a',
            border: "1.5px solid #38de51",
            borderRadius: 7,
            padding: "10px"
          }}>
            Issue submitted!
          </div>
        }
      </div>
    </div>
  );
}

export default ReportIssue;
