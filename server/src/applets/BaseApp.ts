import { clientManager } from '../server';
import ClientManager from '../../types/ClientManager';

export default class BaseApp {
    clientManager: ClientManager;

    constructor() {
        this.clientManager = clientManager;
    }

    request() {

    }
}
