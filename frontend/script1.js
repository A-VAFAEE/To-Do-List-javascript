/* CONSTANTS */
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const priorScale = document.getElementsByName('prioritize'); // this returns a collection of elements with the name "prioritize"
const summary = document.getElementsByClassName('summaryBox');
const apiUrl = 'http://localhost:8080/api/appendTask'; //URL where we will send our data
const apiUrlGet = 'http://localhost:8080/api/getTask'; //URL where we will send our data
const apiUrlDel = 'http://localhost:8080/api/deleteTask'; //URL where we will send our data
const apiUrlNum = 'http://localhost:8080/api/numTask'; //URL where we will send our data

var numTask = 0;
var taskColor = ['lightblue', 'lightgreen', 'lightcoral'];

fetch(apiUrlNum).then(response => {
  if (!response.ok) { //If there server reports a problem, throw an error!
    throw new Error('Network response was not ok');
  }
  return response.json(); //If not, send the response down the line.

}).then( (data) => {
  document.getElementById("numSum").innerText = data[0]["length"];
});
// this should occur automatically when the page is refreshed
var tasks = [];
fetch(apiUrlGet).then(response => {
  if (!response.ok) { //If there server reports a problem, throw an error!
    throw new Error('Network response was not ok');
  }
  return response.json(); //If not, send the response down the line.

}).then( (data) => {
  for (let i = 0; i < data.length; i++) {
    tasks.push(data[i]);
    displayTask(data[i]['text'], data[i]['priority']);
    numTask++;
  }
});

fetch(apiUrlNum).then(response => {
  if (!response.ok) { //If there server reports a problem, throw an error!
    throw new Error('Network response was not ok');
  }
  return response.json(); //If not, send the response down the line.

}).then( (data) => {
  document.getElementById("numSum").innerText = data[0]["length"];
});

