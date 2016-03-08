import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Assignment from 'material-ui/lib/svg-icons/action/assignment';
import {customElement, inject, bindable, noView} from 'aurelia-framework';

const style = {
  menu: {
    marginRight: 32,
    marginBottom: 32,
    float: 'left',
    position: 'relative',
    zIndex: 0
  }
};

var AppBarElement = React.createClass({
  getInitialState: function() {
    return {
      router: this.props.router,
      title: this.props.title
    };
  },
  render: function() {
    return (
        <AppBar
          title={this.state.title}
          iconElementLeft={
            <IconMenu
              iconButtonElement={<IconButton><MenuIcon /></IconButton>}
              >
                <MenuItem primaryText="List" leftIcon={<Assignment />} />
                <MenuItem primaryText="To Do" leftIcon={<Assignment />} />
            </IconMenu>
          }
        />
    );
  }
});

@noView()
@inject(Element)
@customElement("app-bar")
export class AppBarView {
  @bindable router = {};
  @bindable title = "";

  constructor(element) {
    this.element = element;
  }

  render() {
    this.reactComponent = React.render(
      <AppBarElement
        router={this.router}
        title = {this.title} />,
      this.element
    );
  }

  bind() {
    this.render();
  }

  routerChanged() {
    this.reactComponent.setState({
      router: this.router
    });
  }

  titleChanged() {
    this.reactComponent.setState({
      title: this.title
    });
  }
};
