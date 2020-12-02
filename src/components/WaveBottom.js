import React from 'react';

export default class WaveBottom extends React.Component {
    render() {
        return (
            <div className="wave-bottom" aria-hidden="true">
                <svg width="2060" height="116" viewBox="0 0 2060 116" xmlns="http://www.w3.org/2000/svg">
                    <title>Bottom Wave</title>
                    <g fill="none" fillRule="evenodd">
                        <path
                            className="path1"
                            d="M2060 108.067C1666.89-7.862 1252.468 10.95 928.435 64.299 662.596 108.067 456.06 133.815 0 59.924v-6.82C1028.187 179.134 911.775-96.09 2060 37.692v70.376z"
                            fill="#E5E6FF"
                        />
                        <path
                            className="path2"
                            d="M2060 115.918H0V57.991c456.061 74.718 662.596 48.681 928.435 4.424C1252.468 8.469 1666.89-10.554 2060 106.672v9.246z"
                            fill="#FFF"
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
