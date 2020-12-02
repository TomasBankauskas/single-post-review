import React from 'react';
import _ from 'lodash';
import Button from './Button';
import { Link, safePrefix, getData } from '../utils';
import './ThemeCard.scss';

export default class ThemeCard extends React.Component {
    render() {
        const section = _.get(this.props, 'section', null);
        const section_id = _.get(section, 'section_id');
        const theme = _.get(this.props, 'theme', null);
        const themeData = getData(this.props.pageContext.site.data, theme);
        const themeLink = themeData.link;
        const themeTitle = themeData.title;

        return (
            <div className="theme-showcase-theme-wrapper">
                <div className="theme-card theme-showcase-theme">
                    <figure className="theme-card-preview">
                        {themeLink ? (
                            <Link
                                to={safePrefix(themeLink)}
                                className="theme-card-link"
                                trackLabel={`Website Image Click`}
                                trackParameters={{ location: `${section_id}`, anchorText: `${themeTitle} More Info` }}
                            >
                                <img className="theme-card-image" src={safePrefix(themeData.image)} alt={`${themeTitle} theme preview`} />
                            </Link>
                        ) :
                            <Link
                                to={safePrefix(themeData.preview_url)}
                                className="theme-card-link"
                                trackLabel={`Website Image Click`}
                                trackParameters={{ location: `${section_id}`, anchorText: `${themeTitle} Live Preview` }}
                            >
                                <img className="theme-card-image" src={safePrefix(themeData.image)} alt={`${themeTitle} theme preview`} />
                            </Link>
                        }
                    </figure>

                    <div className="theme-card-content">
                        {_.get(section, 'title', null) ? (
                            <h3 className="theme-card-name">{themeTitle}</h3>
                        ) : (
                                <h2 className="theme-card-name">{themeTitle}</h2>
                            )}

                        {themeData.description && (
                            <p className="theme-card-description">{themeData.description}</p>
                        )}

                        <div className="theme-card-actions">

                            <Button
                                className="theme-card-action"
                                ctaArrow
                                size="small"
                                theme="accent"
                                href={safePrefix(themeData.create_url)}
                                trackLabel={`Website Button Click`}
                                trackParameters={{ location: `${section_id}`, anchorText: `${themeTitle} Create Site` }}
                            >
                                Create Site
                        </Button>

                            {themeLink ? (
                                <Button
                                    className="theme-card-action"
                                    hollow
                                    size="small"
                                    theme="accent"
                                    href={safePrefix(themeLink)}
                                    trackLabel={`Website Button Click`}
                                    trackParameters={{ location: `${section_id}`, anchorText: `${themeTitle} More Info` }}
                                >
                                    More Info
                                </Button>
                            ) :
                                <Button
                                    className="theme-card-action"
                                    hollow
                                    size="small"
                                    theme="accent"
                                    href={safePrefix(themeData.preview_url)}
                                    trackLabel={`Website Button Click`}
                                    trackParameters={{ location: `${section_id}`, anchorText: `${themeTitle} Live Preview` }}
                                >
                                    Live Preview
                            </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
