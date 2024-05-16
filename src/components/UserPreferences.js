import React, { useState, useEffect } from 'react';
import './UserPreferences.css'
import { fetchUserPreferences, createUserPreference, updateUserPreference, deleteUserPreference } from '../api'

function UserPreferences() {
  const [preferences, setPreferences] = useState([]);
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
        </form>
        <ul>
          {preferences.map((preference) => (
            <li key={preference.id}>
              <p>Units: {preference.units}</p>
              <p>Location: {preference.location}</p>
              <p>Notifications: {preference.notifications? 'Yes' : 'No'}</p>
              <button
                disabled={isUpdating}
                onClick={() =>
                  handleUpdatePreference(preference.id, {
                    units: 'Metric',
                    location: 'New York',
                    notifications: true,
                  })
                }
              >
                Update
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDeletePreference(preference.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserPreferences;