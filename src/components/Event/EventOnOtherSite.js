import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import { branch, renderNothing } from 'recompose';
import Modal from '../../ui/Modal';
import modalify from '../../ui/Modal/modalify';
import { breakpoints, paths } from '../Constants';
import Button from '../../ui/Button';
import { toLink } from '../Link';

const Logo = styled('img')({
    width:                200,
    [breakpoints.mobile]: {
        width: 252,
    },
});

const Root = modalify()(styled('div')({
    backgroundColor:      '#FFFFFF',
    boxShadow:            '0 6px 12px 0 rgba(48,6,114,0.11)',
    borderRadius:         10,
    width:                '90%',
    margin:               '0 auto',
    textAlign:            'center',
    padding:              '60px 20px 40px 20px',
    overflow:             'hidden',
    [breakpoints.mobile]: {
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

const Actions = styled('div')({
    marginTop:            20,
    [breakpoints.mobile]: {
        marginTop: 40,
    },
    '> *':                {
        marginLeft:  10,
        marginRight: 10,
    },
});

const EventOnOtherSite = ({ event, onCancel }) => {
    const siteUrl = _get(event, 'site.siteUrl', '');
    const logoUrl = _get(event, 'site.logoUrl', '');
    const link = toLink({ to: paths.activityView, params: { id: event.id }, baseURL: siteUrl });

    return (
        <Modal>
            <Root onEscape={onCancel}>
                <div>
                    <Logo src={`${siteUrl}${logoUrl}`} alt="Badgecraft" />
                </div>
                <Title>{t`Open activity on the site it was created`}</Title>
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
                        href={link}
                        target="_blank"
                        onClick={onCancel}
                        label={t`Yes, open`}
                    />
                </Actions>
            </Root>
        </Modal>
    );
};

EventOnOtherSite.propTypes = {
    onCancel: PropTypes.func.isRequired,
    event:    PropTypes.shape({
        id:       PropTypes.string.isRequired,
        contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
        site:     PropTypes.shape({
            siteUrl: PropTypes.string.isRequired,
            logoUrl: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default branch(
    ({ event }) => !_get(event, 'site'), renderNothing,
)(EventOnOtherSite);
