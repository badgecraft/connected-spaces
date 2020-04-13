import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { branch, renderNothing, compose } from 'recompose';
import styled from '@emotion/styled';
import FieldSet from '../Form/FieldSet';
import { font16A5 } from '../uiFonts';

const Connection = styled('div')(({ variant }) => ({
    ...font16A5,
    lineHeight:      '32px',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    padding:         '8px 16px',
    borderBottom:    '1px solid #E5E3ED',
    backgroundColor: '#b9bbbb',
    color:           '#ffffff',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
    ...(variant === 'google' ? {
        backgroundColor: '#4285F4',
    } : {}),
    ...(variant === 'facebook' ? {
        backgroundColor: '#3B5998',
    } : {}),
}));

const toTitle = (type) => {
    switch (type) {
        case 'facebook':
            return t`Facebook`;
        case 'google':
            return t`Google`;
        case 'vk':
            return t`VK`;
        default:
            return null;
    }
};

const UserEmailsFormView = ({ me }) => (
    <FieldSet
        title={t`Connections`}
        data-balloon={t`Connections are ways you login to Badgecraft`}
        data-balloon-pos="right"
    >
        {(me.connections || []).filter(conn => conn && conn.type !== 'password').map(conn => (
            <Connection key={conn.id} variant={conn.type}>
                {toTitle(conn.type)}: {conn.display}
            </Connection>
        ))}
    </FieldSet>
);

UserEmailsFormView.propTypes = {
    me: PropTypes.shape({
        connections: PropTypes.arrayOf(PropTypes.shape({
            id:      PropTypes.string.isRequired,
            type:    PropTypes.oneOf([]).isRequired,
            display: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};

export default compose(
    branch(({ me }) => !me, renderNothing),
    branch(({ me }) => !(me.connections || []).find(conn => conn && conn.type !== 'password'), renderNothing),
)(UserEmailsFormView);
