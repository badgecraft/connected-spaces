import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Crop, { makeAspectCrop, getPixelCrop } from 'react-image-crop';
import cropStyles from 'react-image-crop/dist/ReactCrop.css';
import Button from '../../UI/Button';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 4000;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    padding: 20px;

    ${cropStyles}
`;

const Buttons = styled.div``;

export default class Cropper extends React.Component {
    static propTypes = {
        src:      PropTypes.string.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSave:   PropTypes.func.isRequired,
        aspect:   PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            crop:      {},
            overflow:  "",
            pixelCrop: null,
            image:     null,
        };
    }

    componentDidMount = () => {
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        this.setState({ overflow });
    };

    componentWillUnmount = () => {
        const { overflow } = this.state;
        document.body.style.overflow = overflow;
    };

    onChange = crop => this.setState({ crop });

    onComplete = (crop, pixelCrop) => this.setState({ crop, pixelCrop });

    onImageLoaded = (image) => {
        const crop = makeAspectCrop({
            x:        0,
            y:        0,
            aspect:   this.props.aspect,
            width:    image.width,
            minWidth: 200,
        }, image.width / image.height);

        this.setState({
            crop,
            pixelCrop: getPixelCrop(image, crop),
            image,
        });
    };


    handleCancel = () => {
        this.props.onCancel();
    };

    handleSave = () => {
        const { pixelCrop, image } = this.state;
        if (pixelCrop) {
            this.props.onSave(image, pixelCrop);
        }
    };

    render() {
        const { crop, pixelCrop } = this.state;
        const { src } = this.props;
        return (
            <Container>
                <Crop
                    src={src}
                    crop={crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onComplete}
                    onChange={this.onChange}
                />
                <Buttons>
                    <Button variant="secondary" type="button" onClick={this.handleCancel}>{t`Cancel`}</Button>
                    <Button type="button" disabled={!pixelCrop} onClick={this.handleSave}>{t`Save`}</Button>
                </Buttons>
            </Container>
        );
    }
}
