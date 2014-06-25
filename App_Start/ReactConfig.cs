using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactDotNetBrowserify.ReactConfig), "Configure")]

namespace ReactDotNetBrowserify
{
	public static class ReactConfig
	{
		public static void Configure()
		{
			ReactSiteConfiguration.Configuration = new ReactSiteConfiguration();

			// If you want to use server-side rendering of React components, 
			// add all the necessary JavaScript files here. This includes 
			// your components as well as all of their dependencies.
			// See http://reactjs.net/ for more information.

			// Example:
            ReactSiteConfiguration.Configuration
                .AddScript("~/Scripts/Build/serverBundle.js");
		}
	}
}