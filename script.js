
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

function changeTheme ( theme ) {
  changeBackgroundColor(theme);
  changeTitle(theme);
}

function changeBackgroundColor( theme ) {
  if (theme === 'study') {  
    document.body.style.backgroundColor = "lightblue"; 
    document.body.style.backgroundImage = "url('studyImage2.jpg')";
  } else if (theme === 'vacation') {
    document.body.style.backgroundColor = "lightyellow";
    document.body.style.backgroundImage = "url('vacationImage2.jpg')";
  } else if (theme === 'finance') {
    document.body.style.backgroundColor = "lightgreen";
    document.body.style.backgroundImage = "url('financeImage.jpg')";
  } else if (theme === 'work') {
    document.body.style.backgroundColor = "lightgray";
    document.body.style.backgroundImage = "url('workImage2.jpg')";
  } else if (theme === 'chores') {
    document.body.style.backgroundColor = "lightpink";
    document.body.style.backgroundImage = "url('choresImage2.jpg')";
  } else if (theme === 'grocery') {
    document.body.style.backgroundColor = "orange";
    document.body.style.backgroundImage = "url('groceryImage5.jpg')";
  }
}

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
 
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => listItem.remove();
    
    listItem.appendChild(removeButton);
    todoList.appendChild(listItem);
    todoInput.value = '';

  }
}
addButton.addEventListener('click', addTask);



todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
