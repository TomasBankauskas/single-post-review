import React from 'react';
import _ from 'lodash';
import Button from './Button';
import { classNames, safePrefix } from '../utils';
import ThemeCard from './ThemeCard';
import './ThemeShowcase.scss';

export default class ThemeShowcase extends React.Component {

    render() {
        const section = _.get(this.props, 'section', null);
        const body = _.get(section, 'body');
        const title = _.get(section, 'title');
        const theme = _.get(section, 'theme');
        const themes = _.get(section, 'themes', []);
        const classes = classNames('theme-showcase', `theme-showcase-theme-${theme}`);

        return (
            <section className={classes}>
                <div className="theme-showcase-copy">
                    <h2 className="theme-showcase-title">{title}</h2>
                    {body && <p className="theme-showcase-subtitle">{body}</p>}
                </div>

                <div className="theme-showcase-themes">
                    {_.map(themes, (theme, theme_idx) => (
                        <ThemeCard key={theme_idx} {...this.props} section={section} theme={theme}
                        />
                    ))}
                </div>

                {_.get(section, 'actions') && (
                    <div className="theme-showcase-actions">
                        {_.map(_.get(section, 'actions'), (action, action_idx) => (
                            <Button
                                className="theme-showcase-action"
                                key={action_idx}
                                href={
                                    _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                }
                                hollow={_.get(action, 'is_hollow')}
                                ctaArrow={_.get(action, 'has_arrow')}
                                size="small"
                                openInNewWindow={_.get(action, 'new_window')}
                                theme={_.get(section, 'theme') === 'accent' ? 'white' : 'accent'}
                                trackLabel={`Website Button Click`}
                                trackParameters={{ location: _.get(section, 'section_id'), anchorText: _.get(action, 'label') }}
                            >
                                {_.get(action, 'label')}
                            </Button>
                        ))}
                    </div>
                )}

            </section>
        );
    }
}
