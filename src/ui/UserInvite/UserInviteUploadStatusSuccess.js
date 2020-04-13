import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { jt, t } from 'ttag';
import { font16A6 } from '../uiFonts';
import Link from '../Link';

const Cont = styled('div')({
    textAlign: 'center',
});

const H = styled('h2')({
    marginBottom: 12,
});

const Details = styled('div')({
    ...font16A6,
    marginBottom: 8,
});

const DownLink = styled(Link)({
    textDecoration: 'underline',
});

const UserInviteUploadStatusSuccess = ({ details, resultFile }) => {
    const { rows: rowCount, added: addCount, errors: errorCount } = details;
    const file = (<DownLink key="f" href={resultFile.publicPath}>{resultFile.original}</DownLink>);
    return (
        <Cont>
            <H>{t`File uploaded`}</H>
            <Details>{t`Rows found: ${rowCount}, invited: ${addCount}, errors: ${errorCount}`}</Details>
            <Details>{jt`Get result file with details: ${file}`}</Details>
        </Cont>
    );
};

UserInviteUploadStatusSuccess.propTypes = {
    details:    PropTypes.shape({
        rows:   PropTypes.number.isRequired,
        added:  PropTypes.number.isRequired,
        errors: PropTypes.number.isRequired,
    }).isRequired,
    resultFile: PropTypes.shape({
        original:   PropTypes.string.isRequired,
        publicPath: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserInviteUploadStatusSuccess;
