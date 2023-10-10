import { WEATHER_APP } from '../config';
import BaseApp from './BaseApp';

import WeatherFourTimeMessage from '../../../types/WeatherFourTimeMessage';
import WeatherDataType from '../../../types/WeatherDataType';

// these classes handle all the API connections related to Weather. Automations and handling the messages are handled in the respective folders
export default class WeatherApp extends BaseApp {
    BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
    BASE_PARAMS = {
        'lat': WEATHER_APP.LOCATIONS[0].LAT,
        'lon': WEATHER_APP.LOCATIONS[0].LON,
        'appid': WEATHER_APP.API_KEY,
        'units': 'imperial',
    }

    constructor() {
        super()
    }

    async getWeatherData(categoriesToInclude: WeatherCategory[]) {
        // exclude the categories we aren't using so the size of the data is not as large
        // be aware this method only works for String enums https://stackoverflow.com/a/65285392
        const allCategories = Object.values(WeatherCategory);
        const categoriesToExclude = allCategories.filter(category => !categoriesToInclude.includes(category));
        const params = { ...this.BASE_PARAMS, 'exclude': categoriesToExclude.join(',') };

        const response = await this.request.get(this.BASE_URL, { params });
        return response.data;
    }
    
    getWeatherDataFromDataType(data: any, dataType: WeatherDataType) {
        // mapping between WeatherDataType and the API key is necessary in case we switch API providers later
        // this way, we can keep the client/server communications the same
        switch(dataType) {
            case WeatherDataType.DATETIME:
                return data.dt;
            case WeatherDataType.TEMPERATURE:
                return data.temp;
            case WeatherDataType.ICON:
                return data.weather[0].icon;
            default:
                throw new Error('Invalid WeatherDataType');
        }
    }

    async getCurrentWeather() {
        const data = await this.getWeatherData([WeatherCategory.CURRENT]);
        const currentData = data[WeatherCategory.CURRENT];

        return currentData;
    }

    async getFourTimeWeather(hours: [number, number, number, number]): Promise<WeatherFourTimeMessage> {
        const data = await this.getWeatherData([WeatherCategory.HOURLY]);
        const hourlyData = data[WeatherCategory.HOURLY];

        const formattedHourlyData = hours.map(hour => {
            const dataForHour = hourlyData.find(dataPoint => dataPoint.dt === hour);
            if (dataForHour === undefined) {
                return {
                    [WeatherDataType.TEMPERATURE]: -1,
                    [WeatherDataType.ICON]: '',
                };
            } else {
                return {
                    [WeatherDataType.TEMPERATURE]: this.getWeatherDataFromDataType(dataForHour, WeatherDataType.TEMPERATURE),
                    [WeatherDataType.ICON]: this.getWeatherDataFromDataType(dataForHour, WeatherDataType.ICON),
                };
            }
        });

        if (formattedHourlyData.length !== 4) {
            throw new Error(`Invalid number of hours, expected 4 but got ${formattedHourlyData.length}`);
        }
        
        // create the message
        const message: WeatherFourTimeMessage = {
            type: 'WeatherFourTimeMessage',
            requestId: 'blankfornow',
            // @ts-ignore we check the data length above but TS doesn't see that
            weatherAtTimes: formattedHourlyData,
        }

        return message;
    }
}

enum WeatherCategory {
    CURRENT = 'current',
    MINUTELY = 'minutely',
    HOURLY = 'hourly',
    DAILY = 'daily',
    ALERTS = 'alerts',
}
