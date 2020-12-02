function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const _react = require("react");

const _react2 = _interopRequireDefault(_react);

exports.onRenderBody = function (_ref, pluginOptions) {
    const analyticsKey = process.env.NODE_ENV === "production" ? pluginOptions.prodKey : pluginOptions.devKey;
    const analyticsEnv = process.env.NODE_ENV === "production" ? 'prod' : 'dev';

    const snippet = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://analytics.stackbit.com/analytics.${analyticsEnv}.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
    analytics.load('${analyticsKey}');
}}();
window.AnalyticsInit=window.AnalyticsInit||{queue:[]};window.AnalyticsInit.ready=window.AnalyticsInit.ready||function(f){window.AnalyticsInit.queue.push(f);};
var u=document.createElement("script");u.type="text/javascript";u.async=!0;u.src="https://assets.stackbit.com/js/analytics_init.js";
var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(u,n);`;
    _ref.setHeadComponents([_react2.default.createElement('script', {
        key: 'plugin-segment',
        dangerouslySetInnerHTML: { __html: snippet }
    })]);
};
