const addItemButton = document.getElementsByClassName("add-item-button")[0]
const titleValue: any = document.getElementsByClassName("title")[0]
const descriptionValue: any = document.getElementsByClassName("description")[0]
const displayTable: HTMLTableElement = document.getElementsByTagName("table")[0]

namespace AddingItem {
    interface InputItem {
        title: string
        description: string
    }
    export class ItemObject implements InputItem {
        public title: string
        description: string

        constructor(title: string, description: string) {
            this.title = title
            this.description = description
        }

        addToLocalStorage() {
            let toDoList: object[]
            const storage:any = localStorage.getItem("ToDoList");

            if (localStorage.getItem("ToDoList") == null) {

                localStorage.setItem("ToDoList", "[]");
                toDoList = JSON.parse(storage);
                toDoList.push({ "title": this.title, "description": this.description });
                localStorage.setItem("ToDoList", JSON.stringify(toDoList));
                titleValue.value = "";
                descriptionValue.value = "";
                document.getElementById("dummy-row")?.remove()
            }
            else {

                toDoList = JSON.parse(storage);
                toDoList.push({ "title": this.title, "description": this.description });
                localStorage.setItem("ToDoList", JSON.stringify(toDoList));
                titleValue.value = "";
                descriptionValue.value = "";
            }

            if (JSON.parse(storage).length<1){

                document.getElementById("dummy-row")?.remove()
            }
        }
    }
}



addItemButton.addEventListener("click", function () {
    let storage:any = localStorage.getItem("ToDoList");
    let item = new AddingItem.ItemObject(titleValue.value, descriptionValue.value);
    item.addToLocalStorage();
    storage = localStorage.getItem("ToDoList");
    let data: object[] = JSON.parse(storage);
    addItemsInDisplay(displayTable, data, data.length - 1)
})


function addItemsInDisplay(table: HTMLTableElement, data: object[], index: number) {
    let row = table.insertRow();
    let cell = row.insertCell();
    let text = document.createTextNode((index + 1).toString())
    cell.appendChild(text)
    for (let i in data[index]) {
        cell = row.insertCell()
        text = document.createTextNode(data[index][i]);
        cell.appendChild(text)
    }
    let button = document.createElement("input");
    button.type = "button"
    button.value = "X";
    button.className = "remove-button";
    button.onclick = removeItem
    cell = row.insertCell()
    cell.appendChild(button)
}

function removeItem() {
    const storage:any = localStorage.getItem("ToDoList");
    let index = this.parentNode.parentNode.rowIndex;
    let data = JSON.parse(storage);
    data.splice(index - 1, 1);
    localStorage.setItem("ToDoList", JSON.stringify(data));
    this.parentNode.parentNode.remove()
}

function removeDummyItem():void {
    document.getElementById("dummy-row")?.remove();
}

// addItemButton.addEventListener("click", function () {
//     let data: object[] = JSON.parse(storage);
//     addItemsInDisplay(displayTable, data, data.length - 1)
// })


function displayStoredData(): void {
    const storage:any = localStorage.getItem("ToDoList");
    let data: object[] = JSON.parse(storage);

    if (data != null && data.length>0) {
        document.getElementById("dummy-row")?.remove();
        for (let i = 0; i < data.length; i++) {
            addItemsInDisplay(displayTable, data, i)
        }
    }
}

window.onload = displayStoredData