function changeTheme ( theme ) {
  changeBackgroundColor(theme);
  changeTitle(theme);
}
function changeBackgroundColor( theme ) {
   if (theme === 'study') {  
    document.body.style.backgroundColor = "lightblue"; 
    document.body.style.backgroundImage = "url('images/studyImage2.jpg')";
    return (document.body.style.backgroundColor == "lightblue");

  } else if (theme === 'vacation') {
    document.body.style.backgroundColor = "lightyellow";
    document.body.style.backgroundImage = "url('images/vacationImage2.jpg')";
    return (document.body.style.backgroundColor == "lightyellow");
    
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


function changeTitle(theme) {
  switch (theme) {
    case "study":
      document.querySelector("h1").textContent = "To-do List for Study";
      break;
    case "vacation":
      document.querySelector("h1").textContent = "To-do List for Vacation";
      break;
    case "finance":
      document.querySelector("h1").textContent = "To-do List for Finance";
      break;
    case "work":
      document.querySelector("h1").textContent = "To-do List for Work";
      break;
    case "chores":
      document.querySelector("h1").textContent = "To-do List for Housework";
      break;
    case "grocery":
      document.querySelector("h1").textContent = "To-do List for Grocery Shopping";
      break;
  }
}

function displayTask(taskText, priority) {
  const listItem = document.createElement('li'); 
  const importScale = document.createElement('p');

  // Put the task entered as a new item in a list 
  listItem.textContent = taskText;

  // if one of the scale is checked, then add it to the task corresponding to it
  // then uncheck it
  // if the scale isn't checked, then don't add anything
  selecPrio = "";

  if (priority === "Netural") {
    listItem.style.backgroundColor = 'lightblue';
    selecPrio = priorScale[0].value;
    importScale.textContent = `(${priorScale[0].value})`;

  } else if (priority === "Important") {
    listItem.style.backgroundColor = 'lightgreen';
    selecPrio = priorScale[1].value;
    importScale.textContent = `(${priorScale[1].value})`;

  } else if (priority === "Very Important") {
    listItem.style.backgroundColor = 'lightcoral';
    selecPrio = priorScale[2].value;
    importScale.textContent = `(${priorScale[2].value})`;
  }

  listItem.appendChild(importScale);

  // Create a checkbox for each task
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      listItem.style.textDecoration = 'line-through';
    } else {
      listItem.style.textDecoration = 'none';
    }
  });
  listItem.appendChild(checkbox);

  // For every new item/task, create a button 
  const removeButton = document.createElement('button');
  // Make the value of the button 'Remove
  removeButton.textContent = 'Remove';
  // When click on the remove button, pass it on to the function
  removeButton.addEventListener('click', removeTask);
  // removeButton.onclick = () => listItem.remove();
  
  // Add the remove button to each task
  listItem.appendChild(removeButton);
  // Add each task to the end of the list of child of todoList
  todoList.appendChild(listItem);
  // Clear out the input bar'
  todoInput.value = '';
}

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) { // if there is text entered, then add the task to the list
    const listItem = document.createElement('li'); 
    const importScale = document.createElement('p');
    
    // Put the task entered as a new item in a list 
    listItem.textContent = taskText;

    
    // if one of the scale is checked, then add it to the task corresponding to it
    // then uncheck it
    // if the scale isn't checked, then don't add anything
    selecPrio = "";
    for (let i = 0; i < priorScale.length; i++) {
      if (priorScale[i].checked) {

        importScale.textContent = `(${priorScale[i].value})`;

        selecPrio = priorScale[i].value;

        listItem.style.backgroundColor = taskColor[i];
        priorScale[i].checked = false; // Uncheck after using
        break;
      }
    }
    listItem.appendChild(importScale);
    
    // append to server list
    fetch(apiUrl + '?text=' + taskText + '&isDone=' + false + '&priority=' + selecPrio).then(response => {
      if (!response.ok) { //If there server reports a problem, throw an error!
        throw new Error('Network response was not ok');
      }
      return response.json(); //If not, send the response down the line.
    });
    
    // Create a checkbox for each task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        listItem.style.textDecoration = 'line-through';
      } else {
        listItem.style.textDecoration = 'none';
      }
    });
    listItem.appendChild(checkbox);

    // For every new item/task, create a button 
    const removeButton = document.createElement('button');
    // Make the value of the button 'Remove
    removeButton.textContent = 'Remove';
    // When click on the remove button, pass it on to the function
    removeButton.addEventListener('click', removeTask);
    // removeButton.onclick = () => listItem.remove();
    
    // Add the remove button to each task
    listItem.appendChild(removeButton);
    // Add each task to the end of the list of child of todoList
    todoList.appendChild(listItem);
    // Clear out the input bar'
    todoInput.value = '';
    /* Count the number of task. 
    Add one every time a new task is made
    Then display the count to HTML*/
    numTask += 1;
    document.getElementById("numSum").innerText = numTask;

    fetch(apiUrlNum).then(response => {
      if (!response.ok) { //If there server reports a problem, throw an error!
        throw new Error('Network response was not ok');
      }
      return response.json(); //If not, send the response down the line.
    
    }).then( (data) => {
      document.getElementById("numSum").innerText = data[0]["length"];
    });


  } else { 
    alert("Please enter a task!");
    return;
  }
}
function removeTask(event) {
  /* .currentTarget returns the element that triggers the event.
  In this case, it is the removeButton */
  var elmt = event.currentTarget;
  // get the parent element of the button, which is listItem
  var parEle = elmt.parentElement;

  var index = -1;
  for (let i=0; i < numTask; i++) {
    if (parEle.parentElement.children[i] == parEle) {
      index = i;
    } 
  }

  // create a confirmation box
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

  // If click yes button, then remove the listItem
  yesButton.onclick = () => {

    // server
    fetch(apiUrlDel + "?index=" + index).then(response => {
      if (!response.ok) { //If there server reports a problem, throw an error!
        throw new Error('Network response was not ok');
      }
    });

    parEle.remove();
    document.body.removeChild(confirmationBox);
      /* Update the number of task.
    Subtract one everytime the task is deleted
    Then display the count to HTML */
    numTask -= 1;
    document.getElementById("numSum").innerText = Math.max(numTask,0);
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
}

// function sortTask() {
//   // Sort based on the value of the dictionary value

// }
// Add respond event when click on add button
addButton.addEventListener('click', addTask);
// Also respond when press enter
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

addButton.addEventListener('click', addTask);
// Also respond when press enter
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});



// Add an event listener to each checkbox to toggle the crossed-off style
todoList.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const listItem = event.target.parentElement;
    if (event.target.checked) {
      listItem.style.textDecoration = 'line-through';
    } else {
      listItem.style.textDecoration = 'none';
    }
  }
});

//export {changeTitle, addTask, removeTask };
