import ClientManager from '../../types/ClientManager';
import WeatherMessage from '../../../types/WeatherMessage';

// send a weather message to the client every 30 seconds for testing
export function weatherAutomation1(clientManager: ClientManager) {
    const weatherMessage: WeatherMessage = {
        type: 'WeatherMessage',
        requestId: 'abcd'
    };

    clientManager.broadcastMessage(weatherMessage);
}
