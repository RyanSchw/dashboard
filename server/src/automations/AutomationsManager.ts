import ClientManager from '../../types/ClientManager';

import { weatherAutomation1 } from './weatherAutomations';

export default class AutomationsManager {
    readonly clientManager: ClientManager;
    automations: Array<NodeJS.Timer> = [];

    constructor(clientManager: ClientManager) {
        this.clientManager = clientManager;

        // add new automations here
        this.addAutomation(weatherAutomation1, 10);
    }

    addAutomation(functionToAdd: (clientManager: ClientManager) => void, timeInSeconds: number) {
        this.automations = [...this.automations, setInterval(() => functionToAdd(this.clientManager), timeInSeconds * 1000)];
    }
}
