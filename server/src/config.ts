export const IS_DEV_MODE = process.env.ENVIRONMENT === 'dev';

export const HUE_APP = {
    BRIDGE_IP: process.env.HUE_BRIDGE_IP,
    APPLICATION_KEY: process.env.HUE_APPLICATION_KEY,

    LIGHT_1: process.env.HUE_LIGHT_1,
};
