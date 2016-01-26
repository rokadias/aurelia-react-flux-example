import {AuthService} from 'paulvanbladel/aurelia-auth';
import {inject, noView} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@noView
@inject(AuthService, Router)
export class Logout {

  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  activate() {
    // When we get to the logout route, the logout
    // method on the auth service will be called
    // and we will be redirected to the login view
    this.authService.logout(this.router.generate('login'))
      .then(response => {
        console.log("Logged Out");
      })
      .catch(err => {
        console.log("Error Logging Out");
      });
  }
}
