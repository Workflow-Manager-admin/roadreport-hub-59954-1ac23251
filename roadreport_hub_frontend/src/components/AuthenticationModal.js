import React, { useState } from 'react';

// PUBLIC_INTERFACE
function AuthenticationModal({ onClose, onSubmit, type }) {
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

export default AuthenticationModal;
