import {inject} from 'aurelia-framework';
import {TaskStore} from 'task.store';
import {handle, Dispatcher} from 'aurelia-flux';

@inject(HttpClient,
        Dispatcher,
        TaskStore)
export class ToDoList {
  heading = "To Do List";
  tasks = [];

  constructor(http,
              dispatcher,
              taskStore) {
    this.http = http;
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
