import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskActionConstants} from './task-action-constants';
import {TaskStore} from './task.store';

var ReadonlyTaskViewElement = React.createClass({
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
  onEditClick: function() {
    this.props.dispatch(TaskActionConstants.EDIT_TASK, this.props.task);
  },
  render: function() {
    const style = {
      margin: 10,
      padding: 20
    };
    return (
        <Paper className="ReadonlyTaskView" style={style} zDept={4} key="this.state.task.id">
          <div className="TaskCompleted">
            <Checkbox r
              ref={(ref) => this.completed = ref}
              data-id={this.state.task.id}
              label="Completed"
              defaultChecked={this.state.task.completed}
              onCheck={this.onCheck}
            />
          </div>
          <div className="EditTaskButton">
            <RaisedButton
              tooltip="Edit Task"
              label="Edit"
              labelPosition="before"
              secondary={true}
              icon={<ModeEdit />}
              onMouseDown={this.onEditClick}
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
@customElement('readonly-task-view')
export class ReadonlyTaskView {
  @bindable task = {};
  reactComponent = null;
  dispatcher = null;

  constructor(element, dispatcher, taskStore) {
    this.element = element;
    this.dispatcher = dispatcher;
    this.taskStore = taskStore;
  }

  render() {
    this.reactComponent = ReactDOM.render((
        <ReadonlyTaskViewElement
            task={this.task}
            dispatch={this.dispatcher.dispatch.bind(this.dispatcher)}  />
        ),this.element
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
