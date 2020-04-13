import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { getContext } from 'recompose';
import _get from 'lodash/get';
import logo from '../Icon/svg2/badgecraft.svg';
import Modal from '../../ui/Modal';
import modalify from '../../ui/Modal/modalify';
import Button from '../../ui/Button';
import { breakpoints, paths } from '../Constants';
import { toLink } from '../Link';
import Thumb from '../../ui/BadgeClass/BadgeThumb';

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

// todo onClick the root, not within root do escapify
const EventBadgeAfterCreate = ({ id, bcWebURL, pushRoute, project }) => {
    const badgeClass = _get(project, 'completeBadgeClass');
    return (
        <Modal>
            <Root>
                <div>
                    <Logo src={logo} alt="Badgecraft" />
                </div>
                {badgeClass && <Title>{t`We automatically created a badge for this activity`}</Title>}
                {badgeClass && <Thumb badgeClass={badgeClass} variant="clean" />}

                <Title>{t`To edit badge information, go to Badgecraft.`}</Title>
                <Actions>
                    <Button
                        type="link"
                        variant="primary"
                        to={paths.activityView}
                        params={{ id }}
                        label={t`Edit later`}
                        disableNextScroll
                    />
                    <Button
                        variant="secondary"
                        type="link"
                        href={toLink({ to: paths.badgecraftProjectEdit, params: { id }, baseURL: bcWebURL })}
                        target="_blank"
                        onClick={() => pushRoute({ to: paths.activityView, params: { id } })}
                        label={t`Go to Badgecraft`}
                        disableNextScroll
                    />
                </Actions>
            </Root>
        </Modal>
    );
};

EventBadgeAfterCreate.propTypes = {
    id:        PropTypes.string.isRequired,
    bcWebURL:  PropTypes.string.isRequired,
    pushRoute: PropTypes.func.isRequired,
    project:   PropTypes.shape({
        completeBadgeClass: PropTypes.shape({}).isRequired,
    }).isRequired,
};

export default getContext({
    pushRoute: PropTypes.func,
    bcWebURL:  PropTypes.string.isRequired,
})(EventBadgeAfterCreate);
