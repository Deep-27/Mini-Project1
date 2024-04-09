import axios from 'axios';

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post('/api/register', userData);
      return response.data; // Assuming the backend returns user data upon successful registration
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      return response.data; // Assuming the backend returns user data and token upon successful login
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Logout user
  logout: async () => {
    // Perform logout operations if needed (e.g., clearing local storage, destroying tokens, etc.)
  },

  // Check if user is authenticated (e.g., token is valid)
  isAuthenticated: () => {
    // Check if there's a token stored in local storage or cookies
    // Return true if the token is valid, false otherwise
  }
};

export default authService;
