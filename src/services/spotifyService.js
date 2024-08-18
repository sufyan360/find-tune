import axios from 'axios';

const API_URL = 'https://api.spotify.com/v1';

export const searchSongs = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query, type: 'track' },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
      }
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};
