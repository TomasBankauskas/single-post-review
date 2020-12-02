/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');
const safePrefix = require('./src/utils/safePrefix').default;

exports.onRenderBody = function ({ setHeadComponents, setPostBodyComponents }) {
    setHeadComponents([]);

    setPostBodyComponents([
        <React.Fragment>
            <script src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
            <script src={safePrefix('assets/js/plugins.js')} />
            <script src={safePrefix('assets/js/page_load.js')} />
        </React.Fragment>
    ]);
};
