import React from 'react';

// PUBLIC_INTERFACE
function LocationMap({ selectedLocation, onLocationSelect }) {
  // Placeholder for interactive map (to be replaced with actual map in production)
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

export default LocationMap;
