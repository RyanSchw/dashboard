import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../config';

import HueMessage from '../../../types/HueMessage';
import { filterMessage } from '../utils/filterMessage';

function HueApp() {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: (message) => filterMessage(message, ['HueMessage']),
    });
    const [dataPoint1, setDataPoint1] = React.useState(0);

    useEffect(() => {
        if (lastJsonMessage) {
            const data = lastJsonMessage as HueMessage;
            setDataPoint1(data.light1Brightness);
        }
    }, [lastJsonMessage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataPoint1(Number(event.target.value));
        const message: HueMessage = {
            type: 'HueMessage',
            requestId: '123',
            light1Brightness: Number(event.target.value),
        }
        sendJsonMessage(message);
    };

    return (
        <div>
            from websocket - {dataPoint1}

            <input 
                type="number"
                value={dataPoint1}
                onChange={handleChange} 
            />
        </div>
    );
}

export default HueApp;
