import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import toID from 'to-id';
import qrImage from 'qr-image';
import { t } from 'ttag';
import Button from '../Button';
import ActionInputCopy from '../Form/ActionInputCopy';

const Root = styled('div')({
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
});

const Heading = styled('h4')({});

const Image = styled('img')({
    marginBottom: 8,
});

const InputRoot = styled('div')({
    marginTop: 8,
    width:     '100%',
});

export const createQrImage = ({ url, size = 10 }) => `data:image/png;base64,${qrImage.imageSync(url, {
    type:   'png',
    margin: 1,
    size,
}).toString('base64')}`;

const Qr = ({ url, downloadName, title, width }) => {
    const qrBase64 = createQrImage({ url });
    return (
        <Root>
            {title && <Heading>{title}</Heading>}
            <Image width={width} src={qrBase64} alt={url} />
            {downloadName && <Button
                variant="secondary"
                type="link"
                href={qrBase64}
                download={`${toID(downloadName)}-qr-code.png`}
                label={t`Download QR code`}
                size="smaller"
            />}
            <InputRoot>
                <ActionInputCopy
                    id="url"
                    name="url"
                    value={url}
                    readOnly
                    onFocus={evt => evt.target.select()}
                    onClick={evt => evt.target.select()}
                    variant="clean"
                />
            </InputRoot>
        </Root>
    )
};

Qr.propTypes = {
    url:          PropTypes.string.isRequired,
    title:        PropTypes.node,
    downloadName: PropTypes.string,
    width:        PropTypes.number,
};

Qr.defaultProps = {
    title:        null,
    downloadName: null,
    width:        256,
};

export default Qr;
