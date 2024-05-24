import React, { useState, useEffect } from 'react';
import './UserPreferences.css';
import { fetchUserPreferences, createUserPreference, updateUserPreference, deleteUserPreference } from '../api';

function UserPreferences() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    fetchUserPreferences().then(data => setPreferences(data));
  }, []);

  const handleCreatePreference = async () => {
    try {
      const response = await createUserPreference(newPreference);
      setPreferences([...preferences, response]);
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating user preference:', error);
    }
  };

  const handleUpdatePreference = async () => {
    try {
      setIsUpdating(true);
      const response = await updateUserPreference(selectedPreference.id, newPreference);
      setPreferences(preferences.map(preference => preference.id === selectedPreference.id ? response : preference));
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async () => {
    try {
      setIsDeleting(true);
      await deleteUserPreference(selectedPreference.id);
      setPreferences(preferences.filter(preference => preference.id !== selectedPreference.id));
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  const handleTogglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handleSelectPreference = (preference) => {
    setSelectedPreference(preference);
    setNewPreference({ units: preference.units, location: preference.location, notifications: preference.notifications });
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

          <select value={selectedPreference?.id || ''} onChange={(event) => handleSelectPreference(preferences.find(preference => preference.id === parseInt(event.target.value)))}>
            <option value="">Select preference</option>
            {preferences.map((preference) => (
              <option key={preference.id} value={preference.id}>{preference.id}</option>
            ))}
          </select>

          <button type="submit">Create Preference</button>
          {selectedPreference && (
            <>
              <button disabled={isUpdating} onClick={handleUpdatePreference}>Update Preference</button>
              <button disabled={isDeleting} onClick={handleDeletePreference}>Delete Preference</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserPreferences;