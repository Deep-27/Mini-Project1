import axios from 'axios';

const userService = {
  // Fetch all users
  getAllUsers: async () => {
    try {
      const response = await axios.get('/api/users');
      return response.data; // Assuming the backend returns an array of users
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Fetch user by ID
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data; // Assuming the backend returns user data
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, userData);
      return response.data; // Assuming the backend returns updated user data
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      return response.data; // Assuming the backend returns a success message
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default userService;
