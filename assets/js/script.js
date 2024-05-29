// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// let taskCardEl = $('.task-card')

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
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.date);
    const cardDeleteBtn = $('<button>')
      .addClass('btn btn-danger delete')
      .text('Delete')
      .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);  

  if(task.date && task.status !== 'done') {
    const now = dayjs();
    const taskDate = dayjs(task.date, 'DD/MM/YYY');

  if (now.isSame(taskDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
  }

cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
taskCard.append(cardHeader, cardBody);

return taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
const tasks = readTasksFromStorage();

const toDoList = $('#todo-cards');
toDoList.empty();

const inProgressList = $('#in-progress-cards');
inProgressList.empty();

let doneList = $('#done-cards');
doneList.empty();

for (let task of tasks) {
  if (task.status === 'to-do') {
    toDoList.append(createTaskCard(task));

  }else if (task.status === 'in-progress') {
    inProgressList.append(createTaskCard(task))
  } else if (task.status === 'done') {
    doneList.append(createTaskCard(task))
  }
}

$('.task-card').draggable({
  opacity: .7,
  zIndex: 100,
  helper: function (e) {
    // const original = $(e.target).hasClass('ui-draggable')
    // $(e.target)
    // $(e.target).closest('.ui-draggable');

    // return original.clone().css({
    //   width: original.outerWidth(),
    // });
    return $(e.target).clone().css({
      width: $(e.target).outerWidth(),
    });
  },
});
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
  const taskId = $(this).attr('data-task-id');
  const tasks = readTasksFromStorage();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  saveTasksToStorage(tasks);

  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = readTasksFromStorage();

  const taskId = ui.draggable[0].dataset.taskId;
 
  const newStatus = event.target.id;

  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });


$( function() {
  $( "#datepicker" ).datepicker();
} );

$('#saveButton').on('click', handleAddTask);
});

// taskCard.on('click', '.cardDeleteBtn', handleDeleteTask);




// focus on handle add task first. create the object for the modal pop up input. get that saved to local storage. pass that array to create task card. make cards, here you can add the color functionality for warning and late. push that card to a new array lastly return that array and pass it to render task list. where you place the cards based off the ids #todo #inprogress and #done


//Whenever dragging the 