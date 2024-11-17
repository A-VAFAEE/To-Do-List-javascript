
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const priorScale = document.getElementsByName('prioritize'); // this returns a collection of elements with the name "prioritize"

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
  if (taskText) { // if there is text ented, then add the task to the list
    const listItem = document.createElement('li');  
    listItem.textContent = taskText;
    
    // if one of the scale is checked, then add it to the task corresponding to it
    // then uncheck it
    // if the scale isn't checked, then don't add anything
    if (priorScale[0].checked) {
      listItem.textContent += " " + priorScale[0].value;
      priorScale[0].checked = false; 
    } else if (priorScale[1].checked) {
      listItem.textContent += " " + priorScale[1].value;
      priorScale[1].checked = false;
    } else if (priorScale[2].checked) {
      listItem.textContent += " " + priorScale[2].value;
      priorScale[2].checked = false;
    } 
 
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
