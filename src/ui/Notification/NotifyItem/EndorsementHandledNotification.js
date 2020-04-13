import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt, t } from 'ttag';
import Item from './_RawNotifyItem';
import NotifyLink from './_NotifyLink';

const EndorsementHandledNotification = compose(
    getContext({
        paths: PropTypes.shape({
            badgeClassView: PropTypes.string.isRequired,
            activityView:   PropTypes.string.isRequired,
            spaceView:      PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const eObject = _get(item, 'endorsement.object');
        const status = _get(item, 'endorsementStatus');
        const site = _get(item, 'site');
        if (!eObject || !status) {
            return {};
        }

        let object = eObject.name;
        switch (eObject.__typename) {
            case 'BadgeClass':
                object = (<NotifyLink
                    key="o"
                    viewPerm={_get(eObject, 'perms.view.value') === 1}
                    to={paths.badgeClassView}
                    params={eObject}
                    query={{ badgeClassTab: 'endorsements' }}
                    site={site}
                >{eObject.name}</NotifyLink>);
                break;
            case 'Project':
                object = (<NotifyLink
                    key="o"
                    viewPerm={_get(eObject, 'perms.view.value') === 1}
                    to={paths.activityView}
                    params={eObject}
                    site={site}
                >{eObject.name}</NotifyLink>);
                break;
            case 'Organisation':
                object = (<NotifyLink
                    key="o"
                    viewPerm={_get(eObject, 'perms.view.value') === 1}
                    to={paths.spaceView}
                    params={eObject}
                    site={site}
                >{eObject.name}</NotifyLink>);
                break;
            default:
                break;
        }

        let text = t`Unknown endorsement status`;
        switch (status) {
            case 'endorserRejected':
                text = jt`Endorsement request for ${object} was rejected`;
                break;
            case 'signed':
                text = jt`Endorsement request for ${object} was accepted`;
                break;
            case 'pendingVerify':
                text = jt`Endorsement request for ${object} was accepted, waiting for endorser verification`;
                break;
            case 'revoked':
                text = jt`Endorsement for ${object} revoked`;
                break;
            case 'endorserRequest':
            default:
                break;
        }

        return {
            picture: eObject.picture,
            text,
        };
    }),
)(Item);

EndorsementHandledNotification.propTypes = {
    item: PropTypes.shape({
        endorsement:       PropTypes.shape({
            object: PropTypes.shape({
                __typename: PropTypes.oneOf(['BadgeClass', 'Project', 'Organisation']).isRequired,
                id:         PropTypes.string.isRequired,
                name:       PropTypes.string.isRequired,
                picture:    PropTypes.string.isRequired,
                projectId:  PropTypes.string,
                perms:      PropTypes.shape({
                    view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
        endorsementStatus: PropTypes.oneOf(['endorserRejected', 'endorserAccepted', 'pendingVerify']).isRequired,
    }).isRequired,
};

export default EndorsementHandledNotification;
