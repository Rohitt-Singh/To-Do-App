const menuBtn = document.querySelector("#hamburger");
const sidebar = document.querySelector(".weekdays");
const taskButton = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});


// 🟢 render function
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const tickBtn = document.createElement("button");
    tickBtn.classList.add("tick-box");
    if(task.completed) {
        tickBtn.innerText = "✔";
        tickBtn.style.color = "green";
    }
    else {
        tickBtn.innerText = "";
    }

    const text = document.createElement("p");
    text.innerText = task.text;

    // ✅ strike-through if completed
    if (task.completed) {
      text.style.textDecoration = "line-through";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-task");
    deleteBtn.innerText = "-";

    // ✅ toggle complete
    tickBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    // ✅ delete task
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    taskList.appendChild(taskDiv);
    taskDiv.appendChild(tickBtn);
    taskDiv.appendChild(text);
    taskDiv.appendChild(deleteBtn);
  });
}


// 🟢 add task function
function addTask(text) {
  tasks.push({
    text: text,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}


// 🟢 add button click
taskButton.addEventListener("click", () => {
  let task = prompt("Enter new task:");
  if (!task) return; // prevents empty/null
  addTask(task);
});


// 🟢 initial render
renderTasks();