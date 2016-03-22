import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {handle, Dispatcher} from 'aurelia-flux';
import {TaskActionConstants} from './task-action-constants';
import _ from 'lodash';

@inject(HttpClient, Dispatcher)
export class TaskStore {
  url_tasks = '/data/tasks.json';
  new_prefix = 'new';
  new_regex = /^new(\d+)$/;
  client_id_next = 1;

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
      var initId = 1;
      _.forEach(this.tasks, (task) => task.clientId = initId++);
      this.dispatchTasksRetrieved(this.tasks);
    }, this);
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
    var taskNumbers = _.map(this.tasks, function(task) {
      if (this.new_regex.test(task.id)) {
        return Number(this.new_regex.exec(task.id)[1]);
      }

      return 0;
    }, this);
    var nextId = _.max(taskNumbers) + 1;
    var task = {
      "clientId": this.getNextClientId(),
      "id": this.new_prefix + nextId,
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
    if (this.new_regex.test(task.id)) {
      _.remove(this.tasks, function(iTask) {
        return task.id === iTask.id;
      });
      this.tasks.push(task);
    }
    task.id = task.name.replace(" ", "_").trim().toLowerCase();
    task.editing = false;
    this.dispatcher.dispatch(TaskActionConstants.TASKS_RETRIEVED, this.tasks);
  }

  @handle(TaskActionConstants.CANCEL_EDIT_TASK)
  handleCancelEditTask(action, task) {
    if (this.new_regex.test(task.id)) {
      _.remove(this.tasks, function(iTask) {
        return task.clientId === iTask.clientId;
      });
    } else {
      task.editing = false;
    }
    this.displatcher.dispatch(TaskActionConstants.TASKS_RETRIEVED, this.tasks);
  }

  getNextClientId() {
    return _.max(_.map(this.tasks, (task) => task.clientId)) + 1;
  }
}
