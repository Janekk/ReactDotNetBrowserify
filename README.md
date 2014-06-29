## Information

A sample of how to use [React.js integration for ASP.NET MVC](http://reactjs.net/) together with [Browserify bundles](http://browserify.org/) and take advantage of both technologies. 

## Features

- Use [npm](https://www.npmjs.org/) packages for external JS dependencies;
- Write modular Javascript code Node.js style
- In case of [server-side rendering of React components](http://reactjs.net/guides/server-side-rendering.html) it is possible to define a Browserify bundle for the server. Such bundle requires only listing of used components **without listing their dependencies**. Dependency resolution relies on the npm module resolution algorithm implemented in Browserify. This makes the configuration of server-side bundle simplier.
- Define build tasks for scripts and content in [Gulp.js](http://gulpjs.com/) build system

## Requirements

In order to build project you'll need to have installed:

- Visual Studio (project was created in VS2013 Web Express)
- Node.js
- npm

## Quick Start

* Install referenced npm packages: ``` npm install ```
* Build and run ASP.NET MVC project in Visual Studio 
..* initial build will automatically install referenced NuGet packages
 

## Usage

- In reactServerConfig.json list all React components to be pre-rendered server-side.

	Example:

	```javascript
	{
	  "expose": [
	    { "path": "./Scripts/App/Components/Todo", "name" : "Todo" },
	    { "path": "./Scripts/App/Components/HelloWorld", "name" : "HelloWorld" }
	  ]
	}
	```
- Build of ASP.NET project will trigger a build of bundle for the server;
- There is a default gulp task to automatically rebuild client-side assets for every change; Run the ```gulp``` command to start watching;
 

## TODO


