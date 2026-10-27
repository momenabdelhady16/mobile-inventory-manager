const tbody = document.querySelector("table tbody");
const tr = document.createElement("tr");
tr.classList.add("tbody__row");
tr.dataset.id = "";
const td = document.createElement("td");
td.classList.add("record-td");
const button = document.createElement("button");

const inputField = document.createElement("input");
inputField.classList.add("input-field", "edit-td");
inputField.setAttribute("form", "edit-form");
inputField.setAttribute("type", "");
inputField.setAttribute("value", "");

const option = document.createElement("option");
const select = `
                        <select
                            class="input-field edit-td"
                            name="release-year"
                            id="release-year"
                            required
                            form="edit-form"
                        >
                            <option value="" disabled>
                                Choose Year
                            </option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>`;
const editSvg = `   <button class="edit-button table-button" type="button" aria-label="Edit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>
                        </svg>
                    </button>`;
const doneSvg = `   <button class="done-button table-button" type="button" aria-label="Edit" type="submit" form="edit-form">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19L21 7l-1.4-1.4z" />
                        </svg>

                    </button>`;
const deleteSvg = `
                    <button class="delete-button table-button" type="button" aria-label="Delete">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M3 6h18"/>
                            <path d="M8 6V4h8v2"/>
                            <path d="m19 6-1 14H6L5 6"/>
                            <path d="M10 11v5"/>
                            <path d="M14 11v5"/>
                        </svg>
                    </button>
`;
const cancelSvg = `
                    <button
                        class="cancel-button table-button"
                        type="button"
                        aria-label="cancel"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 1024 1024"
                        >
                            <path d="M0 0h1024v1024H0z" fill="none" />
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.1.1 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.12.12 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.1.1 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926L224.297 857.629c-.04.041-.06.052-.083.059a.12.12 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.1.1 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512L166.371 224.297c-.041-.04-.052-.06-.059-.083a.12.12 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.1.1 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.12.12 0 0 1 .07 0Z"
                            />
                        </svg>
                    </button>
`;

function createRecord(uuid, data) {
    const record = tr.cloneNode(true);
    record.dataset.id = uuid;
    for (let elm of Object.keys(data)) {
        let tab = td.cloneNode(true);
        tab.appendChild(document.createTextNode(`${data[elm]}`));
        record.appendChild(tab);
    }
    const tdBTN = document.createElement("td");
    tdBTN.classList.add("row-buttons");
    tdBTN.innerHTML = `
    ${editSvg}
    ${deleteSvg}`;
    record.appendChild(tdBTN);
    return record;
}
export async function showAll(data) {
    for (let entry of data) {
        tbody.appendChild(createRecord(...entry));
    }
}
export function showOne(data) {
    tbody.appendChild(createRecord(data[0], data[1]));
}
export function removeRow(UUID) {
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    tbody.removeChild(row);
}
export function edit(DT = []) {
    const [UUID, data] = DT;
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    const tds = [...row.children];
    for (let el of tds) {
        if (el.classList.contains("record-td")) {
            el.innerHTML = "";
        }
    }
    const MAX = Object.keys(data).length;
    for (let i = 0; i < MAX; i++) {
        if (!tds[i].classList.contains("record-td")) continue;
        tds[i].classList.toggle("record-td");
        if (Object.keys(data)[i] === "releaseYear") {
            tds[i].innerHTML = select;
            const option = tds[i].querySelector(
                `td select option[value="${Object.values(data)[i]}"]`,
            );
            option.setAttribute("selected", "");
        } else {
            const field = inputField.cloneNode(true);
            field.setAttribute("value", Object.values(data)[i]);
            if (isFinite(Object.values(data)[i])) {
                field.type = "number";
            } else field.type = "text";
            tds[i].appendChild(field);
        }
    }
    tds[MAX].innerHTML = "";
    tds[MAX].innerHTML += doneSvg;
    tds[MAX].innerHTML += cancelSvg;
}
export function CancelEdit(DT) {
    const [UUID, data] = DT;
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    row.innerHTML = "";
    const newRecord = createRecord(UUID, data);
    for (let child of [...newRecord.children]) {
        row.appendChild(child);
    }
}
export function done(UUID) {
    const row = document.querySelector(`tbody tr[data-id="${UUID}"]`);
    const tds = [...row.children];
    const inputs = tds.map((child) => [...child.children]).flat();
    const data = {
        brand: inputs[0].value,
        model: inputs[1].value,
        releaseYear: inputs[2].selectedOptions[0].value,
        price: inputs[3].value,
        quantity: inputs[4].value,
    };
    console.log(data);
    row.innerHTML = "";
    const newRecord = createRecord(UUID, data);
    for (let child of [...newRecord.children]) {
        row.appendChild(child);
    }
    return data;
}
