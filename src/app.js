import 'modernizr';
import $ from 'jquery';
import 'fastclick';
import 'foundation';
import 'foundation/css/foundation.css!';
import 'foundation/js/foundation/foundation.offcanvas';
import 'foundation/js/foundation/foundation.reveal';
import 'foundation/js/foundation/foundation.topbar';

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';
import AppRouterConfig from 'router-config';

@inject(Router, HttpClientConfig, AppRouterConfig)
export class App {

  constructor(router, httpClientConfig, appRouterConfig) {

    this.router = router;

    // Client configuration provided by the aureliaauth plugin
    this.httpClientConfig = httpClientConfig;

    // The applicaiton's configuration, including the
    // route definitions that we've declared in router-config.js
    this.appRouterConfig = appRouterConfig;
  }

  attached() {
    $(document).foundation();
  }

  activate() {
    // Here's were we actually run the configuration when the app loads.
    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
  }
};