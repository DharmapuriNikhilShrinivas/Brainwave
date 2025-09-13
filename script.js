document.addEventListener("DOMContentLoaded", loadTasks);

    function addTask() {
      let time = document.getElementById("taskTime").value;
      let text = document.getElementById("taskText").value;

      if (time === "" || text === "") {
        alert("Please enter both time and task!");
        return;
      }

      let task = {time, text};
      saveTask(task);
      renderTask(task);

      document.getElementById("taskText").value = "";
    }

    function renderTask(task) {
      let li = document.createElement("li");
      li.innerHTML = `<span><b>${task.time}</b> - ${task.text}</span>
                      <button class="delete" onclick="deleteTask(this)">X</button>`;
      document.getElementById("taskList").appendChild(li);
    }

    function saveTask(task) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(renderTask);
    }

    function deleteTask(btn) {
      let li = btn.parentElement;
      let text = li.querySelector("span").innerText;
      li.remove();

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => `${t.time} - ${t.text}` !== text);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }