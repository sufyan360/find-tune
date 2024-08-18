import React, { useState } from 'react';
import { searchSongs } from '../../services/spotifyService';
import './recorder.css';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [songs, setSongs] = useState([]);

  const handleRecord = async () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      try {
        const query = 'your search query'; // Replace with actual query
        const songResults = await searchSongs(query);
        setSongs(songResults);
      } catch (error) {
        console.error('Error searching songs:', error);
      }
    }
  };

  return (
    <div className="recorder">
      <button onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Record'}
      </button>
      {songs.length > 0 && (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>{song.name} by {song.artists[0].name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recorder;
