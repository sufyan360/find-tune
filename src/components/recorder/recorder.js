import React, { useState, useEffect } from 'react';
import { searchSongs } from '../../services/spotifyService';
import './recorder.css';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [songs, setSongs] = useState([]);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    console.log('Effect ran');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('This browser does not support the Web Speech API');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = true;
    newRecognition.interimResults = false;
    newRecognition.lang = 'en-US';

    newRecognition.onresult = async (event) => {
      console.log('Speech recognition result received');
      console.log('Event:', event);

      if (event.results.length > 0) {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log('Transcript:', transcript);

        try {
          const songResults = await searchSongs(transcript);
          console.log('Song Results:', songResults);
          setSongs(songResults);
        } catch (error) {
          console.error('Error searching songs:', error);
        }
      }
    };

    newRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      newRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          console.warn('No speech detected. Please try speaking again.');
          recognition.start();
        }
      };
    };

    setRecognition(newRecognition);

    return () => {
      if (newRecognition) {
        console.log('Stopping recognition on cleanup');
        newRecognition.stop();
      }
      setRecognition(null);
    };
  }, []);

  const handleRecord = () => {
    if (!recognition) {
      console.error('Speech recognition is not initialized.');
      return;
    }

    if (isRecording) {
      console.log('Stopping speech recognition');
      recognition.stop();
    } else {
      console.log('Starting speech recognition');
      recognition.start();
    }

    setIsRecording(!isRecording);
  };

  return (
    <div className="recorder">
      <button onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Record'}
      </button>
      {songs.length > 0 && (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id} className="song-item">
              <img src={song.album.images[0]?.url} alt={`${song.name} album art`} className="album-art" />
              <div className="song-details">
                <strong>{song.name}</strong>
                <p>Artist: {song.artists.map((artist) => artist.name).join(', ')}</p>
                <p>Album: {song.album.name}</p>
                {song.preview_url && (
                  <audio controls>
                    <source src={song.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recorder;
