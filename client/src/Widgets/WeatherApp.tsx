import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../config';

import WeatherMessage from '../../../types/WeatherMessage';
import { filterMessage } from '../utils/filterMessage';

function WeatherApp() {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: (message) => filterMessage(message, 'WeatherMessage'),
    });
    const [dataPoint1, setDataPoint1] = React.useState(0);

    useEffect(() => {
        if (lastJsonMessage) {
            const data = lastJsonMessage as WeatherMessage;
            setDataPoint1(data.dataPoint1);
        }
    }, [lastJsonMessage]);

    return (
        <div>
            from websocket - {dataPoint1}
        </div>
    );
}

export default WeatherApp;
