import { createSelect } from "./components/select.js";
import { createRecord } from "./components/record.js";
const selects = {};
const tbody = document.querySelector("table tbody");
const brandSelectCell = document.querySelector("#brand-select-cell");

export function initSelects([brandDB, modelDB]) {
    selects.brandSelect = createSelect("input", "brand", brandDB);
    selects.modelSelect = createSelect("input", "model", modelDB);
    selects.brandSelect.setAttribute("name", "brand");
    brandSelectCell.replaceWith(selects.brandSelect);
}
export function showAll(allData) {
    for (let entry of allData) {
        tbody.appendChild(createRecord(entry, "text"));
    }
}

export function showOne(data) {
    const row = document.querySelector(`tbody tr[data-id="${data[0]}"]`);
    if (!row) {
        tbody.appendChild(createRecord(data, "text"));
    } else {
        row.replaceWith(createRecord(data, "text"));
    }
}

export function removeRow(UUID) {
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    tbody.removeChild(row);
}

export function createCustomSelect(value, modelDB, target, role) {
    const result = createSelect(role, "model", modelDB, value);
    result.setAttribute("name", "model");
    if (role === "edit") result.setAttribute("form", "edit-form");
    target.replaceWith(result);
    return result;
}

export function edit(DT = [], DBS) {
    const [UUID, data] = DT;
    const [brandDB, modelDB] = DBS;
    const brandSel = createSelect("edit", "brand", brandDB);
    const modelSel = createSelect("edit", "model", modelDB);
    brandSel.setAttribute("form", "edit-form");
    modelSel.setAttribute("form", "edit-form");
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    const newRow = createRecord(DT, "input", [brandSel, modelSel]);
    row.replaceWith(newRow);
}
