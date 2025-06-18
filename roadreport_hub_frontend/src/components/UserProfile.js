import React from 'react';

// PUBLIC_INTERFACE
function UserProfile({ user, onLogout }) {
  // Only shown if user exists
  return (
    <div className="user-profile-panel">
      <div style={{ fontWeight: 600, color: '#fff', fontSize: 22, marginBottom: 4 }}>{user.username}</div>
      <div style={{ color: '#bbb', fontSize: 14, marginBottom: 18 }}>{user.email || 'user@demo.com'}</div>
      <button className="btn" style={{ background: '#ff0000', color: '#fff' }} onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
