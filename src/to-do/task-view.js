import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskActionConstants} from './task-action-constants';
import {TaskStore} from './task.store';

var TaskViewElement = React.createClass({
  getInitialState: function() {
    return {
      task: this.props.task
    };
  },
  onCheck: function() {
    var action;
    if (this.completed.Checked) {
      action = TaskActionConstants.TASK_COMPLETE_CLEARED;
    } else {
      action = TaskActionConstants.TASK_COMPLETED;
    }
    this.props.dispatch(action, this.state.task);
  },
  render: function() {
    const style = {
      margin: 10,
      padding: 20
    };
    return (
        <Paper style={style} zDept={4} key="this.state.task.id">
          <div className="TaskCompleted">
            <Checkbox r
              ref={(ref) => this.completed = ref}
              data-id={this.state.task.id}
              label="Completed"
              defaultChecked={this.state.task.completed}
              onCheck={this.onCheck}
            />
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
