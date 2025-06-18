import React from 'react';

// PUBLIC_INTERFACE
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogin, onLogout, onRegister }) {
  const location = useLocation();
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            to="/"
            className="btn"
            style={{
              background: 'transparent',
              color: (location.pathname === '/') ? 'var(--base-light)' : '#fff',
              border: '1.2px solid var(--base-light)',
              fontWeight: 500,
              marginRight: 4
            }}
            tabIndex={0}
          >
            Home
          </Link>
          <Link
            to="/report-issue"
            className="btn"
            style={{
              background: location.pathname === '/report-issue' ? 'var(--base-light)' : 'transparent',
              color: location.pathname === '/report-issue' ? '#fff' : 'var(--base-light)',
              border: '1.2px solid var(--base-light)',
              fontWeight: 500,
              marginRight: 4
            }}
            tabIndex={0}
            aria-label="Report Issue page"
          >
            Report Issue
          </Link>
          {user ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
