import { createInputField } from "./inputField.js";
import * as select from "./select.js";

const editButton = document.querySelector("#edit-template");
const doneButton = document.querySelector("#done-template");
const cancelButton = document.querySelector("#cancel-template");
const deleteButton = document.querySelector("#delete-template");
const td = document.createElement("td");
td.classList.add("record-td");

export function createRecord(data, format, selects) {
    const [UUID, values] = data;
    const record = document.createElement("tr");
    record.classList.add("tbody__row");
    record.dataset.id = UUID;
    if (format === "text") fillWithText(record, values);
    else if (format === "input") fillWithInputs(record, values, selects);
    return record;
}
function fillWithText(record, data) {
    const dataValues = Object.values(data);
    const numOfDataKeys = dataValues.length;
    for (let i = 0; i < numOfDataKeys; i++) {
        const cell = td.cloneNode(true);
        cell.appendChild(document.createTextNode(`${dataValues[i]}`));
        record.appendChild(cell);
    }
    addButtons(record, editButton, deleteButton);
}
function fillWithInputs(record, data, [brandSelect, modelSelect]) {
    for (const [key, value] of Object.entries(data)) {
        const cell = td.cloneNode(true);

        if (key === "brand") {
            const brandSel = select.setSelect(brandSelect, value);
            brandSel.setAttribute("name", key);
            cell.appendChild(brandSel);
        } else if (key === "model") {
            const modelSel = select.setSelect(modelSelect, value);
            modelSel.setAttribute("name", key);
            cell.appendChild(modelSel);
        } else {
            const inputField = createInputField("edit", key, value);
            inputField.setAttribute("name", key);
            cell.appendChild(inputField);
        }

        record.appendChild(cell);
    }
    addButtons(record, doneButton, cancelButton);
}
function addButtons(record, firstButton, secondButton) {
    const cellButtons = td.cloneNode(true);
    cellButtons.className = "row-buttons";
    cellButtons.appendChild(firstButton.content.cloneNode(true));
    cellButtons.appendChild(secondButton.content.cloneNode(true));
    record.appendChild(cellButtons);
}
