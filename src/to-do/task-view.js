import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskStore} from './task.store';

var TaskViewElement = React.createClass({
  getInitialState: function() {
    return {
      task: this.props.task
    };
  },
  render: function() {
    return (
        <div key="this.state.task.id">
          <div className="TaskName">
            Name: {this.state.task.name}
          </div>
          <div className="TaskDescription">
            Description: {this.state.task.description}
          </div>
          <div className="TaskCompleted">
            <input data-id={this.state.task.id} type="checkbox" checked="this.state.task.completed" />
          </div>
        </div>
    );
  }
});

@noView()
@inject(Element, Dispatcher, TaskStore)
@customElement('task-view')
export class TaskView {
  @bindable task = {};
  reactComponent = null;
  dispatcher = null;

  constructor(element, dispatcher, taskStore) {
    this.element = element;
    this.dispatcher = dispatcher;
    this.taskStore = taskStore;
  }

  render() {
    this.reactComponent = React.render(
        <TaskViewElement
            task={this.task}
            dispatch={this.dispatcher.dispatch.bind(this.dispatcher)}  />,
            this.element
    );
  }

  bind() {
    this.render();
  }

  taskChanged() {
    this.reactComponent.setState({
      task: this.task
    });
  }
};
