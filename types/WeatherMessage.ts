import Message from './Message';

export default class WeatherMessage extends Message {
    someparamtosend: string;
    someotherparam: string;

    constructor(a: string, b: string) {
        super('WeatherMessage');

        this.someparamtosend = a;
        this.someotherparam = b;
    }
}
