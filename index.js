var addItemButton = document.getElementsByClassName("add-item-button")[0];
var titleValue = document.getElementsByClassName("title")[0];
var descriptionValue = document.getElementsByClassName("description")[0];
var displayTable = document.getElementsByTagName("table")[0];
var AddingItem;
(function (AddingItem) {
    var ItemObject = /** @class */ (function () {
        function ItemObject(title, description) {
            this.title = title;
            this.description = description;
        }
        ItemObject.prototype.addToLocalStorage = function () {
            var _a, _b;
            var toDoList;
            var storage = localStorage.getItem("ToDoList");
            if (localStorage.getItem("ToDoList") == null) {
                localStorage.setItem("ToDoList", "[]");
                toDoList = JSON.parse(storage);
                toDoList.push({ "title": this.title, "description": this.description });
                localStorage.setItem("ToDoList", JSON.stringify(toDoList));
                titleValue.value = "";
                descriptionValue.value = "";
                (_a = document.getElementById("dummy-row")) === null || _a === void 0 ? void 0 : _a.remove();
            }
            else {
                toDoList = JSON.parse(storage);
                toDoList.push({ "title": this.title, "description": this.description });
                localStorage.setItem("ToDoList", JSON.stringify(toDoList));
                titleValue.value = "";
                descriptionValue.value = "";
            }
            if (JSON.parse(storage).length < 1) {
                (_b = document.getElementById("dummy-row")) === null || _b === void 0 ? void 0 : _b.remove();
            }
        };
        return ItemObject;
    }());
    AddingItem.ItemObject = ItemObject;
})(AddingItem || (AddingItem = {}));
addItemButton.addEventListener("click", function () {
    var storage = localStorage.getItem("ToDoList");
    var item = new AddingItem.ItemObject(titleValue.value, descriptionValue.value);
    item.addToLocalStorage();
    storage = localStorage.getItem("ToDoList");
    var data = JSON.parse(storage);
    addItemsInDisplay(displayTable, data, data.length - 1);
});
function addItemsInDisplay(table, data, index) {
    var row = table.insertRow();
    var cell = row.insertCell();
    var text = document.createTextNode((index + 1).toString());
    cell.appendChild(text);
    for (var i in data[index]) {
        cell = row.insertCell();
        text = document.createTextNode(data[index][i]);
        cell.appendChild(text);
    }
    var button = document.createElement("input");
    button.type = "button";
    button.value = "X";
    button.className = "remove-button";
    button.onclick = removeItem;
    cell = row.insertCell();
    cell.appendChild(button);
}
function removeItem() {
    var storage = localStorage.getItem("ToDoList");
    var index = this.parentNode.parentNode.rowIndex;
    var data = JSON.parse(storage);
    data.splice(index - 1, 1);
    localStorage.setItem("ToDoList", JSON.stringify(data));
    this.parentNode.parentNode.remove();
}
function removeDummyItem() {
    var _a;
    (_a = document.getElementById("dummy-row")) === null || _a === void 0 ? void 0 : _a.remove();
}
// addItemButton.addEventListener("click", function () {
//     let data: object[] = JSON.parse(storage);
//     addItemsInDisplay(displayTable, data, data.length - 1)
// })
function displayStoredData() {
    var _a;
    var storage = localStorage.getItem("ToDoList");
    var data = JSON.parse(storage);
    if (data != null && data.length > 0) {
        (_a = document.getElementById("dummy-row")) === null || _a === void 0 ? void 0 : _a.remove();
        for (var i = 0; i < data.length; i++) {
            addItemsInDisplay(displayTable, data, i);
        }
    }
}
window.onload = displayStoredData;
