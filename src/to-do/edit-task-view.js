import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskStore} from './task.store';
import {TaskActionConstants} from './task-action-constants';

var EditTaskViewElement = React.createClass({
  getInitialState: function() {
    return {
      task: this.props.task
    };
  },
  onEditClick: function() {
    var task = this.state.task;
    task.completed = this.completed.isChecked();
    task.name = this.taskName.getValue();
    task.description = this.taskDescription.getValue();
    this.props.dispatch(TaskActionConstants.SAVE_EDIT_TASK, task);
  },
  render: function() {
    const buttonStyle = {
      margin: 12,
      float: "right"
    };

    const style = {
      margin: 10,
      padding: 20
    };
    return (
      <Paper className="EditTaskView" style={style} zDept={4} key="this.state.task.id">
        <div className="TaskCompleted">
          <Checkbox
            ref={(ref) => this.completed = ref}
            data-id={this.state.task.id}
            label="Completed"
            defaultChecked={this.state.task.completed}
          />
        </div>
        <div className="TaskName">
          <div className="Value">
            <TextField
              ref={(ref) => this.taskName = ref}
              hintText="Grab Milk from Grocery Store"
              floatingLabelText="Name Field"
              defaultValue={this.state.task.name}
            />
          </div>
        </div>
        <div className="TaskDescription">
          <div className="Value">
            <TextField
              ref={(ref) => this.taskDescription = ref}
              hintText="Grab Milk for Conference Tomorrow"
              floatingLabelText="Description Field"
              defaultValue={this.state.task.description}
              fullWidth={true}
            />
          </div>
        </div>
        <RaisedButton
          label="Cancel"
          style={buttonStyle}
          labelPosition="before"
        />
        <RaisedButton
          label="Save"
          style={buttonStyle}
          labelPosition="before"
          onMouseDown={this.onEditClick}
        />
        <div style={ {  clear: "both" } } />
      </Paper>
    );
  }
});

@noView()
@inject(Element, Dispatcher, TaskStore)
@customElement('edit-task-view')
export class EditTaskView {
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
        <EditTaskViewElement
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
