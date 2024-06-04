import React, { useState, useEffect } from 'react';
import './UserPreferences.css';
import { fetchUserPreferences, createUserPreference, updateUserPreference, deleteUserPreference } from '../api.js';

function UserPreferences({ onLocationUpdate }) {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferencesData = await fetchUserPreferences();
        setPreferences(preferencesData);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };
    fetchPreferences();
  }, []);

  const handleCreatePreference = async (newPreference) => {
    try {
      const newPreferenceData = await createUserPreference(newPreference);
      setPreferences([...preferences, newPreferenceData]);
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating user preference:', error);
    }
  };

  const handleUpdatePreference = async (id, updatedPreference) => {
    try {
      await updateUserPreference(id, updatedPreference);
      setPreferences(preferences.map(preference => preference.id === id ? updatedPreference : preference));
      setSelectedPreference(updatedPreference); // Update selectedPreference with new values
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async (id) => {
    try {
      await deleteUserPreference(id);
      setPreferences(preferences.filter(preference => preference.id !== id));
      setSelectedPreference(null);
      setNewPreference({ units: '', location: '', notifications: false }); // Reset new preference state
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  const handleTogglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handleSelectPreference = (preference) => {
    setSelectedPreference(preference);
    setNewPreference({ ...preference }); // Set new preference state to the selected preference
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
        <button onClick={handleTogglePreferences} className='exit-button'>Exit</button>
        <h2>User Preferences</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreatePreference(newPreference);
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
        </form>

        {selectedPreference && (
          <div>
            <h3>Update Preference</h3>
            <button onClick={() => handleUpdatePreference(selectedPreference.id, newPreference)} className="update-button">Update Preference</button>
            <button onClick={() => handleDeletePreference(selectedPreference.id)} className="delete-button">Delete Preference</button>
            <button onClick={handleApplyPreference} className="apply-button">Apply Preference</button>
          </div>
        )}

        <div className="preferences-list">
          <h3>Preferences List</h3>
          {preferences.map(preference => (
            <button key={preference.id} onClick={() => handleSelectPreference(preference)}>{preference.location}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;
