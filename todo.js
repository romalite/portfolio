// Aufgaben aus localStorage laden oder leer starten
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Hilfsfunktion – ID generieren
function makeId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Aktuelles Datum formatieren
function todayString() {
  let d = new Date();
  let day   = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  return day + "." + month + "." + d.getFullYear();
}

// Aufgaben speichern
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme
let darkMode = false;
let themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  themeBtn.textContent = darkMode ? "☀️" : "🌙";
});


// Aufgabe hinzufügen
document.getElementById("add-btn").addEventListener("click", addTask);
document.getElementById("task-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let input    = document.getElementById("task-input");
  let priority = document.getElementById("priority-select").value;
  let text     = input.value.trim();

  if (text === "") {
    input.style.borderColor = "#ef4444";
    setTimeout(function() { input.style.borderColor = ""; }, 1000);
    return;
  }

  let task = {
    id:       makeId(),
    text:     text,
    done:     false,
    priority: priority,
    date:     todayString()
  };

  tasks.unshift(task); // neueste oben
  saveTasks();
  input.value = "";
  renderAll();
}


// Aufgabe abhaken
function toggleDone(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
      break;
    }
  }
  saveTasks();
  renderAll();
}

// Aufgabe löschen
function deleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }
  saveTasks();
  renderAll();
}

// Erledigte löschen
document.getElementById("clear-done-btn").addEventListener("click", function() {
  let remaining = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) remaining.push(tasks[i]);
  }
  tasks = remaining;
  saveTasks();
  renderAll();
});


// Filter-Buttons
let filterBtns = document.querySelectorAll(".filter-btn");
for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function() {
    currentFilter = this.dataset.filter;
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
    }
    this.classList.add("active");
    renderAll();
  });
}


// Gefilterte Liste zurückgeben
function getFiltered() {
  if (currentFilter === "done") {
    let result = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].done) result.push(tasks[i]);
    }
    return result;
  }
  if (currentFilter === "open") {
    let result = [];
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].done) result.push(tasks[i]);
    }
    return result;
  }
  return tasks;
}


// Liste rendern
function renderList() {
  let ul      = document.getElementById("task-list");
  let list    = getFiltered();
  ul.innerHTML = "";

  if (list.length === 0) {
    let li = document.createElement("li");
    li.className   = "empty-msg";
    li.textContent = currentFilter === "done"
      ? "Noch nichts erledigt 😴"
      : "Keine Aufgaben vorhanden 🎉";
    ul.appendChild(li);
    return;
  }

  for (let i = 0; i < list.length; i++) {
    let t  = list[i];
    let li = document.createElement("li");
    li.className = "task-item";
    if (t.done) li.classList.add("done");
    if (t.priority === "high") li.classList.add("priority-high");
    if (t.priority === "low")  li.classList.add("priority-low");

    let checkbox = document.createElement("input");
    checkbox.type    = "checkbox";
    checkbox.checked = t.done;

    let taskId = t.id; // für den Event-Listener
    checkbox.addEventListener("change", function() {
      toggleDone(taskId);
    });

    let span = document.createElement("span");
    span.className   = "task-text";
    span.textContent = t.text;

    let date = document.createElement("span");
    date.className   = "task-date";
    date.textContent = t.date;

    let delBtn = document.createElement("button");
    delBtn.className   = "task-delete";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", function() {
      deleteTask(taskId);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(date);
    li.appendChild(delBtn);
    ul.appendChild(li);
  }
}


// Stats rendern
function renderStats() {
  let total = tasks.length;
  let done  = 0;
  let high  = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done)              done++;
    if (tasks[i].priority === "high") high++;
  }

  let container  = document.getElementById("stats");
  container.innerHTML = "";

  let chipsData = [
    { label: "Gesamt",    value: total },
    { label: "Erledigt",  value: done },
    { label: "Offen",     value: total - done },
    { label: "⚠️ Hoch",  value: high }
  ];

  for (let i = 0; i < chipsData.length; i++) {
    let chip = document.createElement("div");
    chip.className = "stat-chip";
    chip.innerHTML = chipsData[i].label + ": <span>" + chipsData[i].value + "</span>";
    container.appendChild(chip);
  }
}


// Footer-Text
function renderFooter() {
  let open = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) open++;
  }
  let el = document.getElementById("tasks-left");
  el.textContent = open === 0
    ? "Alles erledigt! 🎉"
    : open + " Aufgabe" + (open === 1 ? "" : "n") + " noch offen";
}


// Alles zusammen rendern
function renderAll() {
  renderList();
  renderStats();
  renderFooter();
}

// Beim Start rendern
renderAll();
