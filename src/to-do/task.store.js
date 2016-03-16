import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {handle, Dispatcher} from 'aurelia-flux';
import {TaskActionConstants} from './task-action-constants';
import _ from 'lodash';

@inject(HttpClient, Dispatcher)
export class TaskStore {
  url_tasks = '/data/tasks.json';

  constructor(http, dispatcher) {
    this.http = http;
    this.dispatcher = dispatcher;
  }

  requestTasks() {
    if (this.tasks) {
      this.dispatchTasksRetrieved(this.tasks);
      return Promise.resolve(this.tasks);
    }

    return this.http.get(this.url_tasks).then(tasks_response => {
      this.tasks = JSON.parse(tasks_response.response);
      this.dispatchTasksRetrieved(this.tasks);
    });
  }

  dispatchTasksRetrieved(tasks) {
    this.dispatcher.dispatch(TaskActionConstants.TASKS_RETRIEVED, tasks);
  }

  @handle(TaskActionConstants.TASK_COMPLETED)
  handleTaskCompleted(action, task) {
    task.completed = true;
  }

  @handle(TaskActionConstants.TASK_COMPLETE_CLEARED)
  handleTaskCompleteCleared(action, task) {
    task.completed = false;
  }

  @handle(TaskActionConstants.ADD_TASK)
  handleAddTask(action) {
    var task = {
      "id": "",
      "name": "",
      "description": "",
      "completed": false
    };
    task.editing = true;
    this.tasks.push(task);
    this.dispatcher.dispatch(TaskActionConstants.TASKS_RETRIEVED, this.tasks);
    this.dispatcher.dispatch(TaskActionConstants.TASK_ADDED, task);
  }

  @handle(TaskActionConstants.SAVE_EDIT_TASK)
  handleEditTask(action, task) {
    _.remove(this.tasks, function(iTask) {
      return task === iTask || task.id === iTask.id;
    });
    task.id = task.name.replace(" ", "_").trim().toLowerCase();
    task.editing = false;
    this.tasks.push(task);
    this.dispatcher.dispatch(TaskActionConstants.TASKS_RETRIEVED, this.tasks);
  }
}
