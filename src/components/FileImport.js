import React from 'react';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import Button from './Button';
import { htmlToReact, markdownify, toStyleObj, safePrefix, Link } from '../utils';
import { uploadData } from '../services/api';

export default class FileImport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isSuccess: false,
            fileDragHovered: false,
            acceptedFiles: null,
            errorMessage: null
        };

        this.createProject = this.createProject.bind(this);
        this.onFileDragEnter = this.onFileDragEnter.bind(this);
        this.onFileDragLeave = this.onFileDragLeave.bind(this);
        this.onFileDrop = this.onFileDrop.bind(this);
        this.onFileDropRejected = this.onFileDropRejected.bind(this);
    }

    createProject() {
        const { acceptedFiles, isLoading, isSuccess } = this.state;

        if (!acceptedFiles || isLoading || isSuccess) {
            return;
        }

        this.setState({ isLoading: true, errorMessage: null });

        const file = acceptedFiles[0];

        return uploadData('medium', file)
            .then((response) => {
                this.setState({ errorMessage: null, isSuccess: true });

                if (response.nextUrl) {
                    window.location.href = response.nextUrl;
                }
            })
            .catch((err) => {
                const errorMessage = err.message || err.response.data.message;

                this.setState({ errorMessage: errorMessage });

                console.log('Error Importing Project', { error: errorMessage });
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    onFileDragEnter() {
        this.setState({ fileDragHovered: true });
    }

    onFileDragLeave() {
        this.setState({ fileDragHovered: false });
    }

    onFileDrop(acceptedFiles) {
        this.setState({
            fileDragHovered: false,
            acceptedFiles: acceptedFiles,
            errorMessage: null
        });

        if (acceptedFiles) {
            console.log('Project Import Selected');
        }
    }

    onFileDropRejected() {
        this.setState({
            fileDragHovered: false,
            errorMessage: 'Please select a valid Medium export Zip file'
        });

        console.log('Project Import Rejected');
    }

    render() {
        const { acceptedFiles, fileDragHovered, isLoading, isSuccess } = this.state;
        const hasFiles = acceptedFiles && acceptedFiles.length > 0;

        let dropzoneText = (
            <span>
                Drag a file here, or <span className="highlight">click here</span> to browse and upload
            </span>
        );
        let dropzoneClassName = 'dropzone';

        if (fileDragHovered) {
            dropzoneClassName += ' hovered';
            dropzoneText = 'Drop the file here';
        } else if (acceptedFiles && acceptedFiles.length) {
            dropzoneClassName += ' dropped';
            dropzoneText = `Selected file: ${acceptedFiles[0].name}`;
        }

        let ctaText = 'Get Started';

        if (isLoading) {
            ctaText = <div className="loader-ellipsis" />;
        } else if (isSuccess) {
            ctaText = '✓';
        }

        return (
            <React.Fragment>
                {_.get(this.props, 'import_section.title') && (
                    <h2 className="import-title">{htmlToReact(_.get(this.props, 'import_section.title'))}</h2>
                )}
                <div className="import-content">
                    <div className="open-file">
                        {_.get(this.props, 'import_section.content') && (
                            <div className="top-info">{markdownify(_.get(this.props, 'import_section.content'))}</div>
                        )}

                        <Dropzone
                            onDragEnter={this.onFileDragEnter}
                            onDragLeave={this.onFileDragLeave}
                            onDropAccepted={this.onFileDrop}
                            onDropRejected={this.onFileDropRejected}
                            accept={['application/zip', 'application/x-compressed', 'application/x-zip-compressed', 'multipart/x-zip']}
                            minSize={1}
                            maxSize={100 * 1024 * 1024}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className={dropzoneClassName} tabIndex="0" {...getRootProps()}>
                                    <input style={toStyleObj('display:none')} tabIndex="-1" {...getInputProps()} />
                                    <div className="dz-img">
                                        <img src={safePrefix('images/dropzone.svg')} width="95" height="100" alt="" />
                                    </div>
                                    <div className="dz-note">{dropzoneText}</div>
                                </div>
                            )}
                        </Dropzone>

                        <div className="message" />
                        <div className="create-project">
                            <Button disabled={!hasFiles} onClick={this.createProject}>
                                {ctaText}
                            </Button>
                        </div>
                        <div className="bottom-info">
                            <span>Don't have a Medium blog to import? </span>
                            <Link to="https://app.stackbit.com/wizard">Start a new blog on Stackbit</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
