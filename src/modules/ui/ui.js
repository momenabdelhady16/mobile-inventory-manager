import * as domEV from "./domEvents.js";
import * as render from "./domRendrer.js";

export function initUI(logic, allData, DBS) {
    render.showAll(allData);
    render.initSelects(DBS);
    domEV.initEvents(logic);
}

export function renderAll(allData) {
    render.showAll(allData);
}

export function renderOne(data) {
    render.showOne(data);
}

export function removeOne(UUID) {
    render.removeRow(UUID);
}

export function convertToEditMode(data, DBS) {
    render.edit(data, DBS);
}

export function createCustomModelSel(value, modelDB, target, role) {
    return render.createCustomSelect(value, modelDB, target, role);
}
