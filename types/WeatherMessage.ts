import Message from './Message';

export default interface WeatherMessage extends Message {
    type: 'WeatherMessage';

    fourTimeTimes: [number, number, number, number];
}
