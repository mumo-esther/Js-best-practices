export const saveLocal = (list) => {
  window.localStorage.setItem('localTasks', JSON.stringify(list));
}

export const status = (elem, list) => {
  list.forEach((task) => {
    if (task === elem) {
      task.isCompleted = !task.isCompleted;
    }
  });
  saveLocal(list);
}

export const add = (list) => {
  list.push({ description: document.querySelector('#newTask').value, isCompleted: false, index: list.length });
  document.querySelector('#newTask').value = '';
  saveLocal(list);
}

export const updateIndex = (list) => {
  let i = 0;
  list.forEach((elem) => {
    elem.index = i;
    i += 1;
  });
}

export const removeDone = (list) => {
  list = list.filter((elem) => elem.isCompleted === false);
  updateIndex(list);
  saveLocal(list);
}
  
// module.exports = {
//   add,
//   removeDone
// };