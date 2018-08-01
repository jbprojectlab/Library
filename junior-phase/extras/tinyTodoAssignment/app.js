console.log('Your JavaScript is running, better go catch it!')

/*
Tasks:

1. When you click the 'Add Task' button, a <li> task is created.
  Hints:
    - Form elements can be 'submit'ted by giving a button the attribute `type="submit"`. (This is done for you)
    - Then we can add an event listener on the form, listening for the 'submit' event to be triggered.
    - When you click the button and your form submits, you'll notice that the entire page reloads, and you lose your data! We don't want that! The default form submission behavior is NOT what we want. So we will need to add `evt.preventDefault` (evt being whatever you named your event object passed to the callback when you created your event listener) to the top of our callback.
    - If you add the event listener to the form, the `this` object and the target is the form. To get to the value inside the input, we can use `evt.target.task.value` where 'task' is the name of the input element
    - Now you just need to create the li element, and append it to the ul.

2. When you click on a task (or a checkbox next to the task) the task is crossed out
  Hints:
    - If you add the event listener to the ul, then you don't need one for each li... remember, the 'evt.target' will show you what element you clicked
    - We can change styles of an element easily by adding or removing classes
    - Do a quick Google search on how to create a strike-through effect with CSS

3. Create a delete button for each task that will take that task off the DOM!
  - No hints for you ;)
*/

// get elements we'll need to manipulate elsewhere
const taskForm = document.getElementById('form');
const taskList = document.getElementById('list');

// handle the submit event for the form
taskForm.addEventListener('submit', (event) => {
  // prevent the form submit event from triggering a POST request (and thus refreshing the page)
  event.preventDefault();
  // create a new task element
  const taskElement = document.createElement('li');
  // assign that new task element's text the form's input value
  taskElement.innerText = taskForm.task.value;
  // create a delete button element with text 'x'
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'x';
  // add the delete button to the end of the task list element
  taskElement.appendChild(deleteButton);
  // add the task element to the DOM (as a child of the task list)
  taskList.appendChild(taskElement);
  // clear the input's value (so that a user can start typing the next task without any clutter)
  taskForm.task.value = '';
});

// event delegation pattern
taskList.addEventListener('click', (event) => {
  // capture the element that was ACTUALLY clicked
  const clickedElement = event.target;
  if (clickedElement.tagName === 'LI') {
    // toggle the clicked element's strike-through
    clickedElement.classList.toggle('crossed-out');
  } else if (clickedElement.tagName === 'BUTTON') {
    // remove the list element from the DOM
    clickedElement.parentElement.remove();
  }
});
