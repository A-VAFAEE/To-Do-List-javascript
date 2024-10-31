// Select elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    
    // Add a remove button
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
