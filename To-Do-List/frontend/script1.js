const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const priorScale = document.getElementsByName('prioritize'); // this returns a collection of elements with the name "prioritize"
console.log(priorScale);
const summary = document.getElementsByClassName('summaryBox');
var numTask = 0;
var taskColor = ['lightblue', 'lightgreen', 'lightcoral'];
// Declare a new dictionary
var dictTask = {}; 

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
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) { // if there is text entered, then add the task to the list
    const listItem = document.createElement('li'); 
    const importScale = document.createElement('p');
    
    // console.log(importScale);
    // Put the task entered as a new item in a list 
    listItem.textContent = taskText;
    
    // if one of the scale is checked, then add it to the task corresponding to it
    // then uncheck it
    // if the scale isn't checked, then don't add anything
    for (let i = 0; i < priorScale.length; i++) {
      if (priorScale[i].checked) {
        // dictTask[taskText] = priorScale[i].id;
        importScale.textContent = `(${priorScale[i].value})`;
        listItem.style.backgroundColor = taskColor[i];
        priorScale[i].checked = false; // Uncheck after using
        break;
      } else {
        dictTask[taskText] = "0";
      }
    }
    listItem.appendChild(importScale);
    
    
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
    parEle.remove();
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

  
  /* Update the number of task.
  Subtract one everytime the task is deleted
  Then display the count to HTML */
  numTask -= 1;
  document.getElementById("numSum").innerText = numTask;
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