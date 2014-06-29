## Information

A sample of how to use [ASP.NET MVC + React.js integration](http://reactjs.net/) together with [Browserify bundles](http://browserify.org/) and take advantage of both technologies. 

## Features

* Script and content packages are managed by [npm](https://www.npmjs.org/);
* Write modular JS code, Node.js style, thanks to Browserify
* When [rendering React components on the server-side](http://reactjs.net/guides/server-side-rendering.html) you only need to list the relevant components, **without having to list their dependencies**. Dependency resolution relies on the npm module resolution algorithm implemented in Browserify. This makes the configuration of server-side bundle simplier. 
* Build tasks for scripts and content are configured in [Gulp.js](http://gulpjs.com/) build system

## Requirements

In order to build project you'll need to have installed:

* Visual Studio (project was created in VS2013 Web Express)
* Node.js
* npm

## Quick Start

* Install referenced npm packages: ``` npm install ```
* Build and run ASP.NET MVC project in Visual Studio 
	* initial build will automatically install referenced NuGet packages
 

## Usage

If pre-rendering components server-side, list all React components in [reactServerConfig.json](./reactServerConfig.json).

	Example:

	```javascript
	{
	  "expose": [
	    { "path": "./Scripts/App/Components/Todo", "name" : "Todo" },
	    { "path": "./Scripts/App/Components/HelloWorld", "name" : "HelloWorld" }
	  ]
	}
	```
This config is processed during the build to create a special Browserify bundle for the server (See [gulpfile.js](./gulpfile.js)). ASP.NET ReactConfig class only needs to reference this one bundle file. 

ASP.NET project is configured to trigger the bundling automatically (running gulp in pre-build event).

Additionally, there is a default gulp task to automatically rebuild client-side assets on every change of source scripts; Run the ```gulp``` command to start watching for changes;
 
More detailed informations can be found in [this blog article](#).

## TODO


