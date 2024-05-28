import React, { useState } from 'react';
import './UserPreferences.css';

const fakeDatabase = {
  "userPreferences": [
    {
      "id": 1,
      "units": "metric",
      "location": "New York",
      "notifications": true
    },
    {
      "id": 2,
      "units": "imperial",
      "location": "Los Angeles",
      "notifications": false
    },
    {
      "id": 3,
      "units": "metric",
      "location": "Chicago",
      "notifications": true
    }
  ]
};

function UserPreferences({ onLocationUpdate }) {
  const [preferences, setPreferences] = useState(fakeDatabase.userPreferences);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [updatedPreference, setUpdatedPreference] = useState(null);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleCreatePreference = async () => {
    try {
      const newId = Math.max(...preferences.map(p => p.id)) + 1;
      const newPreferenceData = { ...newPreference, id: newId };
      setPreferences([...preferences, newPreferenceData]);
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating user preference:', error);
    }
  };

  const handleUpdatePreference = async () => {
    try {
      setIsUpdating(true);
      const updatedPreferenceData = { ...updatedPreference, id: selectedPreference.id };
      setPreferences(preferences.map(preference => preference.id === selectedPreference.id ? updatedPreferenceData : preference));
      setSelectedPreference(updatedPreferenceData); // Update selectedPreference with new values
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async () => {
    try {
      setIsDeleting(true);
      setPreferences(preferences.filter(preference => preference.id !== selectedPreference.id));
      setSelectedPreference(null);
      setNewPreference({ units: '', location: '', notifications: false }); // Reset new preference state
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  const handleTogglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handleSelectPreference = (preference) => {
    if (!preference) {
      setSelectedPreference(null);
      setUpdatedPreference(null);
    } else {
      setSelectedPreference(preference);
      setUpdatedPreference({ units: preference.units, location: preference.location, notifications: preference.notifications });
    }
  };

  const handleApplyPreference = () => {
    if (selectedPreference) {
      onLocationUpdate(selectedPreference.location);
    } else {
      console.log('No preference selected');
    }
  };

  return (
    <div>
      <button onClick={handleTogglePreferences} className='toggle-preferences-button'>Toggle Preferences</button>
      <div className={`user-preferences-container ${showPreferences ? 'show' : ''}`}>
        <h2>User Preferences</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreatePreference();
        }}>
          <div className="form-group">
            <label>Units:</label>
            <select value={newPreference.units} onChange={(event) => setNewPreference({ ...newPreference, units: event.target.value })}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
        
          <div className="form-group">
            <label>Location:</label>
            <input type="text" value={newPreference.location} onChange={(event) => setNewPreference({ ...newPreference, location: event.target.value })} />
          </div>
        
          <div className="form-group">
            <label>Notifications:</label>
            <input type="checkbox" checked={newPreference.notifications} onChange={(event) => setNewPreference({ ...newPreference, notifications: event.target.checked })} />
          </div>

          <button type="submit" className="create-button">Create Preference</button>

          {selectedPreference && (
            <div>
              <div className="form-group">
                <label>Units:</label>
                <select value={updatedPreference?.units || selectedPreference.units} onChange={(event) => setUpdatedPreference({ ...updatedPreference, units: event.target.value })}>
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input type="text" value={updatedPreference?.location || selectedPreference.location} onChange={(event) => setUpdatedPreference({ ...updatedPreference, location: event.target.value })} />
              </div>

              <div className="form-group">
                <label>Notifications:</label>
                <input type="checkbox" checked={updatedPreference?.notifications || selectedPreference.notifications} onChange={(event) => setUpdatedPreference({ ...updatedPreference, notifications: event.target.checked })} />
              </div>

              <button type="button" onClick={handleUpdatePreference} className="update-button">Update Preference</button>
              <button type="button" onClick={handleDeletePreference} className="delete-button">Delete Preference</button>
              <button type="button" onClick={handleApplyPreference} className="apply-button">Apply Preference</button>
            </div>
          )}
        </form>
        <div className="preferences-list">
          {preferences.map(preference => (
            <button key={preference.id} onClick={() => handleSelectPreference(preference)}>{preference.location}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;