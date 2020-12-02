
exports.onInitialClientRender = () => {
    window.analytics.ready(() => {
        window.AnalyticsInit.ready(() => {
            window.AnalyticsInit.init();
            window.analytics.page(document.title);
        });
    });
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
    if (!prevLocation) {
        return;     // initial pageview;
    }
    if (!window.analytics || typeof window.analytics.page !== 'function') {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Unable to locate analytics.js');
        }
        return;
    }

    window.analytics.page();
}
