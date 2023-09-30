import Message from './Message';
import WeatherDataType from './WeatherDataType';

export default interface WeatherFourTimeMessage extends Message {
    type: 'WeatherFourTimeMessage';

    time1: HourlyData;
    time2: HourlyData;
    time3: HourlyData;
    time4: HourlyData;
}

interface HourlyData {
    [WeatherDataType.TEMPERATURE]: number;
    [WeatherDataType.ICON]: string;
}
