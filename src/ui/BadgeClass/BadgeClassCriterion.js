import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import AddEvidence from './AddEvidence';
import DisplayEvidence from './DisplayEvidence';
import finished from './statusDone.svg';
import waitForApprove from './statusWaiting.svg';
import waitForEvidence from './statusUpload.svg';
import waitForFix from './statusImprove.svg';
import { toApprovedByText, toStatusText } from './badgeClassUtils';
import { font12 } from '../uiFonts';
import Markdown from '../Markdown';

const statusMap = {
    finished,
    waitForApprove,
    waitForEvidence,
    waitForFix,
};

const Root = styled('div')({
    borderBottom:   '1px solid #E5E3ED',
    paddingBottom:  32,
    marginBottom:   32,
    '&:last-child': {
        borderBottom:  '0 none',
        paddingBottom: 0,
        marginBottom:  0,
    },
});

const Status = styled('div')(({ status, evidenceRequired, variant }) => {
    const statusItem = statusMap[status] || evidenceRequired && statusMap.waitForEvidence || null;
    return {
        display:     statusItem && variant === 'default' ? 'inline-block' : 'none',
        width:       20,
        height:      20,
        background:  `transparent none center center/contain no-repeat`,
        marginRight: 8,
        ...(statusItem && { backgroundImage: `url("${statusItem}")` }),
    };
});

const StatusRoot = styled('div')({
    ...font12,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    color:          '#A59FC0',
});

const StatusBox = styled('div')({
    ...font12,
    display:    'flex',
    alignItems: 'center',
    color:      '#A59FC0',
});

const BadgeClassCriterion = ({ criterion, badgeClass, onBadgeGained, variant, openCriterion }) => {
    const { no, task = null } = criterion;
    const approveBy = toApprovedByText({ criterion, badgeClass, variant });
    return (
        <Root id={`criterion-${criterion.id}`}>
            <StatusRoot>
                <StatusBox title={toStatusText(task)}>
                    <Status
                        variant={variant}
                        status={task && task.status}
                        evidenceRequired={badgeClass && badgeClass.evidenceRequired}
                    /> {t`Task no.${no}`}</StatusBox>
                {approveBy && (<div>{approveBy}</div>)}
            </StatusRoot>
            <Markdown source={criterion.description} />
            {variant === 'userBadge'
                ? (<DisplayEvidence criterion={criterion} />)
                : (<AddEvidence
                    criterion={criterion}
                    task={task}
                    badgeClass={badgeClass}
                    onBadgeGained={onBadgeGained}
                    defaultOpen={openCriterion === criterion.id}
                />)}
        </Root>
    );
};

BadgeClassCriterion.propTypes = {
    criterion:     PropTypes.shape({
        id:             PropTypes.string.isRequired,
        description:    PropTypes.string.isRequired,
        checkType:      PropTypes.oneOf(['self', 'members', 'managers', 'circle', 'circleAdmins']).isRequired,
        checkTypeCount: PropTypes.number.isRequired,
        no:             PropTypes.number.isRequired,
        task:           PropTypes.shape({
            status:    PropTypes.oneOf(['finished', 'waitForApprove', 'waitForEvidence', 'waitForFix']).isRequired,
            evidences: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        }),
    }).isRequired,
    badgeClass:    PropTypes.shape({
        evidenceRequired: PropTypes.bool.isRequired,
    }).isRequired,
    onBadgeGained: PropTypes.func.isRequired,
    variant:       PropTypes.oneOf(['default', 'userBadge']).isRequired,
    openCriterion: PropTypes.string,
};

BadgeClassCriterion.defaultProps = {
    openCriterion: null,
};

export default BadgeClassCriterion;
