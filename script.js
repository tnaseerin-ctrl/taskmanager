// script.js
let tasks = [];
let editIndex = null;

function renderTasks() {
  const table = document.getElementById("taskTable");
  const filter = document.getElementById("statusFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();
  table.innerHTML = "";

  tasks
    .filter(task =>
      (filter === "All" || task.status === filter) &&
      task.description.toLowerCase().includes(search)
    )
    .forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.status}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
        <td>${task.dueDate}</td>
        <td>
          <button onclick="editTask(${index})">✏</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </td>
      `;
      table.appendChild(row);
    });
}

function openForm() {
  document.getElementById("taskForm").style.display = "block";
  clearForm();
}

function closeForm() {
  document.getElementById("taskForm").style.display = "none";
}

function clearForm() {
  editIndex = null;
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskStatus").value = "Active";
  document.getElementById("taskPriority").value = "High Priority";
  document.getElementById("taskDueDate").value = "";
}

function saveTask() {
  const description = document.getElementById("taskDescription").value;
  const status = document.getElementById("taskStatus").value;
  const priority = document.getElementById("taskPriority").value;
  const dueDate = document.getElementById("taskDueDate").value;

  const task = { description, status, priority, dueDate };

  if (editIndex !== null) {
    tasks[editIndex] = task;
  } else {
    tasks.push(task);
  }

  closeForm();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  editIndex = index;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskStatus").value = task.status;
  document.getElementById("taskPriority").value = task.priority;
  document.getElementById("taskDueDate").value = task.dueDate;
  openForm();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById("statusFilter").addEventListener("change", renderTasks);
document.getElementById("searchInput").addEventListener("input", renderTasks);

renderTasks();