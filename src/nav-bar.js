import 'foundation';
import 'foundation/js/foundation/foundation.dropdown';
import {inject} from 'aurelia-framework';
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {bindable} from 'aurelia-framework';

@inject(AuthService)
export class NavBar {
  @bindable router = null;

  constructor(auth) {
    this.auth = auth;
  };

  // We can check if the user is authenticated
  // to conditionally hide or show nav bar items
  get isAuthenticated() {
    return this.auth.isAuthenticated();
  };
}
