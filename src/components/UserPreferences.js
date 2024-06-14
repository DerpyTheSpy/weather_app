import React, { useState, useEffect } from 'react';
import './UserPreferences.css';

function UserPreferences({ onLocationUpdate }) {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });
  const [updatedPreference, setUpdatedPreference] = useState(null);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showManagePreferences, setShowManagePreferences] = useState(false);
  const [showCreatePreferences, setShowCreatePreferences] = useState(false);

  // Mock API functions
  const fetchUserPreferences = async () => {
    return [
      { id: 1, units: 'metric', location: 'New York', notifications: true },
      { id: 2, units: 'imperial', location: 'Los Angeles', notifications: false },
      { id: 3, units: 'metric', location: 'Chicago', notifications: true },
    ];
  };

  const createUserPreference = async (newPreference) => {
    const newId = Math.floor(Math.random() * 10000);
    return { ...newPreference, id: newId };
  };

  const updateUserPreference = async (id, updatedPreference) => {
    return { id, ...updatedPreference };
  };

  const deleteUserPreference = async (id) => {
    return { id };
  };

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
      // Check if the location value is valid (not null, empty, or contains numbers)
      if (!newPreference.location || !/^[a-zA-Z\s]+$/.test(newPreference.location)) {
        throw new Error('Invalid location value. Please enter a non-empty city name without numbers.');
      }
  
      const newPreferenceData = await createUserPreference(newPreference);
      setPreferences((prevPreferences) => [...prevPreferences, newPreferenceData]);
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating user preference:', error);
  
      if (error.message.includes('location')) {
        alert(error.message);
        setNewPreference((prevState) => ({ ...prevState, location: '' }));
      }
    }
  };

  const handleUpdatePreference = async (id, updatedPreference) => {
    try {
      setIsUpdating(true);
      const updatedPreferenceData = await updateUserPreference(id, updatedPreference);
      setPreferences(preferences.map((preference) => (preference.id === id ? updatedPreferenceData : preference)));
      setSelectedPreference(updatedPreferenceData); // Update selectedPreference with new values
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeletePreference = async (id) => {
    try {
      setIsDeleting(true);
      await deleteUserPreference(id);
      setPreferences(preferences.filter((preference) => preference.id !== id));
      setSelectedPreference(null);
      setNewPreference({ units: '', location: '', notifications: false }); // Reset new preference state
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  const handleToggleManagePreferences = () => {
    setShowManagePreferences(!showManagePreferences);
  };

  const handleToggleCreatePreferences = () => {
    setShowCreatePreferences(!showCreatePreferences);
  };

  const handleSelectPreference = (preference) => {
    if (!preference) {
      setSelectedPreference(null);
      setUpdatedPreference(null);
    } else {
      setSelectedPreference(preference);
      setUpdatedPreference({
        units: preference.units,
        location: preference.location,
        notifications: preference.notifications,
      });
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
      <button onClick={handleToggleManagePreferences} className='hamburger-menu'>
        &#9776;
      </button>
      <button onClick={handleToggleCreatePreferences} className='toggle-preferences'>
        Toggle Preferences
      </button>

      <div className={`user-preferences-container ${showManagePreferences ? 'show' : ''}`}>
        <button onClick={handleToggleManagePreferences} className='exit-button'>Exit</button>
        <h2>Manage Preferences</h2>
        <div className="preferences-list">
          {preferences.map((preference) => (
            <button key={preference.id} onClick={() => handleSelectPreference(preference)}>
              {preference.location}
            </button>
          ))}
        </div>
        {selectedPreference && (
          <div>
            <div className="form-group">
              <label>Units:</label>
              <select
                value={updatedPreference?.units || selectedPreference.units}
                onChange={(event) =>
                  setUpdatedPreference({ ...updatedPreference, units: event.target.value })
                }>
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={updatedPreference?.location || selectedPreference.location}
                onChange={(event) =>
                  setUpdatedPreference({ ...updatedPreference, location: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Notifications:</label>
              <input
                type="checkbox"
                checked={updatedPreference?.notifications || selectedPreference.notifications}
                onChange={(event) =>
                  setUpdatedPreference({ ...updatedPreference, notifications: event.target.checked })
                }
              />
            </div>
            <button
              type="button"
              onClick={() => handleUpdatePreference(selectedPreference.id, updatedPreference)}
              className="update-button">
              Update Preference
            </button>
            <button
              type="button"
              onClick={() => handleDeletePreference(selectedPreference.id)}
              className="delete-button">
              Delete Preference
            </button>
            <button type="button" onClick={handleApplyPreference} className="apply-button">
              Apply Preference
            </button>
          </div>
        )}
      </div>

      <div className={`user-preferences-container ${showCreatePreferences ? 'show' : ''}`}>
        <button onClick={handleToggleCreatePreferences} className='exit-button'>
          Exit
        </button>
        <h2>Create Preferences</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCreatePreference(newPreference);
          }}>
          <div className="form-group">
            <label>Units:</label>
            <select
              value={newPreference.units}
              onChange={(event) => setNewPreference({ ...newPreference, units: event.target.value })}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={newPreference.location}
              onChange={(event) => setNewPreference({ ...newPreference, location: event.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Notifications:</label>
            <input
              type="checkbox"
              checked={newPreference.notifications}
              onChange={(event) =>
                setNewPreference({ ...newPreference, notifications: event.target.checked })
              }
            />
          </div>
          <button type="submit" className="create-button">
            Create Preference
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserPreferences;
