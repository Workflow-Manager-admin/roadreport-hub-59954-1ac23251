import React from 'react';

// PUBLIC_INTERFACE
function PhotoUpload({ photos, onUpload, onRemove }) {
  // UI-only: photos is [{name, url}]
  function handleFileChange(e) {
    if (e.target.files.length > 0) {
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

export default PhotoUpload;
