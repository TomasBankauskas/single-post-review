import React from 'react';
import _ from 'lodash';

import { Link, safePrefix } from '../utils';

export default class FooterLinks extends React.Component {
    render() {
        return (
            <ul className="nav-links">
                {_.map(_.get(this.props, 'links'), (link, link_idx) => (
                    <li key={link_idx}>
                        <Link to={safePrefix(_.get(link, 'url'))}>{_.get(link, 'title')}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}
