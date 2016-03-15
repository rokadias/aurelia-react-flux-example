import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
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
  render: function() {
    const style = {
      margin: 10,
      padding: 20
    };
    return (
      <Paper className="EditTaskView" style={style} zDept={4} key="this.state.task.id">
        <div className="TaskCompleted">
          <Checkbox r
            ref={(ref) => this.completed = ref}
            data-id={this.state.task.id}
            label="Completed"
            defaultChecked={this.state.task.completed}
          />
        </div>
        <div className="TaskName">
          <div className="Value">
            <TextField
              hintText="Grab Milk from Grocery Store"
              floatingLabelText="Name Field"
              defaultValue={this.state.task.name}
            />
          </div>
        </div>
        <div className="TaskDescription">
          <div className="Value">
            <TextField
              hintText="Grab Milk for Conference Tomorrow"
              floatingLabelText="Description Field"
              defaultValue={this.state.task.description}
              fullWidth={true}
            />
          </div>
        </div>
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
