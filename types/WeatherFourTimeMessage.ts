import Message from './Message';
import WeatherDataType from './WeatherDataType';

export default interface WeatherFourTimeMessage extends Message {
    type: 'WeatherFourTimeMessage';

    weatherAtTimes: [HourlyWeatherData, HourlyWeatherData, HourlyWeatherData, HourlyWeatherData];
}

export interface HourlyWeatherData {
    [WeatherDataType.TEMPERATURE]: number;
    [WeatherDataType.ICON]: string;
}
