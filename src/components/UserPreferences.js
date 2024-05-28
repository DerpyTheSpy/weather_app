import React, { useState, useEffect } from 'react';
import './UserPreferences.css';

// Fake database containing user preferences
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

/**
 * UserPreferences component that allows users to create, update, and delete their preferences.
 *
 * @param {function} onLocationUpdate - A callback function that is called when the user selects a preference.
 */
function UserPreferences({ onLocationUpdate }) {
  // State variable to store the user preferences
  const [preferences, setPreferences] = useState(fakeDatabase.userPreferences);

  // State variable to store the new preference being created
  const [newPreference, setNewPreference] = useState({ units: '', location: '', notifications: false });

  // State variable to store the updated preference being edited
  const [updatedPreference, setUpdatedPreference] = useState(null);

  // State variable to store the selected preference being edited or applied
  const [selectedPreference, setSelectedPreference] = useState(null);

  // State variable to control whether the user is updating a preference
  const [isUpdating, setIsUpdating] = useState(false);

  // State variable to control whether the user is deleting a preference
  const [isDeleting, setIsDeleting] = useState(false);

  // State variable to control whether the user preferences are shown or hidden
  const [showPreferences, setShowPreferences] = useState(false);

  /**
   * handleCreatePreference function that creates a new user preference.
   */
  const handleCreatePreference = async () => {
    try {
      // Generate a new ID for the preference
      const newId = Math.max(...preferences.map(p => p.id)) + 1;

      // Create a new preference object with the new ID
      const newPreferenceData = { ...newPreference, id: newId };

      // Add the new preference to the preferences array
      setPreferences([...preferences, newPreferenceData]);

      // Reset the new preference state
      setNewPreference({ units: '', location: '', notifications: false });
    } catch (error) {
      console.error('Error creating user preference:', error);
    }
  };

  /**
   * handleUpdatePreference function that updates an existing user preference.
   */
  const handleUpdatePreference = async () => {
    try {
      // Set the isUpdating state to true
      setIsUpdating(true);

      // Create a new preference object with the updated values
      const updatedPreferenceData = { ...updatedPreference, id: selectedPreference.id };

      // Update the preferences array with the new preference object
      setPreferences(preferences.map(preference => preference.id === selectedPreference.id ? updatedPreferenceData : preference));

      // Update the selectedPreference state with the new values
      setSelectedPreference(updatedPreferenceData);

      // Set the isUpdating state to false
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  /**
   * handleDeletePreference function that deletes an existing user preference.
   */
  const handleDeletePreference = async () => {
    try {
      // Set the isDeleting state to true
      setIsDeleting(true);

      // Remove the selected preference from the preferences array
      setPreferences(preferences.filter(preference => preference.id !== selectedPreference.id));

      // Reset the selectedPreference and newPreference states
      setSelectedPreference(null);
      setNewPreference({ units: '', location: '', notifications: false });

      // Set the isDeleting state to false
setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting preference:', error);
    }
  };

  /**
   * handleTogglePreferences function that toggles the visibility of the user preferences.
   */
  const handleTogglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  /**
   * handleSelectPreference function that selects a preference for editing or applying.
   *
   * @param {object} preference - The preference object being selected.
   */
  const handleSelectPreference = (preference) => {
    if (!preference) {
      // Reset the selectedPreference and updatedPreference states
      setSelectedPreference(null);
      setUpdatedPreference(null);
    } else {
      // Update the selectedPreference and updatedPreference states
      setSelectedPreference(preference);
      setUpdatedPreference({ units: preference.units, location: preference.location, notifications: preference.notifications });
    }
  };

  /**
   * handleApplyPreference function that applies the selected preference.
   */
  const handleApplyPreference = () => {
    if (selectedPreference) {
      // Call the onLocationUpdate callback function with the selected preference's location
      onLocationUpdate(selectedPreference.location);
    } else {
      console.log('No preference selected');
    }
  };

  // Render the user preferences component
  return (
    <div>
      <button onClick={handleTogglePreferences} className='toggle-preferences-button'>Toggle Preferences</button>
      <div className={`user-preferences-container ${showPreferences? 'how' : ''}`}>
        <h2>User Preferences</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreatePreference();
        }}>
          {/* Form fields for creating a new preference */}
          <div className="form-group">
            <label>Units:</label>
            <select value={newPreference.units} onChange={(event) => setNewPreference({...newPreference, units: event.target.value })}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input type="text" value={newPreference.location} onChange={(event) => setNewPreference({...newPreference, location: event.target.value })} />
          </div>

          <div className="form-group">
            <label>Notifications:</label>
            <input type="checkbox" checked={newPreference.notifications} onChange={(event) => setNewPreference({...newPreference, notifications: event.target.checked })} />
          </div>

          <button type="submit" className="create-button">Create Preference</button>

          {selectedPreference && (
            <div>
              {/* Form fields for updating an existing preference */}
              <div className="form-group">
                <label>Units:</label>
                <select value={updatedPreference?.units || selectedPreference.units} onChange={(event) => setUpdatedPreference({...updatedPreference, units: event.target.value })}>
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input type="text" value={updatedPreference?.location || selectedPreference.location} onChange={(event) => setUpdatedPreference({...updatedPreference, location: event.target.value })} />
              </div>

              <div className="form-group">
                <label>Notifications:</label>
                <input type="checkbox" checked={updatedPreference?.notifications || selectedPreference.notifications} onChange={(event) => setUpdatedPreference({...updatedPreference, notifications: event.target.checked })} />
              </div>

              <button type="button" onClick={handleUpdatePreference} className="update-button">Update Preference</button>
              <button type="button" onClick={handleDeletePreference} className="delete-button">Delete Preference</button>
              <button type="button" onClick={handleApplyPreference} className="apply-button">Apply Preference</button>
            </div>
          )}
        </form>
        <div className="preferences-list">
          {/* List of existing preferences */}
          {preferences.map(preference => (
            <button key={preference.id} onClick={() => handleSelectPreference(preference)}>{preference.location}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export the UserPreferences component as the default export
export default UserPreferences;