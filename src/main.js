import * as memory from "./modules/memory/memory.js";
import * as test from "./modules/test/test.js";
import * as ui from "./modules/ui/ui.js";

const logicFunctions = {
    Add: Add,
    Del: Del,
    Edit: Edit,
    Cancel: CancelEdit,
    customModel: createCustomModelSelect,
};

function createUUID() {
    return crypto.randomUUID();
}

async function init() {
    const DBS = await memory.initMemory();
    const allData = await memory.readAll();
    ui.initUI(logicFunctions, allData, DBS);
}

async function Add(data, UUID) {
    if (!UUID) {
        UUID = createUUID();
    }
    await memory.upsert(UUID, data);
    ui.renderOne(memory.readOne(UUID));
}

async function Del(UUID) {
    await memory.removeOne(UUID);
    ui.removeOne(UUID);
}

async function Edit(UUID) {
    const data = memory.readOne(UUID);
    const brandDB = await memory.getDataBase("brandDB");
    const modelsDB = await memory.getDataBase("modelDB");
    const modelDB =
        modelsDB.find((element) => {
            return element.hasOwnProperty(data[1].brand);
        })?.[data[1].brand] ?? [];
    ui.convertToEditMode(data, [brandDB, modelDB]);
}

async function createCustomModelSelect(value, target, role) {
    const modelsDB = await memory.getDataBase("modelDB");
    const modelDB =
        modelsDB.find((element) => {
            return element.hasOwnProperty(value);
        })?.[value] ?? [];
    return ui.createCustomModelSel(value, modelDB, target, role);
}

async function CancelEdit(UUID) {
    const data = memory.readOne(UUID);
    ui.renderOne(data);
}

await init();
