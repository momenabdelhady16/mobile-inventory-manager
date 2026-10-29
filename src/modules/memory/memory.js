import { storage } from "./storage.js";
import { DB } from "./storage.js";

const randomMemory = new Map();
const PREFIX = "mob-inv:";
const PREFIXDB = "DB:mob-inv:";
const PREFIX_LENGTH = PREFIX.length;
const storageKeys = [];
const corrupted = [];

const brandDB = [
    "Apple",
    "Samsung",
    "Google",
    "Xiaomi",
    "Huawei",
    "OnePlus",
    "Oppo",
];
const modelDB = [
    {
        Apple: [
            "Iphone 17",
            "Iphone 17 Pro",
            "Iphone 17 Pro Max",
            "Iphone 18 Pro",
            "Iphone 18 Pro Max",
        ],
    },
    {
        Samsung: [
            "S22 Ultra",
            "S23 Ultra",
            "S24 Ultra",
            "S25 Ultra",
            "S26 Ultra",
        ],
    },
    {
        Google: [
            "Pixel 8 Pro",
            "Pixel 9 Pro",
            "Pixel 9 Pro XL",
            "Pixel 10 Pro",
            "Pixel 10 Pro XL",
        ],
    },
    { Xiaomi: ["13 Ultra", "14", "14 Ultra", "15", "15 Ultra"] },
    {
        Huawei: [
            "P60 Pro",
            "Mate 60 Pro",
            "Pura 70 Ultra",
            "Mate 70 Pro",
            "Pura 80 Ultra",
        ],
    },
    { OnePlus: ["10 Pro", "11", "12", "13", "15"] },
    {
        Oppo: [
            "Find X6 Pro",
            "Find X7 Ultra",
            "Find X8",
            "Find X8 Pro",
            "Find X8 Ultra",
        ],
    },
];

export async function initMemory() {
    await getToMap();
    await DB.removeDB(`${PREFIXDB}brandDB`);
    await DB.removeDB(`${PREFIXDB}modelDB`);
    await setDataBase("brandDB", brandDB);
    await setDataBase("modelDB", modelDB);
    return [await getDataBase("brandDB"), await getDataBase("modelDB")];
}

export async function getDataBase(DBName) {
    const dataBase = JSON.parse(await DB.getDB(`${PREFIXDB}${DBName}`));
    return dataBase;
}

export async function setDataBase(DBName, DBValue) {
    await DB.setDB(`${PREFIXDB}${DBName}`, JSON.stringify(DBValue));
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
async function updateStorage(ID, Data) {
    await storage.set(`${PREFIX}${ID}`, JSON.stringify(Data));
}

export async function upsert(ID, Data) {
    const record = { ...Data };
    await updateStorage(ID, record);
    randomMemory.set(ID, record);
}

export async function readAll() {
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
