import React, { useState, useEffect } from 'react';
import './UserPreferences.css'
import { fetchUserPreferences, createUserPreference, updateUserPreference, deleteUserPreference } from '../api'

function UserPreferences() {
  const [preferences, setPreferences] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    fetchUserPreferences()
      .then(data => setPreferences(data));
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

  const handleUpdatePreference = async (id, updatedPreference) => {
    try {
      setIsUpdating(true);
      const response = await updateUserPreference(id, updatedPreference);
      setPreferences(
        preferences.map((preference) => (preference.id === id? response : preference))
      );
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async (id) => {
    try {
      setIsDeleting(true);
      await deleteUserPreference(id);
      setPreferences(preferences.filter((preference) => preference.id!== id));
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
      <button onClick={handleTogglePreferences}>Toggle Preferences</button>
      <div className={`user-preferences-container ${showPreferences ? 'show' : ''}`}>
        <h2>User Preferences</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCreatePreference();
          }}
        >
          <label>
            Units:
            <select
              value={newPreference.units}
              onChange={(event) =>
                setNewPreference({...newPreference, units: event.target.value })
              }
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              value={newPreference.location}
              onChange={(event) =>
                setNewPreference({...newPreference, location: event.target.value })
              }
            />
          </label>
          <br />
          <label>
            Notifications:
            <input
              type="checkbox"
              checked={newPreference.notifications}
              onChange={(event) =>
                setNewPreference({...newPreference, notifications: event.target.checked })
              }
            />
          </label>
          <br />
          <button type="submit">Create Preference</button>
          {selectedPreference && (
            <>
              <button
                disabled={isUpdating}
                onClick={() => handleUpdatePreference(selectedPreference.id, newPreference)}
              >
                Update Preference
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDeletePreference(selectedPreference.id)}
              >
                Delete Preference
              </button>
            </>
          )}
        </form>
        <select
          value={selectedPreference?.id || ''}
          onChange={(event) => handleSelectPreference(preferences.find(preference => preference.id === parseInt(event.target.value)))}
        >
          <option value="">Select a preference to update or delete</option>
          {preferences.map((preference) => (
            <option key={preference.id} value={preference.id}>{preference.id}</option>
          ))}
        </select>
        <ul>
          {preferences.map((preference) => (
            <li key={preference.id}>
              <p>Units: {preference.units}</p>
              <p>Location: {preference.location}</p>
              <p>Notifications: {preference.notifications? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserPreferences;