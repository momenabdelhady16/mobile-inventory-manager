export function initEvents({ Add, Del, Edit, Cancel, Done, customModel }) {
    const brand = document.querySelector("#input-brand");
    const inputForm = document.querySelector("#input-form");
    const editForm = document.querySelector("#edit-form");
    const tbody = document.querySelector("table tbody");
    const darkMode = document.querySelector("#darkMode");
    let model = document.querySelector("#input-model");
    let waitingList;

    darkMode.addEventListener("click", () => {
        const isDark = document.documentElement.dataset.theme === "dark";

        document.documentElement.dataset.theme = isDark ? "light" : "dark";
    });
    brand.addEventListener("change", async (e) => {
        model = await customModel(brand.value, model, "input");
    });

    inputForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        await Add(data);
    });

    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const row = e.submitter.closest("tr");
        const uuid = row.dataset.id;
        const data = Object.fromEntries(new FormData(e.currentTarget));
        await Add(data, uuid);
        waitingList = 0;
    });

    tbody.addEventListener("click", async (e) => {
        const button = e.target.closest(
            ".delete-button, .edit-button, .cancel-button",
        );
        if (!button) return;
        const row = button.closest("tr");
        const uuid = row.dataset.id;
        if (button.matches(".delete-button")) {
            await Del(uuid);
        } else if (button.matches(".edit-button")) {
            if (waitingList) {
                await Cancel(waitingList);
            }
            waitingList = uuid;
            await Edit(uuid);
        } else if (button.matches(".cancel-button")) {
            await Cancel(uuid);
            waitingList = 0;
        }
    });
    tbody.addEventListener("change", async (e) => {
        if (!e.target.matches("select[name='brand']")) return;
        const row = e.target.closest("tr");
        const brandSel = row.querySelector("select[name='brand']");
        const modelSel = row.querySelector("select[name='model']");
        let value = brandSel.value;
        const newModelSel = await customModel(value, modelSel, "edit");
    });
}
