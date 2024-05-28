// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//Created funtion to read tasks from Local Storage
function readTasksFromStorage() {

  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks) {
    tasks = [];
  }

  return tasks;
}

// Created funtion to save tasks to Local Storage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Todo: create a function to generate a unique task id
function generateTaskId() {
  return crypto.randomUUID();

}

// Todo: create a function to create a task card
function createTaskCard(task) {

  // const taskCard = $('<div>')
  //   .addClass('card project-card draggable my-3')
  //   .attr('data-task-id', task.id);
  //   const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  //   const cardBody = $('<div>').addClass('card-body');
  //   const cardDescription = $('<p>').addClass('card-text').text(task.description);
  //   const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
  //   const cardDeleteBtn = $('<button>')
  //     .addClass('btn btn-danger delete')
  //     .text('Delete')
  //     .attr('data-task-id', task.id);
  // cardDeleteBtn.on('click', handleDeleteTask)  
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();
  const taskTitle = $('#inputTitle').val().trim();  
  const taskDate = $('#inputDate').val();
  const taskDescription = $('#inputDescription').val();

 
  const newTask = {
   id: generateTaskId(),
   title: taskTitle,
   date: taskDate,
   description: taskDescription,
   status: 'to-do'
  };

  const tasks = readTasksFromStorage();
 
  tasks.push(newTask);

  saveTasksToStorage(tasks);

  $('#formModal').modal('hide');

  renderTaskList(tasks);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


$( function() {
  $( "#datepicker" ).datepicker();
} );


});




// focus on handle add task first. create the object for the modal pop up input. get that saved to local storage. pass that array to create task card. make cards, here you can add the color functionality for warning and late. push that card to a new array lastly return that array and pass it to render task list. where you place the cards based off the ids #todo #inprogress and #done