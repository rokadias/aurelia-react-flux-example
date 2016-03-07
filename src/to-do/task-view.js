import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskStore} from './task.store';

var TaskViewElement = React.createClass({
  getInitialState: function() {
    return {
      task: this.props.task
    };
  },
  render: function() {
    const style = {
      width: '100%',
      margin: 20,
      padding: 20
    };
    return (
        <Paper style={style} zDept={4} key="this.state.task.id">
          <div className="TaskCompleted">
            <Checkbox data-id={this.state.task.id} label="Completed" disabled={true} defaultChecked={this.state.task.completed} />
          </div>
          <div className="TaskName">
            <div className="Label">
              Name:
            </div>
            <div className="Value">
              {this.state.task.name}
            </div>
          </div>
          <div className="TaskDescription">
            <div className="Label">
              Description:
            </div>
            <div className="Value">
              {this.state.task.description}
            </div>

          </div>
        </Paper>
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
