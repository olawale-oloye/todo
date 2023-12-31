const parentContainer = document.querySelector(".parent-container");
const darkMode = document.querySelector(".ri-sun-line");
const lightMode = document.querySelector(".ri-moon-line");
const formCont = document.querySelector("form");
const inputField = document.querySelector("input");
const todoItemContainer = document.querySelector(".todo-item-container");
const todayDate = document.querySelector(".today-date");
const completedTask = document.getElementsByClassName("completed");
const completedTaskArr = [];
const activeBtn = document.querySelector(".active-btn");
const active = document.getElementsByClassName("active");
let activeTaskArr = [];
const modalBg = document.querySelector(".modal-bg");
const listCompletedTaskContainer = document.querySelector(".modal-body");
const listActiveTaskContainer = document.querySelector(".active-body");
const closeModal = document.querySelectorAll(".ri-close-circle-fill");

// let todos = JSON.parse(localStorage.getItem("todos"));
// let todoItemArray = [];
let todoItemArray = JSON.parse(localStorage.getItem("todos")) || [];

darkMode.addEventListener("click", function () {
  parentContainer.classList.add("light-mode");
  parentContainer.style.transition = 5000;
  darkMode.style.display = "none";
  lightMode.style.display = "block";
});

lightMode.addEventListener("click", function () {
  parentContainer.classList.remove("light-mode");
  parentContainer.style.transition = 5000;
  lightMode.style.display = "none";
  darkMode.style.display = "block";
});

formCont.addEventListener("submit", function (e) {
  // Form Validation
  e.preventDefault();
  if (inputField.value === "" || inputField.value.length <= 0) {
    return;
  } else {
    // Object for the Input Field
    let todoObject = {
      todoId: Date.now(),
      todoText: inputField.value,
    };
    todoItemArray.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todoItemArray));

    todoItemContainer.innerHTML += `<div class = "todo-item-style">
                                        <div class="todo-item1">
                                          <i class="ri-circle-line"></i>
                                          <p class = "todo-text active">${inputField.value}</p>
                                        </div>
                                        <i class = "delete"> X </i>
                                     </div>`;
    // todoItemContainer.style.display = "color: white";

    inputField.value = "";
  }
});

// Reading from localStorage and Display in UI
function displayTodoItem() {
  todoItemArray.forEach((todo) => {
    let divElement = document.createElement("div");
    divElement.innerHTML = ` <div class="todo-item1">
                                <i class="ri-circle-line"></i>
                                <p class = "todo-text active">${todo.todoText}</p>
                              </div>
                              <i class = "delete" onclick="deleteToDo(${todo.todoId})"> X </i>`;

    divElement.classList.add("todo-item-style");
    todoItemContainer.appendChild(divElement);
  });
  // console.log(todos);
}
displayTodoItem();

/* let userObject = {
  firstName: "Ola",
  lastName: "Ade",
  email: "olawaleoloye@gmail.com",
}; */

todayDate.textContent = new Date().toString().split(" ").slice(0, 4).join(" ");
document.querySelector(".items-left").textContent = todoItemArray.length;
document.querySelector(".clear-all").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

todoItemContainer.addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  if (e.target.classList.contains("todo-text")) {
    // e.target.style.textDecoration = "line-through";
    e.target.classList.toggle("completed");
    e.target.classList.toggle("active");
    completedTaskArr.push(e.target.textContent);

    /* for (let i = 0; i < todoItemArray.length; i++) {
      activeTaskArr.push(todoItemArray[i] - completedTaskArr[i]);
    } */

    activeTaskArr = todoItemArray.filter(
      (obj) => !completedTaskArr.includes(obj.todoText)
    );

    console.log(activeTaskArr);

    /* if (e.target.classList.contains("active")) {
      console.log(e.target);
      activeTaskArr.push(e.target.textContent);
    } */
  }
  /* if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  } */
});

activeBtn.addEventListener("click", function () {
  modalBg.style.display = "flex";
  document.querySelector(".modal-content").style.display = "none";
  document.querySelector(".active-content").style.display = "block";
  activeTaskArr.forEach((active, index) => {
    const liElement = document.createElement("li");
    liElement.innerHTML += `<li>${index + 1}.    ${active.todoText}</li>`;
    listActiveTaskContainer.appendChild(liElement);
  });
});

document.querySelector(".completed-btn").addEventListener("click", function () {
  document.querySelector(".active-content").style.display = "none";

  /*  completedTaskArr.forEach((todo) => {
    let divElement = document.createElement("div");
    divElement.innerHTML = `<div class="todo-item1">
                                <i class="ri-circle-line"></i>
                                <p class = "todo-text">${todo}</p>
                           </div>
                           <i class = "delete"> X </i>`;
    divElement.classList.add("todo-item-style");
    todoItemContainer.appendChild(divElement);
  }); */
  modalBg.style.display = "flex";
  completedTaskArr.forEach((completedTask, index) => {
    const liElement = document.createElement("li");
    liElement.innerHTML += `<li>${index + 1}.    ${completedTask}</li>`;
    listCompletedTaskContainer.appendChild(liElement);
  });
  console.log(completedTaskArr);
});

closeModal.forEach((close) => {
  close.addEventListener("click", function () {
    modalBg.style.display = "none";
  });
});

activeBtn.addEventListener("click", function () {
  console.log(activeTaskArr);
});

function deleteToDo(todoId) {
  let todoIndex = todoItemArray.findIndex((todo) => todo.todoId === todoId);
  todoItemArray.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todoItemArray));
  console.log(todoIndex);
}
