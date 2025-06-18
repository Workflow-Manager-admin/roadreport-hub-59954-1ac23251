import React from 'react';

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

export default Navbar;
