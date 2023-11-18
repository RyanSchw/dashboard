import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../config';

import WeatherMessage from '../../../types/WeatherMessage';
import WeatherFourTimeMessage, { HourlyWeatherData } from '../../../types/WeatherFourTimeMessage';
import WeatherDataType from '../../../types/WeatherDataType';
import Message from '../../../types/Message';
import { filterMessage } from '../utils/filterMessage';
import { getTimeUTC } from '../utils/timeCalculator';
import { Box } from 'grommet';

function WeatherApp() {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: (message) => filterMessage(message, ['WeatherFourTimeMessage', 'WeatherAirQualityMessage']),
    });
    const [hourlyWeatherData, setHourlyWeatherData] = React.useState<HourlyWeatherData[]>([]);

    useEffect(() => {
        if (lastJsonMessage && (lastJsonMessage as Message).type === 'WeatherFourTimeMessage') {
            const data = lastJsonMessage as WeatherFourTimeMessage;
            setHourlyWeatherData(data.weatherAtTimes);
        }
    }, [lastJsonMessage]);

    // first time loading the widget, request a sync from the server
    useEffect(() => {
        getFourTimeWeather();
    }, []);

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
            <Box gridArea='weather'>
                {hourlyWeatherData.map((data, i) => (
                    <div key={i}>
                        <p>
                            {data[WeatherDataType.TEMPERATURE]}
                            <img src={`https://openweathermap.org/img/wn/${data[WeatherDataType.ICON]}@2x.png`} />
                        </p>
                    </div>
                ))}
            </Box>
        </>
    );
}

export default WeatherApp;
