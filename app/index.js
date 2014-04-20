'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ToastyBackboneBrowserifyGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic ToastyBackboneBrowserify generator.'));

    var prompts = [
    {
      name: 'appName',
      message: 'What is the name of the app you want to build? '
    },
    {
      name: 'appDescription',
      message: 'Describe your app: '
    },
    {
      name: 'authorName',
      message: 'What is your name?'
    },
    {
      name: 'authorEmail',
      message: 'What is your email?'
    }];

    this.prompt(prompts, function (props) {
      this.appName        = props.appName;
      this.appDescription = props.appDescription;
      this.authorName     = props.authorName;
      this.authorEmail    = props.authorEmail;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/assets');
    this.mkdir('app/assets/images');
    this.mkdir('app/assets/css');
    this.mkdir('app/src/templates')
    this.mkdir('app/src/js');
    this.mkdir('app/src/js/models');
    this.mkdir('app/src/js/collections');
    this.mkdir('app/src/js/views');
    this.mkdir('app/src/js/collectionViews');
    this.mkdir('app/src/js/routers');

    this.mkdir('api');
    this.mkdir('api/routes');
    this.mkdir('api/models');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('server.js', 'server.js');
    this.template('index.html', 'app/src/index.html');
    this.template('client.js', 'app/src/js/client.js');
    this.template('bowerrc', '.bowerrc');
    this.template('bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ToastyBackboneBrowserifyGenerator;
