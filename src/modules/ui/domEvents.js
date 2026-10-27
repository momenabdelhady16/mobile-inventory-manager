const brand = document.querySelector("#form-field__brand");
const model = document.querySelector("#form-field__model");
const releaseYear = document.querySelector("#form-field__release-year");
const price = document.querySelector("#form-field__price");
const quantity = document.querySelector("#form-field__quantity");
const form = document.querySelector("#input-form");
const tbody = document.querySelector("table tbody");

export function initEvents({ Add, Del, Edit, Cancel, Done }) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
            brand: brand.value,
            model: model.value,
            releaseYear: releaseYear.value,
            price: price.value,
            quantity: quantity.value,
        };
        Add(data);
    });
    tbody.addEventListener("click", (e) => {
        const button = e.target.closest(
            ".delete-button, .edit-button, .cancel-button, .done-button",
        );
        if (!button) return;
        const row = button.closest("tr");
        const uuid = row.dataset.id;
        if (button.matches(".delete-button")) {
            Del(uuid);
        } else if (button.matches(".edit-button")) {
            Edit(uuid);
        } else if (button.matches(".cancel-button")) {
            console.log(uuid);
            Cancel(uuid);
        } else if (button.matches(".done-button")) {
            console.log(uuid);
            Done(uuid);
        }
    });
}
