const listClick = document.querySelector(".fa-check-circle");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const fistCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const linkComplated = document.getElementById("linkComplated"); //Sadece yapilmislari göstersin
const clearComplated = document.getElementById("clearComplated");

// const linkAll = document.getElementById("linkAll");
// const linkActive = document.getElementById("linkActive");
//const filtertodo = document.getElementsByClassName("filterTodo");


eventListeners();//sayfamiz acildiginda bu fonksiyon direkt calisacak

function eventListeners() { //Bu fonksiyon sadece event listenerlari atamak görevinde
    listClick.addEventListener("click", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    clearComplated.addEventListener("click", clear);
    secondCardBody.addEventListener("click", deleteTodo);
    linkComplated.addEventListener("click", filterComplated);
    // linkAll.addEventListener("click", allItem);
    //linkActive.addEventListener("click", activeItem);
    // linkCompleated.addEventListener("click", compleatedItem);
}
//link fonksiyonlari

//Temizleme
function clear() {
    while (todoList != null) {
        todoList.removeChild(todoList.firstElementChild);
        localStorage.removeItem("todos");
    }

}
//aktif olanlari secme
//Devam-Et.........
function filterComplated(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    // todos.forEach(function (todo) {
    //     switch (e.target.id) {
    //         case "linkAll":
    //             todo.style.display = "flex";
    //             break;
    //         case "linkCompleted":
    //             if (todo.classList.contains("linkCompleted")) {
    //                 todo.style.display = "flex";
    //             }
    //             else {
    //                 todo.style.display = "none";
    //             }
    //     }
    // });
}





//silme islemii
function deleteTodo(e) {
    let storageTodo = e.target.parentElement.children[1].textContent;
   // console.log(storageTodo);
    if (e.target.className === "fas fa-trash-alt") {
        e.target.parentElement.remove();
        deleteTodoFromStorage(storageTodo);
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}



//sayfam yenilendiginde todolarin kalmasi

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}


function addTodo(e) {

    const newTodo = todoInput.value.trim();

    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);

    e.preventDefault();
}

//todoları storage ekleme

function getTodosFromStorage() { //storagedan bütün todolari alacak
    let todos;

    if (localStorage.getItem("todos") === null) {  // To dos seklinde bir key var mi
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Mod Degistirme
function lightMode() {
    var element = document.body;
    element.classList.toggle("light-body");
 }


function addTodoToUI(newTodo) {
    //ListItem Olusturma
    const listItem = document.createElement("li");
    const inputOne = document.createElement("input");
    const label = document.createElement("LABEL");
    const icon = document.createElement("icon");
    icon.type = "icon";
    icon.className = "fas fa-trash-alt"
    label.type = "label";
    label.className = "inputText";
    inputOne.type = "checkbox";
    listItem.className = "list-group-item";
    listItem.appendChild(inputOne);
    listItem.appendChild(label);
    listItem.appendChild(icon);
    label.appendChild(document.createTextNode(newTodo));


    //to do liste list-item ekleme

    todoList.prepend(listItem);

    //Inputumuza degeri girdikten sonra temizlettik.
    todoInput.value = "";
}