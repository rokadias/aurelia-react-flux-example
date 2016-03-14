import {Dispatcher} from 'aurelia-flux';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import {TaskStore} from './task.store';
import {TaskActionConstants} from './task-action-constants';
import AddTaskElement from './add-task-view-element';

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
