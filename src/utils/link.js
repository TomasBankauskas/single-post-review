import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { track } from '../services/analytics-service';

const getExternalClickHandler = (trackLabel, trackParameters, url, originalOnClick) => {
    if (!trackLabel) return originalOnClick;

    return function (event) {
        event.preventDefault();

        track(trackLabel, trackParameters).then(() => {
            window.location = url;
        });

        if (typeof originalOnClick === 'function') {
            return originalOnClick.apply(this, arguments);
        }
    };
};

const getInternalClickHandler = (trackLabel, trackParameters) => {
    if (!trackLabel) return;

    return () => track(trackLabel, trackParameters || {});
};

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, trackLabel, trackParameters, ...other }) => {
    // Tailor the following test to your environment.
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    const internal = /^\/(?!\/)/.test(to);

    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
        return (
            <GatsbyLink
                onClick={getInternalClickHandler(trackLabel, trackParameters)}
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}
            >
                {children}
            </GatsbyLink>
        );
    }
    return (
        <a href={to} {...other} onClick={getExternalClickHandler(trackLabel, trackParameters, to, other.onClick)}>
            {children}
        </a>
    );
};

export default Link;
