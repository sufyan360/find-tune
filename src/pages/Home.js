import React from 'react';
import Recorder from '../components/recorder/recorder';
//import Header from '../components/header/header';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* No need to include Header here if it’s already in App.js */}
      <Recorder />
    </div>
  );
}

export default Home;
