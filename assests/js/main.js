const parentContainer = document.querySelector(".parent-container");
const darkMode = document.querySelector(".ri-sun-line");
const lightMode = document.querySelector(".ri-moon-line");
const formCont = document.querySelector("form");
const inputField = document.querySelector("input");
const todoItemContainer = document.querySelector(".todo-item-container");
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
    console.log(todoItemArray);
    todoItemContainer.innerHTML += `<div class="todo-item1">
                                      <i class="ri-circle-line"></i>
                                      <p>${inputField.value}</p>
                                    </div>`;

    inputField.value = "";
  }
});

// Reading from localStorage and Display in UI
function displayTodoItem() {
  todoItemArray.forEach((todo) => {
    let divElement = document.createElement("div");
    divElement.innerHTML = `<i class="ri-circle-line"></i>
                              <p>${todo.todoText}</p>
                           `;
    divElement.classList.add("todo-item1");
    todoItemContainer.appendChild(divElement);
  });
  console.log(todos);
}
displayTodoItem();

/* let userObject = {
  firstName: "Ola",
  lastName: "Ade",
  email: "olawaleoloye@gmail.com",
}; */
