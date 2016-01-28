import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut
    , mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App(mockedRouter);
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Example');
  });

  it('should have a todo list route', () => {
    expect(sut.router.routes).toContain({
      route: ['','todo/list'],
      moduleId: './to-do/list',
      nav: true,
      title:'ToDoList',
      authRoute: true
    });
  });

  // User routes
  it('should have a signup route', () => {
    expect(sut.router.routes).toContain({
      route: 'signup',
      moduleId: './users/signup',
      nav: false,
      title:'signup',
      authRoute: false
    });
  });

  it('should have a login route', () => {
    expect(sut.router.routes).toContain({
      route: 'login',
      name: 'login',
      moduleId: './users/login',
      nav: false,
      title: 'Login',
      authRoute: false
    });
  });

  it('should have a login route', () => {
    expect(sut.router.routes).toContain({
      route: 'logout',
      name: 'logout',
      moduleId: 'users/logout',
      nav: false,
      title: 'Logout',
      authRoute: true
    });
  });
});
