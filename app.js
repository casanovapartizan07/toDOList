const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when the page loads
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(taskText => addTaskToUI(taskText));
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(li => li.querySelector("span").textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to UI
function addTaskToUI(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteButton">Delete</button>
  `;
  taskList.appendChild(li);
  attachDeleteListener(li);
}

// Attach delete listener to task
function attachDeleteListener(li) {
  const deleteButton = li.querySelector(".deleteButton");
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTasksToLocalStorage(); // Save tasks after deletion
  });
}

addButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToUI(taskText);
    saveTasksToLocalStorage(); // Save tasks after addition
    taskInput.value = "";
  }
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTaskToUI(taskText);
      saveTasksToLocalStorage(); // Save tasks after addition
      taskInput.value = "";
    }
  }
});

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  cursor.style.top = (e.pageY - 5) + "px";
  cursor.style.left = (e.pageX - 5) + "px";
});

// Load tasks when the page loads
loadTasksFromLocalStorage();
