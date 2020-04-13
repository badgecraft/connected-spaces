import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import Item from './_RawNotifyItem';
import NotifyLink from './_NotifyLink';

export default compose(
    getContext({
        paths: PropTypes.shape({
            badgeClassView: PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const id = _get(item, 'badgeClass.long.id');
        const projectId = _get(item, 'badgeClass.long.projectId');
        const canView = _get(item, 'badgeClass.perms.view.value') === 1;

        const badgeClass = (<NotifyLink
            key="b"
            viewPerm={canView && id && projectId}
            to={paths.badgeClassView}
            params={{ id, projectId }}
            site={_get(item, 'site')}
        >{_get(item, 'badgeClass.name')}</NotifyLink>);
        return {
            picture: _get(item, 'badgeClass.picture'),
            text:    jt`After gathering all requirement now you can start mission for ${badgeClass} !`,
        };
    }),
)(Item);
