export function createSelect(role = "", DBName = "", arrayOfValues = []) {
    const select = document.createElement("select");
    const option = document.createElement("option");
    select.setAttribute("id", `${role}-${DBName}`);
    select.classList.add("input-field");
    if (role === "edit") {
        select.classList.add(`edit-td`);
    }
    if (role === "input") {
        const opt = option.cloneNode(true);
        opt.setAttribute("disabled", "");
        opt.setAttribute("selected", "");
        opt.textContent = "Choose Option";
        select.appendChild(opt);
    }
    for (let element of arrayOfValues) {
        const opt = option.cloneNode(true);
        opt.setAttribute("value", element);
        opt.textContent = element;
        select.appendChild(opt);
    }
    return select;
}
export function setSelect(select, value) {
    for (const option of select.options) {
        option.selected = option.value === value;
    }
    return select;
}
