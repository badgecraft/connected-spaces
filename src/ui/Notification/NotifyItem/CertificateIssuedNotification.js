import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, getContext, compose } from 'recompose';
import { jt, t } from 'ttag';
import Item from './_RawNotifyItem';
import { LinkOrBold } from './notifyItemUtils';
import { toLink } from '../../Link';

export default compose(
    getContext({ bcWebURL: PropTypes.string.isRequired }),
    withProps(({ item, bcWebURL }) => {
        const certificate = (
            <LinkOrBold
                key="c"
                href={toLink({ to: _get(item, 'certificate.file'), baseURL: bcWebURL })}
                target="_blank"
            >{_get(item, 'certificate.name')}</LinkOrBold>
        );
        const viewAll = (
            <LinkOrBold
                key="v"
                target="_blank"
                href={toLink({ to: '/auto/wallet/certificates', baseURL: bcWebURL })}
            >{t`View all certificates`}</LinkOrBold>
        );
        return {
            picture: _get(item, 'certificate.picture'),
            text:    jt`You have received ${certificate} certificate. ${viewAll}`,
        }
    }),
)(Item);
