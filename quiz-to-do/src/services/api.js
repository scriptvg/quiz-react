// Base URL for all API requests
const BASE_URL = 'http://localhost:3001';

/**
 * Wrapper function for fetch API calls
 * Adds common headers and error handling
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise} Response data in JSON format
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * API utility object providing methods for HTTP requests
 * Includes methods for GET, POST, PUT, and DELETE operations
 */
export const api = {
  get: (endpoint) => fetchWithAuth(endpoint),
  post: (endpoint, data) => fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => fetchWithAuth(endpoint, {
    method: 'DELETE',
  }),
};