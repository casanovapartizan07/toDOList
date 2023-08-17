const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

function addTask() {
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
		const li = document.createElement("li");
		li.innerHTML = `
      <span>${taskText}</span>
      <button class="deleteButton">Delete</button>
    `;
		taskList.appendChild(li);
		taskInput.value = "";
		attachDeleteListener(li);
	}
}

function attachDeleteListener(li) {
	const deleteButton = li.querySelector(".deleteButton");
	deleteButton.addEventListener("click", () => {
		li.remove();
	});
}

taskInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		addTask();
	}
});
document.addEventListener("mousemove", (e) => {
	const cursor = document.querySelector(".cursor");
	cursor.setAttribute("style", "top:" + (e.pageY - 5) + "px; left:" + (e.pageX - 5) + "px;");
});
