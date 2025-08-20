const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("listcontainer");
const toggleBtn = document.getElementById("theme-toggle");
const htmlTag = document.documentElement;

// ------------------ TO-DO FUNCTIONALITY -------------------
function addTask() {
    if (inputBox.value === '') {
        alert("Please write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // ❌ DELETE BUTTON
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // Cross
        deleteBtn.classList.add("delete-btn");

        // ✏️ EDIT BUTTON
        let editBtn = document.createElement("img");
editBtn.src = "images/edit.png"; // ✅ your PNG file path
editBtn.alt = "Edit";
editBtn.classList.add("edit-btn");


        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listcontainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

// 🖱️ CLICK HANDLING FOR DELETE, EDIT, CHECK
listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit-btn")) {
        let li = e.target.parentElement;
        let currentText = li.firstChild.textContent.trim();
        let newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
            li.firstChild.textContent = newText;
            saveData();
        }
    }
}, false);

// 💾 SAVE TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("tasks", listcontainer.innerHTML);
}

// 🔄 LOAD FROM LOCAL STORAGE
function showData() {
    listcontainer.innerHTML = localStorage.getItem("tasks");
}
showData();

// ------------------ DARK MODE TOGGLE -------------------
let savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    htmlTag.setAttribute("data-theme", "dark");
    toggleBtn.innerText = "☀️ Light Mode";
} else {
    toggleBtn.innerText = "🌙 Dark Mode";
}

toggleBtn.addEventListener("click", () => {
    const isDark = htmlTag.getAttribute("data-theme") === "dark";

    if (isDark) {
        htmlTag.removeAttribute("data-theme");
        toggleBtn.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        htmlTag.setAttribute("data-theme", "dark");
        toggleBtn.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }
});
