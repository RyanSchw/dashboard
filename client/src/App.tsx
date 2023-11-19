import React from 'react';
import useWebSocket from 'react-use-websocket';
import { Box, Button, Grommet, Text, Toolbar } from 'grommet';
import { SettingsOption } from 'grommet-icons';
import { WS_URL } from './config';

import Scene1 from './Scenes/Scene1';
import Scene2 from './Scenes/Scene2';
import DateTimeHeader from './components/DateTimeHeader';
import { LIGHT_THEME } from './theme';

// import './App.css';

function App() {
    useWebSocket(WS_URL, {
        share: true,
        onOpen: () => {
            console.log('WebSocket connection established.');
        }
    });

    return (
        <Grommet full theme={LIGHT_THEME}>
            <Scene2 />
        </Grommet>
    );
}

export default App;
