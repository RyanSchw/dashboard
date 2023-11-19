import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../config';

import WeatherMessage from '../../../types/WeatherMessage';
import WeatherFourTimeMessage, { HourlyWeatherData } from '../../../types/WeatherFourTimeMessage';
import WeatherDataType from '../../../types/WeatherDataType';
import Message from '../../../types/Message';
import { filterMessage } from '../utils/filterMessage';
import { getTimeEpoch, calculateScreenFriendlyTime } from '../utils/timeCalculator';
import { screenTemperature } from '../utils/formatter';
import { Box, Table, TableBody, TableCell, TableRow, ThemeContext } from 'grommet';

const TIMES = [7, 11, 16, 18];

// Remove unnecessary padding in each cell
const table_theme_fix = {
    table: {
        body: {
            pad: { horizontal: '6px', vertical: '0px' }
        }
    }
}

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
            fourTimeTimes: TIMES.map(getTimeEpoch) as [number, number, number, number],
        };
        sendJsonMessage(message);
    }

    return (
        <>
            <Box gridArea='weather'>
                <ThemeContext.Extend value={table_theme_fix}>
                    <Table style={{ height: '100%' }}>
                        <TableBody>
                            {hourlyWeatherData.map((data, i) => (
                                <TableRow>
                                    <TableCell border='bottom'>
                                        {calculateScreenFriendlyTime(TIMES[i])}
                                    </TableCell>
                                    <TableCell border='bottom' colSpan={2}>
                                        {screenTemperature(data[WeatherDataType.TEMPERATURE])}
                                    </TableCell>
                                    <TableCell border='bottom'>
                                        <img src={`https://openweathermap.org/img/wn/${data[WeatherDataType.ICON] || '01n'}@2x.png`} width='32px' height='32px' />
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={1} align='center'>
                                    <img src={`https://openweathermap.org/img/wn/01n@2x.png`} width='36px' height='36px' />
                                </TableCell>
                                <TableCell colSpan={3} align='center'>
                                    AQI TBD
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ThemeContext.Extend>
            </Box>
        </>
    );
}

export default WeatherApp;
