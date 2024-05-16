import React, { useState, useEffect } from 'react';
import { fetchUserPreferences, createUserPreference, updateUserPreference, deleteUserPreference } from './api';

function UserPreferences() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/user-preferences')
     .then(response => response.json())
     .then(data => setPreferences(data));
  }, []);

  const handleCreatePreference = async () => {
    try {
      const response = await fetch('/api/user-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreference),
      });
      const data = await response.json();
      setPreferences([...preferences, data]);
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  const handleUpdatePreference = async (id, updatedPreference) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/user-preferences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPreference),
      });
      const data = await response.json();
      setPreferences(
        preferences.map((preference) => (preference.id === id? data : preference))
      );
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async (id) => {
    try {
      setIsDeleting(true);
      await fetch(`/api/user-preferences/${id}`, { method: 'DELETE' });
      setPreferences(preferences.filter((preference) => preference.id!== id));
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  return (
    <div>
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
              onClick={() =>
                handleUpdatePreference(preference.id, {
                  units: 'etric',
                  location: 'New York',
                  notifications: true,
                })
              }
            >
              Update
            </button>
            <button onClick={() => handleDeletePreference(preference.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPreferences;