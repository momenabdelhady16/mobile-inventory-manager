const local = window.localStorage;
export const storage = {
    async set(key, value) {
        local.setItem(key, value);
    },
    async get(key) {
        return local.getItem(key);
    },
    async remove(key) {
        local.removeItem(key);
    },
    async keys() {
        return Object.keys(local);
    },
};
export const DB = {
    async getDB(DBName) {
        return local.getItem(DBName);
    },
    async setDB(DBName, value) {
        if (!local.getItem(DBName)) {
            local.setItem(DBName, value);
        }
    },
    async removeDB(DBName) {
        local.removeItem(DBName);
    },
};
