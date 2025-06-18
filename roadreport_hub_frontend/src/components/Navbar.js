import React from 'react';

// PUBLIC_INTERFACE
function Navbar({ user, onLogin, onLogout, onRegister }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="container navbar-content" tabIndex={0}>
        <div className="logo" style={{ outline: 'none' }}>
          <span
            className="logo-symbol"
            style={{
              color: 'var(--base-light)',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginRight: 5
            }}
            aria-label="Project Icon"
          >⬤</span>
          <span style={{
            color: '#fff',
            letterSpacing: '0.02em',
            fontWeight: 600
          }}>
            RoadReport Hub
          </span>
        </div>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="user-badge" title="Logged-in user">{user.username}</span>
              <button
                className="btn"
                style={{
                  background: 'transparent',
                  color: 'var(--base-light)',
                  border: '1.2px solid var(--base-light)',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                  fontWeight: 500
                }}
                onClick={onLogout}
                tabIndex={0}
                aria-label="Log out"
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn"
                style={{
                  background: 'var(--base-light)',
                  color: '#fff',
                  border: '1.3px solid var(--base-light)'
                }}
                onClick={onLogin}
                tabIndex={0}
                aria-label="Log in"
              >
                Login
              </button>
              <button
                className="btn"
                style={{
                  color: 'var(--base-light)',
                  background: 'transparent',
                  border: '1.3px solid var(--base-light)'
                }}
                onClick={onRegister}
                tabIndex={0}
                aria-label="Register new account"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
