const API_URL = 'http://localhost:5000/api';

export const fetchAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID: ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
