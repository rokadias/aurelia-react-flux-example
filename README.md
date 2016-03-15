# Aurelia React Flux Example

## Nodejs
Nodejs is really just being installed for npm (package management) in the ui code, but will be needed for the backend components.

You can usually just install this via your favorite package manager.
Windows has http://chocolatey.org
Mac has Homebrew
Linux has a variety depending on your distribution.

Otherwise more details can be found at nodejs site to install nodejs: https://nodejs.org/download/

## JSPM & Gulp
Next we'll want to install jspm and gulp since those will be the tools we'll use for client side package management and gulp for building. We'll install those globally since they are pretty useful no matter which project you're working with. Since this is installing globally it usually requires root access which is why sudo is there.

     sudo npm install -g jspm
     sudo npm install -g gulp

### Install npm dependencies

Now to install dependencies that this project has and local to only the web directory.

    cd ~/aurelia-react-flux-example/
    npm install
    jspm install -y

### Running the Web Application locally
It's as simple as running...

     cd ~/aurelia-react-flux-example/
     gulp watch

This should start a simple http webserver at http://localhost:9000
with the addition of running BrowserSync. This will allow for aurelia
to reload the application as you make changes on the filesystem.
