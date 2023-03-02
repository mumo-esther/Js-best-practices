import {add, removeDone} from './status.js'

const { describe, test, expect, beforeEach } = require('@jest/globals');

describe('add() and removeDone() functions', () => {
  let list;

  beforeEach(() => {
    // Set up mock DOM elements
    document.body.innerHTML = `   
    <ul id="todo-list">
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>     
      </ul>
      <input type="text" id="newTask" value="New task">
    `;
    
    // Initialize list
    list = [ { description: 'Task 1', isCompleted: false, index: 0 },      { description: 'Task 2', isCompleted: true, index: 1 },      { description: 'Task 3', isCompleted: false, index: 2 }, ];
  });

  afterEach(() => {
    // Reset mock DOM elements
    document.body.innerHTML = '';
  });

  test('add() should add exactly one <li> element to the list in the DOM', () => {
    add(list);
    const liElements = document.querySelectorAll('#todo-list li');
    expect(liElements.length).toBe(4);
  });

  test('removeDone() should remove exactly one <li> element from the list in the DOM', () => {
    removeDone(list);
    const liElements = document.querySelectorAll('#todo-list li');
    expect(liElements.length).toBe(2);
  });
});
