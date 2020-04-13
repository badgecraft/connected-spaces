import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import Item from './_RawNotifyItem';
import NotifyLink from './_NotifyLink';

const EndorsementRequestNotification = compose(
    getContext({
        paths: PropTypes.shape({
            endorsementRequest: PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const user = (<NotifyLink
            key="u"
            viewPerm={false}
            site={_get(item, 'site')}
        >{_get(item, 'endorsement.endorseeUser.name')}</NotifyLink>);

        const object = (<NotifyLink
            key="e"
            viewPerm
            site={_get(item, 'site')}
            to={paths.endorsementRequest}
            params={item.endorsement}
        >{_get(item, 'endorsement.object.name')}</NotifyLink>);

        return {
            picture: _get(item, 'endorsement.object.picture'),
            text:    jt`${user} requested endorsement for ${object}`,
        };
    }),
)(Item);

EndorsementRequestNotification.propTypes = {
    item: PropTypes.shape({
        endorsement: PropTypes.shape({
            id:           PropTypes.string.isRequired,
            endorseeUser: PropTypes.shape({
                name:    PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }).isRequired,
            object:       PropTypes.shape({
                name:    PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        site:        PropTypes.shape(),
    }).isRequired,
};

export default EndorsementRequestNotification;
