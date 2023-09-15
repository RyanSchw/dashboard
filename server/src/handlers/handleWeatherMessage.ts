import ServerMessage from '../../types/ServerMessage';
import WeatherMessage from '../../../types/WeatherMessage';

export default function handleWeatherMessage(message: ServerMessage) {
    const weatherMessage = message.message as WeatherMessage;


    message.respond('wassup');
}
