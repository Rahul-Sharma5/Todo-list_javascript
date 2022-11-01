// Run this function when page loads
displayTasks();

// Define most used variables
let taskInputValue = document.getElementById('userInput');
let addTaskBtn = document.getElementById('push');
let saveTaskBtn = document.getElementById('save');
let deleteAll = document.getElementById('deleteAll');
let searchInput = document.getElementById('searchBar')

// get items from local storage
function getStorage(){
    let tasksObj;
    let webTasks = localStorage.getItem('localtasks');
    if(webTasks == null){
        tasksObj = [];
    }else{
        tasksObj = JSON.parse(webTasks);
    }
    return tasksObj;
}

// set items in local storage
function setStorage(data){
    localStorage.setItem('localtasks', JSON.stringify(data))
}

// Add event listener to add task button
addTaskBtn.addEventListener('click', addToStorage)

// Add tasks to local storage
function addToStorage(){
    let addTaskInputVal = taskInputValue.value;
    if(addTaskInputVal.trim()!= 0){
        let tasksObj = getStorage();
        tasksObj.push(addTaskInputVal);
        setStorage(tasksObj);
        taskInputValue.value = "";
        displayTasks();
    }else{
        let snackBar = document.getElementById('snackBar');
        snackBar.className = "show";
        setTimeout(function(){
            snackBar.className = snackBar.className.replace("show", "");
        }, 3000)
    }
}

// Display tasks on page
function displayTasks(){
    let addedTasksList = document.getElementById('tasks');
    let tasksObj = getStorage();
    let html = "";
    tasksObj.forEach((item, index)=> {
        html += ` <div id="task">
        <span id="taskName">
            ${index + 1}. ${item}
        </span>
        <div id="actions">
            <button id="edit" onclick="editTasks(${index})">
                <ion-icon name="create"></ion-icon> Edit
            </button>
            <button id="delete" onclick="deleteTasks(${index})">
                <ion-icon name="trash"></ion-icon> Delete
            </button>
        </div>
    </div>`
    })
    if(tasksObj.length != 0){
        addedTasksList.innerHTML = html;
    } else{
        addedTasksList.innerHTML = `<span id="noTasks">There are no tasks to show!</span>`
    }
}

// Edit task
function editTasks(index){
    let tasksObj = getStorage();
    taskInputValue.value = tasksObj[index];
    let saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

// Add event listner to save task button
saveTaskBtn.addEventListener('click', saveTasks);

// Save tasks
function saveTasks(){
    let tasksObj = getStorage()
    saveIndex = document.getElementById('saveIndex').value;
    tasksObj[saveIndex] = taskInputValue.value;
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}

// Delete tasks
function deleteTasks(index){
    let tasksObj = getStorage();
    tasksObj.splice(index, 1);
    setStorage(tasksObj);
    displayTasks();
}

// Add event listner to delete all button
deleteAll.addEventListener('click', deleteAllTasks)

// Delete all tasks
function deleteAllTasks(){
    let tasksObj = getStorage();
    if(tasksObj != null){
        tasksObj = [];
    }
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}

// Add event listner to search input
searchInput.addEventListener('input', searchTasks);

// Search tasks
function searchTasks(){
    inputValue = searchInput.value;
    // Capitalize search input
    inputValue = inputValue.replace(/^./, str => str.toUpperCase());
    let tasks = document.querySelectorAll('#task');
    Array.from(tasks).forEach(function(element){
        let taskTxt = element.getElementsByTagName('span')[0].innerText;
        if(taskTxt.includes(inputValue)){
            element.style.display = "block"
            element.style.display = "flex"
        }else{
            element.style.display = "none"           
        }
    })
}