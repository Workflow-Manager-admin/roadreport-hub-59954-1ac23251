import React from 'react';

// PUBLIC_INTERFACE
function IssueManagementPanel({ issues, onSelect, selectedId, onDelete }) {
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

export default IssueManagementPanel;
