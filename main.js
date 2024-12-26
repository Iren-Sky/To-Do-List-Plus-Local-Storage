const userNameInput = document.querySelector ("#userName")
const saveName = document.querySelector ("#saveNameBtn")

function saveUserName () {
  const user = userNameInput.value;
  if (user) {
    localStorage.setItem ("name", user);
    alert (`Привет, ${user}! Твое имя сохранено!`)
  } else {
    alert (`Пожалуйста, введите имя.`)
  }
}

saveName.addEventListener ("click", () => {
  saveUserName ()
  userNameInput.value = ""
})

const inputTask = document.querySelector ('#taskInput')
const addTaskBtn = document.querySelector ('#addTaskBtn')
const taskList = document.querySelector ('#taskList')
const showAllBtn = document.querySelector ('#all')
const showComplBtn = document.querySelector ('#completed')
const showIncomplBtn = document.querySelector ('#incomplete')


const tasksList = []

function renderTask (filter = "all") {
  taskList.innerHTML = ""

  const filteredTasks = tasksList.filter((task) => {
    if (filter === "completed") {
      return task.completed
    }

    if (filter === "incomplete") {
      return !task.completed
    }

    return true
  })

  filteredTasks.forEach ((task) => {
    const li = document.createElement ("li")
    li.className = task.completed ? "completed" : ""

    const taskText = document.createElement ("span")
    taskText.textContent = task.name
    taskText.addEventListener ('dblclick', () => {
      editTask (task.name);
    })
  

    const buttons = document.createElement ("div")
    buttons.className = "task-buttons"

    const completeBtn = document.createElement ("button")
    completeBtn.textContent = task.completed ? "Не выполнено" : "Выполнено"
    completeBtn.className = "complete"
    completeBtn.addEventListener ("click", () => {
      markTaskCompleted (task.name)
    })

    const editBtn = document.createElement ("button")
    editBtn.textContent = "Редактировать"
    editBtn.className = "edit"
    editBtn.addEventListener ("click", () => {
      editTask (task.name)
    })

    const deleteBtn = document.createElement ("button")
    deleteBtn.textContent = "Удалить"
    deleteBtn.className = "delete"
    deleteBtn.addEventListener ("click", () => {
      deleteTask (task.name)
    })

    buttons.append (completeBtn, editBtn, deleteBtn)
    li.append (taskText, buttons)
    taskList.append (li)
  })
}

function addNewTask (taskName , completed = false) {
  if (taskName === '') {
    console.error ('Название задачи не может быть пустым')
    return
  } 
  tasksList.push ({
    name: taskName ,
    completed
  })

  renderTask ()
}

function markTaskCompleted (name) {
  const taskCompleted = tasksList.find (taskCompleted => taskCompleted.name === name)
  if (taskCompleted) {
    taskCompleted.completed = true;
  } else {
    console.error (`Задача "${name}" не найдена`)
    return
  }

  renderTask ()
}

function deleteTask (name) {
  const deletedTask = tasksList.findIndex (deletedTask => deletedTask.name === name);
  if (deletedTask !== -1) { 
    tasksList.splice (deletedTask, 1);
  } else {
    console.error (`Задача "${name}" не найдена`) 
    return
  }   
  renderTask ()
}

function editTask (name) {
  const taskEdit = tasksList.find (taskEdit => taskEdit.name === name)
  if (taskEdit === undefined) {
    console.error (`Задача "${name}" не найдена`)
    return
  } 

  const newTaskText = prompt ("Редактировать задачу", taskEdit.name);
    if (newTaskText !== null) {
      taskEdit.name = newTaskText.trim() || taskEdit.name 
      renderTask ()
    }
}

addTaskBtn.addEventListener("click", () => {
  addNewTask(inputTask.value.trim())
  inputTask.value = ""
})

showAllBtn.addEventListener ("click", () => {
  renderTask ()
})

showComplBtn.addEventListener ("click", () => {
  renderTask ("completed")
})

showIncomplBtn.addEventListener ("click", () => {
  renderTask ("incomplete")
})

