export function createInputField(role = "", key = "", value) {
    const inputField = document.createElement("input");
    inputField.classList.add("input-field");
    inputField.setAttribute("id", `${role}-${key}`);
    inputField.setAttribute("type", "number");
    inputField.setAttribute("required", "");
    if (role === "edit") {
        inputField.classList.add("edit-td");
        inputField.setAttribute("form", "edit-form");
        inputField.setAttribute("value", value);
    }
    return inputField;
}
