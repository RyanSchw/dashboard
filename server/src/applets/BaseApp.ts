import { clientManager } from '../server';
import ClientManager from '../../types/ClientManager';
import axios, { AxiosRequestConfig } from 'axios';

export default class BaseApp {
    clientManager: ClientManager;

    constructor() {
        this.clientManager = clientManager;
    }

    request = {
        get: async (url: string, config: AxiosRequestConfig) => {
            return await axios.get(url, config)
        },
        post: async (url: string, config: AxiosRequestConfig) => {
            return await axios.post(url, config)
        },
        put: async (url: string, config: AxiosRequestConfig) => {
            return await axios.put(url, config)
        },
        delete: async (url: string, config: AxiosRequestConfig) => {
            return await axios.delete(url, config)
        },
    }
}
