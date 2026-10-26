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
