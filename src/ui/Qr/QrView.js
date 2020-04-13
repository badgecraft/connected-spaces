import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getContext } from 'recompose';
import { toLink } from '../Link';
import QrImage from './Qr';

const Root = styled('div')({
    marginTop: 16,
});

const QrView = ({ name, title, code, baseURL, claimPath }) => (
    <Root>
        <QrImage
            url={toLink({ to: claimPath, params: {}, query: { code }, baseURL })}
            width={256}
            title={title}
            downloadName={name}
        />
    </Root>
);

QrView.propTypes = {
    title:     PropTypes.string.isRequired,
    name:      PropTypes.string.isRequired,
    claimPath: PropTypes.string.isRequired,
    baseURL:   PropTypes.string.isRequired,
    code:      PropTypes.string.isRequired
};

export default getContext({ baseURL: PropTypes.string.isRequired })(QrView);
