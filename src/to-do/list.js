import {inject} from 'aurelia-framework';
import {TaskStore} from './task.store';
import {TaskActionConstants} from './task-action-constants';
import {handle, Dispatcher} from 'aurelia-flux';

@inject(Dispatcher,
        TaskStore)
export class ToDoList {
  heading = "To Do List";
  tasks = [];

  constructor(dispatcher,
              taskStore) {
    this.dispatcher = dispatcher;
    this.taskStore = taskStore;
  }

  activate(params) {
    return this.taskStore.requestTasks();
  }

  @handle(TaskActionConstants.TASKS_RETRIEVED)
  handleTasksRetrieved(action, tasks) {
    this.tasks = tasks;
  }
};
