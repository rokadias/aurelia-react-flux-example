import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Assignment from 'material-ui/lib/svg-icons/action/assignment';
import {white} from 'material-ui/lib/styles/colors';
import {customElement, inject, bindable, noView} from 'aurelia-framework';
import _ from 'lodash';

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
      title: this.props.title,
      open: false
    };
  },
  menuIconClicked: function() {
    this.setState({ open: !this.state.open });
  },
  menuItemClicked: function(locationHref) {
    this.state.router.navigate(locationHref);
  },
  render: function() {
    var menuItems =
      _.map(this.state.router.navigation, function (row) {
        return (
            <MenuItem
              primaryText={row.title}
              leftIcon={<Assignment />}
              disabled={row.isActive}
              key={row.title}
              onTouchTap={this.menuItemClicked.bind(this, row.relativeHref)}
            />
        );
      }, this);
    return (
      <div>
        <AppBar
          title={this.state.title}
          onLeftIconButtonTouchTap={this.menuIconClicked}
        />
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={this.menuItems}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          { menuItems }
        </LeftNav>
      </div>
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
