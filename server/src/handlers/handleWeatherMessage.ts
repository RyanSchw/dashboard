import { weatherApp } from '../server';
import ServerMessage from '../../types/ServerMessage';
import WeatherMessage from '../../../types/WeatherMessage';
import WeatherFourTimeMessage from '../../../types/WeatherFourTimeMessage';

export default async function handleWeatherMessage(message: ServerMessage) {
    const weatherMessage = message.message as WeatherMessage;

    switch (weatherMessage.command) {
        case 'sync':
            if (weatherMessage.fourTimeTimes !== undefined) {
                const weatherData = await weatherApp.getFourTimeWeather(weatherMessage.fourTimeTimes);
                message.respond(weatherData);
            }
            break;
    }
}
