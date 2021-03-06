import {handle, waitFor, Dispatcher} from 'aurelia-flux';
import React from 'react';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskActionConstants} from './task-action-constants';
import {TaskStore} from './task.store';

@inject(Element, Dispatcher, TaskStore)
@customElement('task-view')
export class TaskView {
  @bindable task = {};
  @bindable editing = false;
  dispatcher = null;

  constructor(element, dispatcher, taskStore) {
    this.element = element;
    this.dispatcher = dispatcher;
    this.taskStore = taskStore;
  }

  @handle(TaskActionConstants.SAVE_EDIT_TASK)
  @waitFor(TaskStore)
  handleSaveEditTask(action, task) {
    if (this.task.clientId === task.clientId) {
      this.task = task;
      this.taskChanged();
    }
  }

  @handle(TaskActionConstants.CANCEL_EDIT_TASK)
  @waitFor(TaskStore)
  handleCancelEditTask(action, task) {
    if (this.task.clientId == task.clientId) {
      this.task = task;
      this.taskChanged();
    }
  }

  @handle(TaskActionConstants.EDIT_TASK)
  handleEditTask(action, task) {
    if (this.task.clientId === task.clientId) {
      task.editing = true;
      this.taskChanged();
    }
  }

  @handle(TaskActionConstants.TASK_ADDED)
  handleTaskAdded(action, task) {
    if (this.task.clientId === task.clientId) {
      this.taskChanged();
    }
  }

  taskChanged() {
    this.editing = !!this.task.editing;
  }
};
