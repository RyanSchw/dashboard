import axios from 'axios';
import EventSource from 'eventsource';
import BaseApp from './BaseApp';

import { HUE_APP } from '../config';
import HueMessage from '../../../types/HueMessage';

// these classes handle all the API connections related to Hue. Automations and handling the messages are handled in the respective folders
export default class HueApp extends BaseApp {
    BASE_URL = `https://${HUE_APP.BRIDGE_IP}/clip/v2/resource`;
    HUE_APPLICATION_KEY = HUE_APP.APPLICATION_KEY;

    constructor() {
        super();
        const eventSource = new EventSource(`https://${HUE_APP.BRIDGE_IP}/eventstream/clip/v2`, {headers: {'hue-application-key': `${this.HUE_APPLICATION_KEY}`}, https: {rejectUnauthorized: false}});
        eventSource.addEventListener('message', (event) => {
            this.handleEventStreamMessage(event);
        });
        eventSource.onerror = function (err) {
            console.error(err);
        }
    }

    handleEventStreamMessage(event: any) {
        const data = JSON.parse(event.data);
        for (const message of data) {
            if (message.data[0].id == HUE_APP.LIGHT_1) {
                const hueMessage: HueMessage = {
                    type: 'HueMessage',
                    requestId: '235',
                    light1Brightness: Number(message.data[0].dimming.brightness),
                }
                this.clientManager.broadcastMessage(hueMessage);
            }
        }
    }

    setLightState(lightId: string, state: number) {
        const url = `${this.BASE_URL}/light/${lightId}`;
        axios.put(url, {
            dimming: {
                brightness: state
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'hue-application-key': `${this.HUE_APPLICATION_KEY}`
            }
        });
    }
}
