import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';
import AppRouterConfig from 'router-config';
import injectTapEventPlugin from 'react-tap-event-plugin';

@inject(Router, HttpClientConfig, AppRouterConfig)
export class App {

  constructor(router, httpClientConfig, appRouterConfig) {
    injectTapEventPlugin();

    this.router = router;

    // Client configuration provided by the aureliaauth plugin
    this.httpClientConfig = httpClientConfig;

    // The applicaiton's configuration, including the
    // route definitions that we've declared in router-config.js
    this.appRouterConfig = appRouterConfig;

  }

  attached() {
  }

  activate() {
    // Here's were we actually run the configuration when the app loads.
    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
  }
};
