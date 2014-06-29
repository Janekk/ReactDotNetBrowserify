## Information

A sample of how to use [ASP.NET MVC + React.js integration](http://reactjs.net/) together with [Browserify bundles](http://browserify.org/) and take advantage of both technologies. 

## Goals

* Script and content packages are managed by [npm](https://www.npmjs.org/);
* JavaScript is written modular way, Node.js style;
* Build tasks for scripts and content are configured in [Gulp.js](http://gulpjs.com/) build system 
* When [rendering React components on the server-side](http://reactjs.net/guides/server-side-rendering.html), list only the relevant components, **without having to list their dependencies**. Dependency resolution relies on the npm module resolution algorithm implemented in Browserify.


## Requirements

In order to build project you'll need to have installed:

* Visual Studio (project was created in VS2013 Web Express)
* Node.js
* npm
* Install Gulp.js tool by running ```npm install –g gulp```

## Quick Start

* Install referenced npm packages: ``` npm install ```
* Build and run ASP.NET MVC project in Visual Studio 
	* initial build will automatically install referenced NuGet packages
 

## Usage

If pre-rendering some React components server-side, configure them in [reactServerConfig.json](./reactServerConfig.json):

Example:

	```javascript
	{
	  "expose": [
	    { "path": "./Scripts/App/Components/Todo", "name" : "Todo" },
	    { "path": "./Scripts/App/Components/HelloWorld", "name" : "HelloWorld" }
	  ]
	}
	```
This configuration is processed by the build task to create a special Browserify bundle for the server (See [gulpfile.js](./gulpfile.js)). ReactJS.NET [ReactConfig](./App_Start/ReactConfig.cs) only needs to reference this one bundle file. 

ASP.NET project is configured to trigger the bundling automatically (running gulp task in pre-build event of .NET project).

Additionally, there is a default gulp task to automatically rebuild client-side assets on every change of source scripts; Run the ```gulp``` in command-line to start watching for changes;
 
More detailed informations can be found in [blog article (TBD)](#).

## TODO
...


