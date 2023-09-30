import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../config';

import WeatherMessage from '../../../types/WeatherMessage';
import WeatherFourTimeMessage from '../../../types/WeatherFourTimeMessage';
import { filterMessage } from '../utils/filterMessage';
import { getTimeUTC } from '../utils/timeCalculator';

function WeatherApp() {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: (message) => filterMessage(message, ['WeatherFourTimeMessage', 'WeatherAirQualityMessage']),
    });

    function getFourTimeWeather() {
        const message: WeatherMessage = {
            type: 'WeatherMessage',
            requestId: 'daxdfew',
            command: 'sync',
            fourTimeTimes: [getTimeUTC(7), getTimeUTC(11), getTimeUTC(16), getTimeUTC(18)],
        };
        sendJsonMessage(message);
    }

    return (
        <>
            <button onClick={getFourTimeWeather}>click me :)</button>
            <div>
                from websocket - {JSON.stringify(lastJsonMessage)}
            </div>
        </>
    );
}

export default WeatherApp;
