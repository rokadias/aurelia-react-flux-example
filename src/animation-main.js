import config from './users/auth-config';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-flux')
    .plugin('aurelia-animator-css')
    .plugin('paulvanbladel/aurelia-auth', baseConfig => {
      baseConfig.configure(config);
    });

  aurelia.start().then(a => a.setRoot());
}
