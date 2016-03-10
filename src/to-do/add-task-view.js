import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import {customElement, inject, bindable, noView} from 'aurelia-framework';

var AddTaskElement = React.createClass({
  render: function() {
    const style = {
      marginLeft: 15,
      float: 'right'
    };
    return (
      <FloatingActionButton style={style}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
});

@noView
@inject(Element)
@customElement("add-task-view")
export class AddTaskView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.reactComponent = React.render(
            <AddTaskElement />,
            this.element
        );
    }

    bind() {
        this.render();
    }
};
