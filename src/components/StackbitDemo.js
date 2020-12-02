import React from 'react';
import { Helmet } from 'react-helmet';
import { classNames } from '../utils';

const demoUrl = process.env.GATSBY_STACKBIT_DEMO_URL;

export default class StackbitDemo extends React.Component {
    state = {
        started: false
    };

    constructor() {
        super();
        this.startDemo = this.startDemo.bind(this);
    }

    startDemo() {
        if (!this.state.started) {
            this.setState({ started: true });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <style>{`#intercom-container { display: none; }`}</style>
                </Helmet>
                <div className="stackbit-demo">
                    <div className="stackbit-demo__browser">
                        <header className="stackbit-demo__browser-header">
                            <h2 className="stackbit-demo__browser-header-title">Live Demo</h2>
                            <div className="stackbit-demo__browser-header-icons">
                                <div className="stackbit-demo__browser-header-icon" />
                                <div className="stackbit-demo__browser-header-icon" />
                                <div className="stackbit-demo__browser-header-icon" />
                            </div>
                        </header>
                        <div className="stackbit-demo__content" onClick={this.startDemo}>
                            {!this.state.started && (
                                <div className="stackbit-demo__lock">
                                    <div className="stackbit-demo__lock-content">
                                        <div className="stackbit-demo__lock-icon" />
                                        <button type="button" className="stackbit-demo__lock-button">
                                            Press to play
                                        </button>
                                    </div>
                                </div>
                            )}
                            <iframe className="stackbit-demo__site" src={demoUrl} />
                            <iframe className="stackbit-demo__log" src={`${demoUrl}/log`} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
