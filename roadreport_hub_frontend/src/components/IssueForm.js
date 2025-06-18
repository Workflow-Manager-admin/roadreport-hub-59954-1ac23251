import React from 'react';
import PhotoUpload from './PhotoUpload';

// PUBLIC_INTERFACE
function IssueForm({ onSubmit, formState, onChange, onPhotoUpload, photos, onRemovePhoto, location }) {
  const ISSUE_TYPES = [
    'Pothole',
    'Fallen Tree',
    'Illegal Parking',
    'Encroachment',
    'Waste Dump',
    'Flooded Road',
    'Other'
  ];
  return (
    <form className="issue-report-form" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <h2 style={{ color: '#fff', fontWeight: 500, marginTop: 0 }}>Report Road Issue</h2>
      <label className="form-label">Issue Type</label>
      <select
        className="form-input"
        value={formState.type}
        onChange={e => onChange('type', e.target.value)}
        required
      >
        <option value="">Select issue</option>
        {ISSUE_TYPES.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <label className="form-label" style={{ marginTop: 12 }}>Description</label>
      <textarea
        className="form-input"
        rows="2"
        placeholder="Describe the issue..."
        value={formState.description}
        onChange={e => onChange('description', e.target.value)}
        required
      />
      <PhotoUpload photos={photos} onUpload={onPhotoUpload} onRemove={onRemovePhoto} />
      <div style={{ margin: '12px 0', fontSize: 13, color: '#bbb' }}>
        Selected Location: {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'None'}
      </div>
      <button className="btn btn-large form-submit-btn" type="submit" style={{ background: '#ff0000', color: '#fff', width: '100%' }}>Submit Issue</button>
    </form>
  );
}

export default IssueForm;
