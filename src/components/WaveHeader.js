import React from 'react';

export default class WaveHeader extends React.Component {
    render() {
        return (
            <div className="wave-bottom" aria-hidden="true">
                <svg width="2060" height="187" viewBox="0 0 2060 187" xmlns="http://www.w3.org/2000/svg">
                    <title>Header Wave</title>
                    <g fill="none" fillRule="evenodd">
                        <path
                            className="path1"
                            d="M2060 0v62.124C1030 62.124 1030 177 0 177v-6.544C1060.445 177 1009.883 0 2060 0z"
                            fill="#E5E6FF"
                        />
                        <path className="path2" d="M2060 186.859H0v-11.047C1030 175.812 1071.994 29.39 2060 61v125.859z" fill="#FFF" />
                    </g>
                </svg>
            </div>
        );
    }
}
