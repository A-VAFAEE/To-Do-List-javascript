
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
    document.body.style.backgroundImage = "url('images/studyImage2.jpg')";
  } else if (theme === 'vacation') {
    document.body.style.backgroundColor = "lightyellow";
    document.body.style.backgroundImage = "url('images/vacationImage2.jpg')";
  } else if (theme === 'finance') {
    document.body.style.backgroundColor = "lightgreen";
    document.body.style.backgroundImage = "url('images/financeImage.jpg')";

  } else if (theme === 'work') {
    document.body.style.backgroundColor = "lightgray";
    document.body.style.backgroundImage = "url('images/workImage1.jpg')";

  } else if (theme === 'chores') {
    document.body.style.backgroundColor = "lightpink";
    document.body.style.backgroundImage = "url('images/choresImage2.jpg')";

  } else if (theme === 'grocery') {
    document.body.style.backgroundColor = "orange";
    document.body.style.backgroundImage = "url('images/groceryImage5.jpg')";
  }
}

function addTask() {
  const taskText = todoInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  // Check for priority selection and append it to the task
  for (let i = 0; i < priorScale.length; i++) {
    if (priorScale[i].checked) {
      listItem.textContent += ` (${priorScale[i].value})`;
      priorScale[i].checked = false; // Uncheck after using
      break;
    }
  }

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = () => {
    if (confirm("Are you sure that you want to remove this task?")) {
      listItem.remove();
    }
  };
  removeButton.onclick = () => {
    const confirmationBox = document.createElement('div');
    confirmationBox.style.position = 'fixed';
    confirmationBox.style.top = '50%';
    confirmationBox.style.left = '50%';
    confirmationBox.style.transform = 'translate(-50%, -50%)';
    confirmationBox.style.padding = '20px';
    confirmationBox.style.backgroundColor = 'white';
    confirmationBox.style.border = '1px solid black';
    confirmationBox.style.zIndex = '1000';

    const confirmationText = document.createElement('p');
    confirmationText.textContent = 'Are you sure that you want to remove this task?';
    confirmationBox.appendChild(confirmationText);

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.style.backgroundColor = 'green';
    yesButton.style.color = 'white';
    yesButton.style.borderRadius = '5px';

    yesButton.onclick = () => {
      listItem.remove();
      document.body.removeChild(confirmationBox);
    };
    confirmationBox.appendChild(yesButton);

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.style.backgroundColor = 'green';
    noButton.style.color = 'white';
    noButton.style.float = 'right';
    noButton.style.borderRadius = '5px';
    noButton.onclick = () => {
      document.body.removeChild(confirmationBox);
    };
    confirmationBox.appendChild(noButton);

    document.body.appendChild(confirmationBox);
  };
  
  //removeButton.onclick = () => listItem.remove();

  listItem.appendChild(removeButton);
  todoList.appendChild(listItem);
  todoInput.value = '';
}
addButton.addEventListener('click', addTask);



todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
}); 
