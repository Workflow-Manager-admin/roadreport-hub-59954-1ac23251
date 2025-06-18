import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Navbar({ user, onLogin, onLogout, onRegister }) {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="logo">
          <span className="logo-symbol" style={{ color: '#ff0000' }}>⬤</span> RoadReport Hub
        </div>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="user-badge">{user.username}</span>
              <button className="btn" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={onLogin}>Login</button>
              <button className="btn" onClick={onRegister}>Register</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function MapPanel({ selectedLocation, onLocationSelect }) {
  // Placeholder for interactive map, e.g., use static image or gray box for now
  return (
    <div className="map-panel">
      <div className="map-placeholder">
        <span style={{ color: '#ff0000', fontWeight: 600, fontSize: 18 }}>
          Map Placeholder
        </span>
        <div style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>
          Map features (select point, pan/zoom) will appear here.
        </div>
      </div>
      <div className="map-coords">
        <label style={{ color: '#bbb', fontSize: 13 }}>Selected Location:</label>
        <span style={{ color: '#fff', marginLeft: 8 }}>
          {selectedLocation ? `${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}` : 'None'}
        </span>
        <button className="btn btn-small" style={{ marginLeft: 16 }} onClick={() => onLocationSelect({lat: 12.9716, lng: 77.5946})}>
          Use My Location (demo)
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function PhotoUploadPanel({ photos, onUpload, onRemove }) {
  // UI-only (no backend), photos is [{name, url}]
  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      // In real app, upload to server. Here, mock preview
      const file = e.target.files[0];
      const mockUrl = URL.createObjectURL(file);
      onUpload({ name: file.name, url: mockUrl });
    }
  }
  return (
    <div className="photo-upload-panel">
      <label className="form-label">Upload Photos</label>
      <input
        type="file"
        accept="image/*"
        className="photo-input"
        onChange={handleFileChange}
      />
      <div className="photo-preview-list">
        {photos.map((photo, idx) => (
          <div className="photo-thumb" key={idx}>
            <img src={photo.url} alt={photo.name} />
            <button className="remove-photo-btn" onClick={() => onRemove(idx)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function IssueReportForm({ onSubmit, formState, onChange, onPhotoUpload, photos, onRemovePhoto, location }) {
  // Mock list of issue types
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
      <PhotoUploadPanel photos={photos} onUpload={onPhotoUpload} onRemove={onRemovePhoto} />
      <div style={{ margin: '12px 0', fontSize: 13, color: '#bbb' }}>
        Selected Location: {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'None'}
      </div>
      <button className="btn btn-large form-submit-btn" type="submit" style={{ background: '#ff0000', color: '#fff', width: '100%' }}>Submit Issue</button>
    </form>
  );
}

// PUBLIC_INTERFACE
function IssuesListPanel({ issues, onSelect, selectedId, onDelete }) {
  return (
    <div className="issues-list-panel">
      <div className="issues-list-header">Recent Reports</div>
      {issues.length === 0 && (
        <div className="issues-empty">No issues reported yet.</div>
      )}
      {issues.map((issue, i) => (
        <div
          className={`issue-card${issue.id === selectedId ? ' selected' : ''}`}
          key={issue.id}
          onClick={() => onSelect(issue.id)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span className="issue-type">{issue.type}</span>
              <span className="issue-meta"> &middot; {issue.date}</span>
            </div>
            <button className="delete-issue-btn" title="Delete" onClick={e => { e.stopPropagation(); onDelete(issue.id); }}>✕</button>
          </div>
          <div style={{ color: '#bbb', fontSize: 13, marginTop: 2 }}>{issue.description}</div>
          {issue.photoUrls && issue.photoUrls.length > 0 && (
            <div className="issue-card-photos">
              {issue.photoUrls.map((url, idx) => (
                <img src={url} alt="issue" className="issue-thumb" key={idx} />
              ))}
            </div>
          )}
          <div className="issue-card-location">📍 {issue.location.lat.toFixed(4)}, {issue.location.lng.toFixed(4)}</div>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function UserProfilePanel({ user, onLogout }) {
  // Only shown if user exists
  return (
    <div className="user-profile-panel">
      <div style={{ fontWeight: 600, color: '#fff', fontSize: 22, marginBottom: 4 }}>{user.username}</div>
      <div style={{ color: '#bbb', fontSize: 14, marginBottom: 18 }}>{user.email || 'user@demo.com'}</div>
      <button className="btn" style={{ background: '#ff0000', color: '#fff' }} onClick={onLogout}>Logout</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function AuthModal({ onClose, onSubmit, type }) {
  // UI only: demo login/register with username/password
  const [form, setForm] = useState({ username: '', password: '' });
  function handleChange(name, val) {
    setForm(f => ({ ...f, [name]: val }));
  }
  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        <h2 style={{ color: '#fff', marginBottom: 16 }}>{type === 'login' ? 'Login' : 'Register'}</h2>
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          value={form.username}
          onChange={e => handleChange('username', e.target.value)}
        />
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          style={{ marginTop: 10 }}
          value={form.password}
          onChange={e => handleChange('password', e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button
            className="btn"
            style={{ background: '#ff0000', color: '#fff' }}
            onClick={() => { onSubmit(form); }}
          >
            {type === 'login' ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Main mock state
  const [user, setUser] = useState(null); // {username}
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [issues, setIssues] = useState([
    {
      id: '1',
      type: "Pothole",
      description: "Large pothole in middle of 4th Cross. Causing accidents.",
      photoUrls: [],
      location: { lat: 12.97, lng: 77.59 },
      date: "2024-06-04"
    }
  ]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const [formState, setFormState] = useState({
    type: "",
    description: ""
  });

  const [formPhotos, setFormPhotos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  function handleLoginModal() {
    setShowAuth(true);
    setAuthType('login');
  }
  function handleRegisterModal() {
    setShowAuth(true);
    setAuthType('register');
  }
  function handleAuthClose() {
    setShowAuth(false);
  }
  function handleAuthSubmit(form) {
    setUser({ username: form.username });
    setShowAuth(false);
  }

  function handleLogout() {
    setUser(null);
    setSelectedIssueId(null);
  }

  function handleFormChange(field, val) {
    setFormState(fs => ({ ...fs, [field]: val }));
  }
  function handleFormPhotoUpload(photo) {
    setFormPhotos(ps => [...ps, photo]);
  }
  function handleFormRemovePhoto(idx) {
    setFormPhotos(ps => ps.filter((_, i) => i !== idx));
  }
  function handleSubmitIssue() {
    if (!user) {
      window.alert("You must login to submit an issue.");
      return;
    }
    if (!formState.type || !formState.description || !selectedLocation) {
      window.alert("Please fill all fields and select a location.");
      return;
    }
    const now = new Date();
    setIssues(prev => [
      {
        id: `${now.getTime()}`,
        type: formState.type,
        description: formState.description,
        location: selectedLocation,
        date: now.toISOString().split('T')[0],
        photoUrls: formPhotos.map(f => f.url)
      },
      ...prev
    ]);
    setFormState({ type: "", description: "" });
    setFormPhotos([]);
    setSelectedLocation(null);
  }
  function handleDeleteIssue(id) {
    setIssues(prev => prev.filter(issue => issue.id !== id));
    if (selectedIssueId === id) setSelectedIssueId(null);
  }

  function handleIssueSelect(id) {
    setSelectedIssueId(id);
  }

  function handleLocationSelect(loc) {
    setSelectedLocation(loc);
  }

  return (
    <div className="app roadreport-hub-app">
      <Navbar
        user={user}
        onLogin={handleLoginModal}
        onLogout={handleLogout}
        onRegister={handleRegisterModal}
      />

      {showAuth && (
        <AuthModal
          type={authType}
          onClose={handleAuthClose}
          onSubmit={handleAuthSubmit}
        />
      )}

      <main>
        <div className="main-layout">
          <div className="main-left">
            <MapPanel selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
            <div className="side-separator"></div>
            <IssuesListPanel
              issues={issues}
              onSelect={handleIssueSelect}
              selectedId={selectedIssueId}
              onDelete={handleDeleteIssue}
            />
          </div>
          <div className="main-right">
            {user ?
              <React.Fragment>
                <UserProfilePanel user={user} onLogout={handleLogout} />
                <IssueReportForm
                  formState={formState}
                  onChange={handleFormChange}
                  onSubmit={handleSubmitIssue}
                  onPhotoUpload={handleFormPhotoUpload}
                  photos={formPhotos}
                  onRemovePhoto={handleFormRemovePhoto}
                  location={selectedLocation}
                />
              </React.Fragment>
              :
              <div className="auth-reminder">
                <div style={{ fontSize: 20, color: '#fff', marginBottom: 10 }}>
                  Login or Register to report issues
                </div>
                <button className="btn btn-large" onClick={handleLoginModal} style={{ background: '#ff0000', color: '#fff' }}>
                  Login
                </button>
                <button className="btn btn-large" onClick={handleRegisterModal} style={{ color: '#ff0000', background: '#222', marginLeft: 10 }}>
                  Register
                </button>
              </div>
            }
          </div>
        </div>
        <footer className="footer">
          <span style={{ color: '#bbb', fontSize: 14 }}>Made with <span style={{ color: '#ff0000' }}>♥</span> for city safety · RoadReport Hub 2024</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
