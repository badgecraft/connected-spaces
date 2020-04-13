import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getContext } from 'recompose';
import { t } from 'ttag';
import { toLink } from '../Link';
import QrImage from '../Qr/Qr';

const Root = styled('div')({
    marginTop: 16,
});

const IssueBadgeQrCode = ({ name, claimCode, baseURL, claimPath }) => (
    <Root>
        <QrImage
            url={toLink({ to: claimPath, params: {}, query: { code: claimCode.code }, baseURL })}
            width={256}
            title={t`Scan code or access url to get this badge`}
            downloadName={name}
        />
    </Root>
);

IssueBadgeQrCode.propTypes = {
    name:      PropTypes.string.isRequired,
    claimPath: PropTypes.string.isRequired,
    baseURL:   PropTypes.string.isRequired,
    claimCode: PropTypes.shape({
        id:    PropTypes.string.isRequired,
        code:  PropTypes.string.isRequired,
        multi: PropTypes.bool.isRequired,
        used:  PropTypes.bool.isRequired,
    }).isRequired,
};

export default getContext({
    baseURL: PropTypes.string.isRequired,
})(IssueBadgeQrCode);
