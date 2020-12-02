import React from 'react';

export default class WaveTop extends React.Component {
    render() {
        return (
            <div className="wave-top" aria-hidden="true">
                <svg width="2060" height="137" viewBox="0 0 2060 137" xmlns="http://www.w3.org/2000/svg">
                    <title>Top Wave</title>
                    <g fill="none" fillRule="evenodd">
                        <path
                            className="path1"
                            d="M0 0c393.11 119.844 807.532 100.397 1131.565 45.246C1397.404 0 1603.94-26.618 2060 49.769v51.317C909.022-58.747 1032.495 251.14 0 87.94V0z"
                            fill="#E5E6FF"
                        />
                        <path className="path2" d="M0 0h2060v63.824C1026.921-96.01 1177.132 224.25 0 50.822V0z" fill="#FFF" />
                    </g>
                </svg>
            </div>
        );
    }
}
