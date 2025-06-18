import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import LocationMap from './components/LocationMap';
import IssueForm from './components/IssueForm';
import IssueManagementPanel from './components/IssueManagementPanel';
import UserProfile from './components/UserProfile';
import AuthenticationModal from './components/AuthenticationModal';

// PUBLIC_INTERFACE
function App() {
  // Main state
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
        <AuthenticationModal
          type={authType}
          onClose={handleAuthClose}
          onSubmit={handleAuthSubmit}
        />
      )}

      <main>
        <div className="main-layout">
          <div className="main-left">
            <LocationMap selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
            <div className="side-separator"></div>
            <IssueManagementPanel
              issues={issues}
              onSelect={handleIssueSelect}
              selectedId={selectedIssueId}
              onDelete={handleDeleteIssue}
            />
          </div>
          <div className="main-right">
            {user ?
              <>
                <UserProfile user={user} onLogout={handleLogout} />
                <IssueForm
                  formState={formState}
                  onChange={handleFormChange}
                  onSubmit={handleSubmitIssue}
                  onPhotoUpload={handleFormPhotoUpload}
                  photos={formPhotos}
                  onRemovePhoto={handleFormRemovePhoto}
                  location={selectedLocation}
                />
              </>
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
