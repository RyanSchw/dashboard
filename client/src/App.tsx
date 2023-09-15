import React from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from './config';

import Scene1 from './Scenes/Scene1';
import WeatherApp from './Widgets/WeatherApp';

// import './App.css';

function App() {
  useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <>
      <WeatherApp />
    </>
  );
}

export default App;
