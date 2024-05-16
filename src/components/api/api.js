const API_BASE_URL = 'https://your-api-url.com';

export async function fetchUserPreferences() {
  try {
    const response = await fetch(`${API_BASE_URL}/user-preferences`);
    if (!response.ok) {
      throw new Error('Error fetching user preferences');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
}

export async function createUserPreference(newPreference) {
  try {
    const response = await fetch(`${API_BASE_URL}/user-preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPreference),
    });
    if (!response.ok) {
      throw new Error('Error creating user preference');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user preference:', error);
    throw error;
  }
}

export async function updateUserPreference(id, updatedPreference) {
  try {
    const response = await fetch(`${API_BASE_URL}/user-preferences/${id}`, {
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

export async function deleteUserPreference(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/user-preferences/${id}`, {
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