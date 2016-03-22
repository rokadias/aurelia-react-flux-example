import {Dispatcher} from 'aurelia-flux';
import React from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskStore} from './task.store';
import {TaskActionConstants} from './task-action-constants';

var AddTaskElement = React.createClass({
  getInitialState: function() {
    return {
      disabled: this.props.disabled
    };
  },
  onAddClicked: function() {
    this.props.dispatch(TaskActionConstants.ADD_TASK);
  },
  render: function() {
    const style = {
      marginTop: 10,
      marginRight: 20,
      float: 'right'
    };
    return (
      <FloatingActionButton style={style} disabled={this.state.disabled} onMouseDown={this.onAddClicked}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
});

@noView
@inject(Element, Dispatcher)
@customElement("add-task-view")
export class AddTaskView {
  @bindable disabled = false;

  constructor(element, dispatcher) {
    this.element = element;
    this.dispatcher = dispatcher;
  }

  render() {
    this.reactComponent = ReactDOM.render(
        <AddTaskElement
          disabled={this.disabled}
          dispatch={this.dispatcher.dispatch.bind(this.dispatcher)}
        />,
      this.element
    );
  }

  bind() {
    this.render();
  }

  disbaledChanged() {
    this.reactComponent.setState({
      disabled: this.disabled
    });
  }
};
