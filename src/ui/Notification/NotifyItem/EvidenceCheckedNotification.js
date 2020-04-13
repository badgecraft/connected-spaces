import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import Item from './_RawNotifyItem';
import NotifyLink from './_NotifyLink';

const EvidenceCheckedNotification = compose(
    getContext({
        paths: PropTypes.shape({
            badgeView:      PropTypes.string.isRequired,
            badgeClassView: PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const checkStatus = _get(item, 'checkStatus');
        const id = _get(item, 'badgeClass.long.id');
        const projectId = _get(item, 'badgeClass.long.projectId');
        const canView = _get(item, 'badgeClass.perms.view.value') === 1;
        const openCriterion = _get(item, 'task.criterion.id');

        const quest = (<NotifyLink
            key="b"
            viewPerm={canView && id && projectId}
            to={paths.badgeClassView}
            params={{ id, projectId }}
            query={checkStatus === 'rejected' ? { openCriterion } : {}}
            site={_get(item, 'site')}
            hash={openCriterion ? `criterion-${openCriterion}` : null}
        >{_get(item, 'badgeClass.name')}</NotifyLink>);

        const text = checkStatus === 'approved' ?
            jt`Your evidence in quest ${quest} approved` :
            jt`Your evidence in quest ${quest} rejected`;
        return {
            picture: _get(item, 'badgeClass.picture'),
            text,
            // actions - maybe display status ?
        };
    }),
)(Item);

EvidenceCheckedNotification.propTypes = {
    item: PropTypes.shape({
        checkStatus: PropTypes.oneOf(['approved', 'rejected']).isRequired,
        task:        PropTypes.shape({
            criterion: PropTypes.shape({
                id: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export default EvidenceCheckedNotification;
