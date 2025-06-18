import React, { useState, useRef } from 'react';
import PhotoUpload from './PhotoUpload';

// PUBLIC_INTERFACE
function IssueForm({
  onSubmit,
  formState,
  onChange,
  onPhotoUpload,
  photos,
  onRemovePhoto,
  location
}) {
  const ISSUE_TYPES = [
    'Pothole',
    'Fallen Tree',
    'Illegal Parking',
    'Encroachment',
    'Waste Dump',
    'Flooded Road',
    'Other'
  ];

  // Local validation state
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const typeRef = useRef(null);
  const descRef = useRef(null);

  function handleFieldBlur(field) {
    setTouched(t => ({ ...t, [field]: true }));
  }
  function validateType() {
    return !!formState.type;
  }
  function validateDesc() {
    return (formState.description || '').trim().length > 6;
  }
  function validateLocation() {
    return !!location;
  }
  function formValid() {
    return validateType() && validateDesc() && validateLocation();
  }
  function handleNativeSubmit(e) {
    e.preventDefault();
    setTouched({ type: true, description: true });
    setSubmitSuccess(false);
    setSubmitError('');
    // Specific field errors
    if (!validateType()) {
      setSubmitError('Please select an issue type.');
      typeRef.current?.focus();
      return;
    } else if (!validateDesc()) {
      setSubmitError('Description must be at least 7 characters.');
      descRef.current?.focus();
      return;
    } else if (!validateLocation()) {
      setSubmitError('Please select a location for the report.');
      return;
    }
    // Clear error, show spinner, then submit
    setSubmitError('');
    Promise.resolve(onSubmit())
      .then(() => {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 2500);
      })
      .catch(() => {
        setSubmitError('Submission failed. Please try again.');
      });
  }

  // Visual feedback colors
  const borderType = touched.type && !validateType() ? '2px solid #ff5555' : undefined;
  const borderDesc = touched.description && !validateDesc() ? '2px solid #ff5555' : undefined;
  const locationError = touched.description && !validateLocation();

  return (
    <form
      className="issue-report-form"
      onSubmit={handleNativeSubmit}
      aria-label="Report a Road Issue"
      noValidate
    >
      <h2 style={{ color: '#fff', fontWeight: 500, marginTop: 0 }}>Report Road Issue</h2>

      <label className="form-label" htmlFor="issue-type">
        Issue Type <span aria-hidden="true" style={{ color: '#ff4c4c' }}>*</span>
      </label>
      <select
        className="form-input"
        id="issue-type"
        ref={typeRef}
        value={formState.type}
        onChange={e => {
          onChange('type', e.target.value);
          setTouched(t => ({ ...t, type: true }));
        }}
        onBlur={() => handleFieldBlur('type')}
        required
        aria-invalid={!validateType()}
        aria-describedby={!validateType() && touched.type ? 'type-err' : undefined}
        style={{ border: borderType }}
      >
        <option value="">Select issue</option>
        {ISSUE_TYPES.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {!validateType() && touched.type && (
        <div style={{ color: '#ff5555', fontSize: '0.97em', marginTop: -3 }} id="type-err">
          Issue type is required.
        </div>
      )}

      <label className="form-label" htmlFor="desc" style={{ marginTop: 12 }}>
        Description <span aria-hidden="true" style={{ color: '#ff4c4c' }}>*</span>
      </label>
      <textarea
        className="form-input"
        id="desc"
        ref={descRef}
        rows="2"
        placeholder="Describe the issue..."
        value={formState.description}
        onChange={e => {
          onChange('description', e.target.value);
          setTouched(t => ({ ...t, description: true }));
        }}
        onBlur={() => handleFieldBlur('description')}
        required
        minLength={7}
        aria-invalid={!validateDesc()}
        aria-describedby={!validateDesc() && touched.description ? 'desc-err' : undefined}
        style={{ border: borderDesc }}
      />
      {!validateDesc() && touched.description && (
        <div style={{ color: '#ff5555', fontSize: '0.97em', marginTop: -3 }} id="desc-err">
          At least 7 characters required.
        </div>
      )}

      <PhotoUpload photos={photos} onUpload={onPhotoUpload} onRemove={onRemovePhoto} />

      <div style={{ margin: '11px 0', fontSize: 13, color: location ? '#71e881' : '#ff8888' }}>
        <span>
          Selected Location:
          <span style={{ marginLeft: 5, fontWeight: 500 }}>
            {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'None'}
          </span>
          {!location && touched.description && (
            <span style={{ color: '#ff5555', fontWeight: 400, marginLeft: 7 }}>
              <span role="img" aria-label="warning">⚠️</span> Required
            </span>
          )}
        </span>
      </div>

      {submitError && (
        <div style={{
          background: "#2f0c0c",
          color: "#ff8181",
          fontWeight: 500,
          border: "1.5px solid #ff3333",
          borderRadius: 7,
          marginTop: 2,
          marginBottom: 3,
          padding: "7px 10px",
          fontSize: '1em'
        }} role="alert" tabIndex={-1}>
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div style={{
          background: "#202c1a",
          color: "#83ec71",
          fontWeight: 500,
          border: "1.5px solid #38de51",
          borderRadius: 7,
          marginTop: 2,
          marginBottom: 3,
          padding: "7px 10px",
          fontSize: '1em'
        }} tabIndex={-1}>
          Issue submitted successfully!
        </div>
      )}

      <button
        className="btn btn-large form-submit-btn"
        type="submit"
        style={{
          background: formValid() ? '#ff0000' : '#333333',
          color: '#fff',
          width: '100%',
          opacity: formValid() ? 1 : 0.84,
          pointerEvents: formValid() ? 'auto' : 'none'
        }}
        aria-disabled={!formValid()}
      >
        Submit Issue
      </button>
    </form>
  );
}

export default IssueForm;
