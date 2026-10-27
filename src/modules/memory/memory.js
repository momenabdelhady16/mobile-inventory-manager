import { storage } from "./storage.js";
const randomMemory = new Map();
const PREFIX = "mob-inv:";
const PREFIX_LENGTH = PREFIX.length;
const storageKeys = [];
const corrupted = [];
export async function upsert(ID, Data) {
    const record = { ...Data };
    await updateStorage(ID, record);
    randomMemory.set(ID, record);
}
async function updateStorage(ID, Data) {
    await storage.set(`${PREFIX}${ID}`, JSON.stringify(Data));
}
export async function getToMap() {
    const keys = (await storage.keys()).filter((key) => key.startsWith(PREFIX));
    for (let key of keys) {
        let data = await storage.get(key);
        key = key.slice(PREFIX_LENGTH);
        try {
            data = JSON.parse(data);
            randomMemory.set(key, data);
        } catch (error) {
            corrupted.push(key);
        }
    }
}
export function readAll() {
    return [...randomMemory.entries()].map(([id, phone]) => [id, { ...phone }]);
}
export function readOne(key) {
    return [key, { ...randomMemory.get(key) }];
}
export async function removeAll() {
    const keys = [...randomMemory.keys()];
    for (let key of keys) {
        await storage.remove(`${PREFIX}${key}`);
    }
    randomMemory.clear();
}
export async function removeOne(key) {
    await storage.remove(`${PREFIX}${key}`);
    randomMemory.delete(key);
}
export function getCorrupted() {
    return [...corrupted];
}
export async function keysFromMapAndStorage() {
    return [[...randomMemory.keys()], [...storageKeys]];
}
async function getKeysFromStorage() {
    storageKeys.length = 0;
    storageKeys.push(
        ...(await storage.keys())
            .filter((element) => element.startsWith(PREFIX))
            .map((element) => element.slice(PREFIX_LENGTH)),
    );
}
setInterval(getKeysFromStorage, 5000);
