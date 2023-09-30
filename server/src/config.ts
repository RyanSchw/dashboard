export const IS_DEV_MODE = process.env.ENVIRONMENT === 'dev';

export const WEATHER_APP = {
    API_KEY: process.env.WEATHER_API_KEY,
    LOCATIONS: [{
        LAT: process.env.WEATHER_LOCATION_LAT,
        LON: process.env.WEATHER_LOCATION_LON,
    }]
};

export const HUE_APP = {
    BRIDGE_IP: process.env.HUE_BRIDGE_IP,
    APPLICATION_KEY: process.env.HUE_APPLICATION_KEY,

    LIGHT_1: process.env.HUE_LIGHT_1,
};
