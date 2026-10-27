import * as domEV from "./domEvents.js";
import * as render from "./domRendrer.js";
export function initUI({ Add, Del, Edit, Cancel, Done }) {
    domEV.initEvents({ Add, Del, Edit, Cancel, Done });
}
export async function renderAll(data) {
    await render.showAll(data);
}
export function renderOne(data) {
    render.showOne(data);
}
export function removeOne(UUID) {
    render.removeRow(UUID);
}
export function moveToInputs(data) {
    render.edit(data);
}
export function CancelEdit(data) {
    render.CancelEdit(data);
}
export function done(UUID) {
    return render.done(UUID);
}
