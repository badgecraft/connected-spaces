import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { mapProps } from 'recompose';
import _get from 'lodash/get';
import withActivity from '../../ui/Activity/withActivity';
import Layout from './ActivityLayout';
import Viewport from './ActivityViewport';
import ToCheckList from '../../ui/Notification/EvidenceCheck/ProjectEvidenceRowList';
import HistoryList from '../../ui/Notification/EvidenceCheck/ActivityEvidenceChunkList';
import paths from '../../constants/paths';
import Link from '../../ui/Link';
import { font14A4 } from '../../ui/uiFonts';
import { themedMinWidth } from '../../ui/uiUtils';

const Controls = styled('div')(({ theme }) => ({
    marginBottom: 8,

    [themedMinWidth('tablet', theme)]: {
        paddingLeft: 12,
    },
}));
const ControlLink = styled(mapProps(({ current, ...props }) => props)(Link))(({ current }) => ({
    ...font14A4,
    marginRight: 12,
    ...(!current && { textDecoration: 'underline' }),

    '&:last-of-type': {
        marginRight: 0,
    },
}));

const ActivityInvites = ({ id, initialToCheck, initialHistory, project, history, ...props }) => (
    <Layout tab="evidences" project={project} {...props}>
        <Viewport>
            {_get(project, 'perms.evidenceView.value') === 1 && <Controls>
                <ControlLink to={paths.activityEvidences} params={{ id }} current={!history}>
                    {t`Evidences to approve`}
                </ControlLink>
                <ControlLink to={paths.activityEvidences} params={{ id }} query={{ history: 1 }} current={history}>
                    {t`Evidence history`}
                </ControlLink>
            </Controls>}
            {_get(project, 'perms.evidenceView.value') === 1 && history
                ? (<HistoryList
                    id={id}
                    offset={0}
                    badgeClassViewPath={paths.badgeClassView}
                    initial={initialHistory}
                />)
                : (<ToCheckList initial={initialToCheck} offset={0} id={id} />)}

        </Viewport>
    </Layout>
);

ActivityInvites.propTypes = {
    id:             PropTypes.string.isRequired,
    initialToCheck: PropTypes.shape({}).isRequired,
    initialHistory: PropTypes.shape({}),
    project:        PropTypes.shape({
        perms: PropTypes.shape({
            evidenceView: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
    }).isRequired,
    history:        PropTypes.bool.isRequired,
};

ActivityInvites.defaultProps = {
    initialHistory: null,
};

export default withActivity(ActivityInvites);
