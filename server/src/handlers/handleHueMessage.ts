import { hueApp } from '../server';
import ServerMessage from '../../types/ServerMessage';
import HueMessage from '../../../types/HueMessage';
import { HUE_APP } from '../config';

export default function handleHueMessage(message: ServerMessage) {
    const hueMessage = message.message as HueMessage;

    hueApp.setLightState(HUE_APP.LIGHT_1, hueMessage.light1Brightness);


    message.respond('wassup');
}
