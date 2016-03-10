import {AuthorizeStep} from 'paulvanbladel/aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

// Using Aurelia's dependency injection, we inject Router
// with the @inject decorator
@inject(Router)

export default class {

  constructor(router) {
    this.router = router;
  }

  configure() {
    var appRouterConfig = function(config) {

      config.title = 'Example';
      config.options.pushState = true;

      // Here we hook into the authorize extensibility point
      // to add a route filter so that we can require authentication
      // on certain routes
      config.addPipelineStep('authorize', AuthorizeStep);

      // Here we describe the routes we want along with authorization level
      // needed, the module to use, and whether they should be included in
      // the navigation bar

      config.map([
        {
          route: ['', 'todo/list'],
          name: 'ToDoList',
          moduleId: './to-do/list',
          nav: true,
          title: 'To Do List',
          authRoute: true
        },
        {
          route: 'old/todo/list',
          name: 'OldToDoList',
          moduleId: './old/to-do/list',
          nav: true,
          title: 'Old To Do List',
          authRoute: true
        },
        // Users Section of the Site including logins
        {
          route: 'signup',
          name: 'signup',
          moduleId: './users/signup',
          nav: false,
          title: 'Signup',
          authRoute: false
        },
        {
          route: 'login',
          name: 'login',
          moduleId: './users/login',
          nav: false,
          title: 'Login',
          authRoute: true
        },
        {
          route: 'logout',
          name: 'logout',
          moduleId: 'users/logout',
          nav: false,
          title: 'Logout',
          authRoute: true
        }
      ]);
    };

    // The router is configured with what we specify in the appRouterConfig
    this.router.configure(appRouterConfig);
  }
}
