let taskInput = document.getElementById("taskInput")
let btn = document.getElementById("btn")
let tasksContainer = document.getElementById("tasksContainer")
let loading = document.getElementById("loading")
btn.addEventListener("click", function () {
    let task = {
        title: taskInput.value,
        apiKey: "666f204460a208ee1fdbd39f",
    }
    addTodo(task)
    clearInputs()
})

async function addTodo(task) {
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: "post",
        body: JSON.stringify(task),
        headers: { "content-type": "application/json" }
    })
    let result = await data.json()
    if (result.message == "success") {
        getAllTodos()
    }
}

async function getAllTodos() {
    loading.style.display = "block"
    tasksContainer.style.display = "none"
    let data = await fetch("https://todos.routemisr.com/api/v1/todos/666f204460a208ee1fdbd39f")
    let result = await data.json()
    if (result.message = "success") {
        loading.style.display = "none"
        tasksContainer.style.display = "block"
        display(result.todos)
    }

}
getAllTodos()
function display(data) {
    cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="task my-3 d-flex rounded-5 justify-content-between py-1 px-4 w-75 m-auto">
                <div class="task-text mt-2">
                    <p class="text-white ${data[i].completed ? " text-decoration-line-through" : ""}">${data[i].title}</p>
                </div>
                <div class="icons text-white mt-2">
                    <i onclick="markCompleted('${data[i]._id}')" class="fa-regular fa-circle-check me-2 ${data[i].completed ? "d-none" : ""}"></i>
                    <i onclick="deleteTodo('${data[i]._id}')" class="fa-solid fa-trash"></i>
                </div>
            </div>
        `
    }
    tasksContainer.innerHTML = cartona
}

async function deleteTodo(id) {
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: "delete",
        body: JSON.stringify({ todoId: id }),
        headers: { "content-type": "application/json" }
    })
    let result = await data.json()
    if (result.message == "success") {
        getAllTodos()
    }
}

async function markCompleted(id) {
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: "put",
        body: JSON.stringify({ todoId: id }),
        headers: { "content-type": "application/json" }
    })
    let result = await data.json()
    if (result.message == "success") {
        getAllTodos()
    }
}

function clearInputs() {
    taskInput.value = ""
}