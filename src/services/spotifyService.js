import axios from 'axios';

const API_URL = 'https://api.spotify.com/v1';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const _getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token;
};

export const searchSongs = async (query) => {
  try {
    // Wait for the access token to be fetched
    const API_TOKEN = await _getToken();
    console.log('Spotify Access Token:', API_TOKEN);

    // Make the API request with the correct token
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query, type: 'track' },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
