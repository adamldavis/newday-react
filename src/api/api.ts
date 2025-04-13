import { Data, Repository } from './types';

const KEY = "newday_root";

const api: Repository = {
    get: () => {
        const raw = localStorage.getItem(KEY);
        if (raw === null) {
            return Promise.resolve({});
        }
        return Promise.resolve(JSON.parse(raw));
    },
    save: async (data: Data) => {
        localStorage.setItem(KEY, JSON.stringify(data));
    },
};

export default api;
