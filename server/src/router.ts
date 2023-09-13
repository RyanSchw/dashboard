// Takes in new web socket messages and routes it to the appropriate handler
import Message from '../../types/Message';

import WeatherMessage from '../../types/WeatherMessage';
import handleWeatherMessage from './handlers/handleWeatherMessage';

export default function handleMessage(message: Message) {
    switch (message.type) {
        case 'WeatherMessage':
            handleWeatherMessage(message as WeatherMessage);
            break;    
        default:
            throw new Error(`Error handling message of type ${message.type}: no handler defined`);
    }
}
