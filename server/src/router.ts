// Takes in new web socket messages and routes it to the appropriate handler
import ServerMessage from '../types/ServerMessage';

import handleWeatherMessage from './handlers/handleWeatherMessage';

export default function handleMessage(serverMessage: ServerMessage) {
    switch (serverMessage.type) {
        case 'WeatherMessage':
            handleWeatherMessage(serverMessage);
            break;    
        default:
            throw new Error(`Error handling message of type ${serverMessage.type}: no handler defined`);
    }
}
