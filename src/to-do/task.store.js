import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {handle, Dispatcher} from 'aurelia-flux';
import {TaskActionConstants} from './task-action-constants';
import _ from 'lodash';

@inject(HttpClient, Dispatcher)
export class TaskStore {
  tasks = [];
  url_tasks = '/data/tasks.json';

  constructor(http, dispatcher) {
    this.http = http;
    this.dispatcher = dispatcher;
  }n

  requestTasks() {
    if (this.tasks) {
      dispatchTasksRetrieved(this.tasks);
      return Promise.resolve(this.tasks);
    }

    return this.http.get(url_tasks).then(tasks_response => {
      this.tasks = JSON.parse(tasks_response.response);
      dispatchTasksRetrieved(tasks);
    });
  }

  dispatchTasksRetrieved(tasks) {
    this.dispatcher.dispatch(CrfActionConstants.TASKS_RETRIEVED, tasks);
  }

  @handle(TaskActionConstants.TASK_COMPLETED)
  handleCrfFieldVerified(action, task) {
    task.completed = true;
  }

  @handle(TaskActionConstants.TASK_COMPLETE_CLEARED)
  handleCrfFieldRejected(action, task) {
    task.completed = false;
  }
}
