import React from 'react';

import { toStyleObj, Link } from '../utils';

export default class NetlifyImporter extends React.Component {
    render() {
        return (
            <div id="netlify-modal" className="modal-container hidden">
                <div className="modal">
                    <div className="modal-page" id="modal-page-1">
                        <h4 className="modal-title" />
                        <div className="site-list">
                            <div className="loader-center">
                                <h4>Fetching your Netlify projects...</h4>
                                <div className="loader-ellipsis" />
                            </div>
                        </div>
                        <div className="oval-horiz-shadow site-list-shadow" style={toStyleObj('display: none;')} />
                        <div className="modal-panel agree-tos-panel" id="agree-tos-panel" style={toStyleObj('display: none;')}>
                            <p>A free Stackbit account will be created using your Netlify credentials.</p>
                            <div className="check-container">
                                <input type="checkbox" id="agree-tos-modal" className="checkbox" checked />
                                <label htmlFor="agree-tos-modal">
                                    <span>
                                        I accept the{' '}
                                        <Link to="https://www.stackbit.com/tos" target="_blank">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="https://www.stackbit.com/license" target="_blank">
                                            License
                                        </Link>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-panel">
                            <Link className="modal-button clear" id="close-import-modal">
                                Cancel
                            </Link>
                            <Link className="modal-button disabled" id="import-site-cta">
                                Let's Go!
                            </Link>
                        </div>
                        <div className="netlify-site" id="template-netlify-site">
                            <div className="site-thumb">
                                <img alt="site thumbnail" />
                            </div>
                            <div className="site-details">
                                <div className="site-name" />
                                <div className="site-publish-date" />
                            </div>
                            <div className="site-has-widget">
                                <div className="checkbox-icon" />
                                <span>Control Center enabled</span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-page hidden" id="modal-page-2">
                        <div className="content-center">
                            <h4 className="modal-title">You’re all set!</h4>
                            <div className="modal-panel">
                                <Link className="modal-button hidden" id="launching-button">
                                    Launching Your Site in 3 ...
                                </Link>
                                <Link className="modal-button clear hidden" id="contact-us-button">
                                    Contact Us
                                </Link>
                                <Link className="modal-button hidden" id="close-and-try-modal-button">
                                    Close and Try Again
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
