/**
 * Fetches user preferences from the server.
 *
 * @returns {Promise<object>} A promise that resolves to the user preferences data.
 */
export async function fetchUserPreferences() {
  try {
    const response = await fetch('http://localhost:3000/weather_app/userPreferences');
    if (!response.ok) {
      throw new Error('Error fetching user preferences');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
}

/**
 * Creates a new user preference on the server.
 *
 * @param {object} newPreference - The new user preference data.
 */
export async function createUserPreference(newPreference) {
  console.log('Creating new preference:', newPreference);
  try {
    const response = await fetch('http://localhost:3000/weather_app/userPreferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPreference),
    });
    if (!response.ok) {
      throw new Error('Error creating user preference');
    }
    const data = await response.json();
    console.log('New preference created with id:', data.id);
  } catch (error) {
    console.error('Error creating user preference:', error);
    throw error;
  }
}

/**
 * Updates an existing user preference on the server.
 *
 * @param {number} id - The ID of the user preference to update.
 * @param {object} updatedPreference - The updated user preference data.
 *
 * @returns {Promise<object>} A promise that resolves to the updated user preference data.
 */
export async function updateUserPreference(id, updatedPreference) {
  console.log('Updating preference with id:', id);
  try {
    const response = await fetch(`http://localhost:3000/weather_app/userPreferences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPreference),
    });
    if (!response.ok) {
      throw new Error('Error updating user preference');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user preference:', error);
    throw error;
  }
}

/**
 * Deletes a user preference from the server.
 *
 * @param {number} id - The ID of the user preference to delete.
 */
export async function deleteUserPreference(id) {
  console.log('Deleting preference with id:', id);
  try {
    const response = await fetch(`http://localhost:3000/weather_app/userPreferences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting user preference');
    }
  } catch (error) {
    console.error('Error deleting user preference:', error);
    throw error;
  }
}