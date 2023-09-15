import Message from './Message';

export default interface WeatherMessage extends Message {
    type: 'WeatherMessage';

    dataPoint1: number;
}
