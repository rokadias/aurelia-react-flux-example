import {handle, Dispatcher} from 'aurelia-flux';
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

  @handle(TaskActionConstants.EDIT_TASK)
  handleEditTask(action, task) {
    if (this.task === task) {
      this.editing = true;
    }
  }
};
