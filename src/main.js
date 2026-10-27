import * as memory from "./modules/memory/memory.js";
import * as test from "./modules/test/test.js";
import * as log from "./modules/log/log.js";
import * as ui from "./modules/ui/ui.js";

function createUUID() {
    return crypto.randomUUID();
}
async function init() {
    await memory.getToMap();
    await ui.renderAll(memory.readAll());
}
async function Add(data) {
    const UUID = createUUID();
    await memory.upsert(UUID, data);
    ui.renderOne(memory.readOne(UUID));
}
async function Del(UUID) {
    await memory.removeOne(UUID);
    ui.removeOne(UUID);
}
async function Edit(UUID) {
    const data = memory.readOne(UUID);
    ui.moveToInputs(data);
}
async function CancelEdit(UUID) {
    const data = memory.readOne(UUID);
    ui.CancelEdit(data);
}
async function done(UUID) {
    const data = ui.done(UUID);
    await memory.upsert(UUID, data);
}
await init();
ui.initUI({
    Add: Add,
    Del: Del,
    Edit: Edit,
    Cancel: CancelEdit,
    Done: done,
});
