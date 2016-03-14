import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

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
      marginLeft: 15,
      float: 'right'
    };
    return (
      <FloatingActionButton style={style} disabled={this.state.disabled} onMouseDown={this.onAddClicked}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
});
