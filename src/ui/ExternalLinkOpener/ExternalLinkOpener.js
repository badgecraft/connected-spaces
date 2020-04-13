import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import Modal from '../Modal';
import Button from '../../ui/Button';
import { themedMinWidth } from '../uiUtils';

const Logo = styled('img')(({ theme }) => ({
    width:                             200,
    [themedMinWidth('mobile', theme)]: {
        width: 252,
    },
}));

const Root = styled('div')(({ theme }) => ({
    backgroundColor:                   '#FFFFFF',
    boxShadow:                         '0 6px 12px 0 rgba(48,6,114,0.11)',
    borderRadius:                      10,
    width:                             '90%',
    margin:                            '0 auto',
    textAlign:                         'center',
    padding:                           '60px 20px 40px 20px',
    overflow:                          'hidden',
    [themedMinWidth('mobile', theme)]: {
        width:        'auto',
        paddingLeft:  40,
        paddingRight: 40,
    },
}));

const Title = styled('h2')({
    color:      '#3E3564',
    fontSize:   16,
    lineHeight: '23px',
    fontWeight: 500,
    marginTop:  20,
});

const Actions = styled('div')(({ theme }) => ({
    marginTop: 20,

    [themedMinWidth('mobile', theme)]: {
        marginTop: 40,
    },

    '> *': {
        marginLeft:  10,
        marginRight: 10,
    },
}));

const ExternalLinkOpener = ({ site, externalLink, onCancel }) => {
    const siteUrl = _get(site, 'siteUrl', '');
    const logoUrl = _get(site, 'logoUrl', '');

    return (
        <Modal>
            <Root>
                <div>
                    <Logo src={`${siteUrl}${logoUrl}`} alt="Badgecraft" />
                </div>
                <Title>{t`Open link on the site it was created`}</Title>
                <Actions>
                    <Button
                        type="button"
                        variant="secondary"
                        label={t`No, never mind`}
                        onClick={onCancel}
                    />
                    <Button
                        variant="primary"
                        type="link"
                        href={externalLink}
                        target="_blank"
                        onClick={onCancel}
                        label={t`Yes, open`}
                    />
                </Actions>
            </Root>
        </Modal>
    );
};

ExternalLinkOpener.propTypes = {
    onCancel:     PropTypes.func.isRequired,
    externalLink: PropTypes.string.isRequired,
    site:         PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
        logoUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default ExternalLinkOpener;
