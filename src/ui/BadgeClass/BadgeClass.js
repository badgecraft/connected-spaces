import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t, ngettext, msgid } from 'ttag';
import { branch, renderNothing, withStateHandlers, compose } from 'recompose';
import _get from 'lodash/get';
import Criterion from './BadgeClassCriterion';
import { font18, font24, font12, font14A4 } from '../uiFonts';
import Dialog from './GainedBadgeModal';
import Markdown from '../Markdown';
import Deps from './BadgeClassDeps';
import Thumb from './BadgeThumb';
import Tabs from '../Menu/StateTabs';
import Endorsements from '../Endorsement/Endorsements';
import RequestEndorsement from '../Endorsement/RequestEndorsement';
import BadgeClassUsers from './BadgeClassUsers';
import Link from '../Link';
import Button from '../Button';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({});

const Heading = styled('div')(({ theme }) => ({
    marginTop:    8,
    marginBottom: 8,
    display:      'flex',
    alignItems:   'center',
    textAlign:    'right',
    paddingRight: 8,

    [themedMinWidth('tablet', theme)]: {
        flexGrow:     1,
        marginBottom: 16,
    },
}));

const Name = styled('h1')({
    ...font18,
    marginLeft: 8,
    lineHeight: '22px',
});

const OwnerHeading = styled('h1')({
    ...font24,
    marginBottom: 16,
});

const Desc = styled('div')({
    marginBottom: 32,
});

const TaskFinishDesc = styled('div')({
    ...font12,
    color:        '#A59FC0',
    marginBottom: 32,
});

const TasksTitle = styled('div')({
    ...font18,
    color:        '#A59FC0',
    marginTop:    16,
    marginBottom: 16,
});

const ControlBox = styled('div')({
    '& > a':      {
        marginLeft: 8,
    },
    paddingRight: 8,
    textAlign:    'right',
    lineHeight:   '30px',
});

const BadgeEditLink = styled(Link)({
    ...font14A4,
    color:          '#3E3564',
    lineHeight:     '14px',
    textDecoration: 'underline',
});

const toTaskFinishDesc = (badgeClass, userBadge) => {
    if (!badgeClass) {
        return null;
    }
    const { criteria, minTasksRequired } = badgeClass;
    if (!criteria || !minTasksRequired) {
        return null;
    }
    if (criteria.length < 2 || minTasksRequired < 1) {
        return null;
    }

    if (criteria.length === minTasksRequired) {
        if (userBadge) {
            if (!userBadge.mine) {
                return t`User had to finish all tasks to get this badge`;
            }
            return t`You had finished all tasks and got this badge`;
        }
        return t`You have to finish all tasks to get the badge`;
    }

    if (userBadge) {
        if (!userBadge.mine) {
            return ngettext(
                msgid`User had to finish ${minTasksRequired} task and get this badge`,
                `User had to finish ${minTasksRequired} tasks and get this badge`,
                minTasksRequired,
            );
        }

        return ngettext(
            msgid`You had to finish ${minTasksRequired} task and got this badge`,
            `You had to finish ${minTasksRequired} tasks and got this badge`,
            minTasksRequired,
        );
    }

    return ngettext(
        msgid`You have to finish ${minTasksRequired} task to get the badge`,
        `You have to finish ${minTasksRequired} tasks to get the badge`,
        minTasksRequired,
    );
};

const BadgeTop = styled('div')(({ theme }) => ({
    display:     'flex',
    marginLeft:  -16,
    marginRight: -16,

    [themedMinWidth('tablet', theme)]: {
        marginLeft:  -8,
        marginRight: -8,
    },
}));

const BadgePic = styled('div')({
    flexShrink: 0,
    flexGrow:   0,
});

const BadgeRight = styled('div')({
    flexGrow:       1,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-between',
});

const BadgeClass = (props) => {
    const {
        badgeClass,
        userBadge,
        gainedBadge,
        setGainedBadge,
        variant,
        badgeClassTab,
        endorsementForm,
        setEndorsementForm,
        createBadgeClassEditHref,
        badgeIssuePath,
        openCriterion,
    } = props;
    const name = _get(badgeClass, 'name') || _get(userBadge, 'name');
    const description = _get(badgeClass, 'description') || _get(userBadge, 'description');
    const ub = variant === 'userBadge' ? userBadge : _get(badgeClass, 'userBadge');
    const criteria = variant === 'userBadge'
        ? (userBadge && userBadge.criteria)
        : (badgeClass && badgeClass.criteria);

    const desc = toTaskFinishDesc(badgeClass, ub);
    const owner = _get(ub, 'owner.displayName');

    const editEnabled = !!(_get(badgeClass, 'perms.edit.value') === 1 && createBadgeClassEditHref);
    const issueEnabled = !!(variant === 'default' && _get(badgeClass, 'perms.issue.value') === 1 && badgeIssuePath);

    // todo figure out how to display Deps on issued badge
    return (
        <Root>
            <BadgeTop>
                <BadgePic>
                    <Thumb badgeClass={badgeClass} userBadge={ub} variant="clean" />
                </BadgePic>
                <BadgeRight>
                    {(editEnabled || issueEnabled) && (<ControlBox>
                        {issueEnabled &&
                        <Button
                            label={t`Issue badge`}
                            variant="primary"
                            size="smaller"
                            type="link"
                            to={badgeIssuePath}
                            params={{ badgeClass: badgeClass.id, id: badgeClass.projectId }}
                        />}
                        {editEnabled && <BadgeEditLink href={createBadgeClassEditHref(badgeClass)} target="_blank">
                            {t`Edit badges`}
                        </BadgeEditLink>}
                    </ControlBox>)}
                    <Heading title={name}>
                        <Name>{name}</Name>
                    </Heading>
                </BadgeRight>
            </BadgeTop>

            {ub && !ub.mine && <div>
                <OwnerHeading>{t`Badge owner: ${owner}`}</OwnerHeading>
            </div>}

            <Tabs items={[
                {
                    label:   t`Badge class information`,
                    enabled: true,
                    active:  badgeClassTab === 'information',
                    to:      '?badgeClassTab=information',
                    content: () => (<React.Fragment key="inf">
                        {badgeClass && variant === 'default' && <Deps badgeClass={badgeClass} />}

                        <Desc><Markdown source={description} /></Desc>

                        {desc && <TaskFinishDesc>{desc}</TaskFinishDesc>}

                        {criteria && (<div>
                            <TasksTitle>{t`Tasks`}</TasksTitle>

                            {criteria.map(criterion => (
                                <Criterion
                                    key={criterion.id}
                                    criterion={criterion}
                                    badgeClass={badgeClass}
                                    onBadgeGained={gained => setGainedBadge(gained)}
                                    variant={variant}
                                    openCriterion={openCriterion}
                                />))}
                        </div>)}
                    </React.Fragment>),
                },
                {
                    label:   t`Badge class users`,
                    enabled: _get(badgeClass, 'perms.edit.value') === 1,
                    active:  badgeClassTab === 'users',
                    to:      '?badgeClassTab=users',
                    content: () => (<BadgeClassUsers id={_get(badgeClass, 'id')} />),
                },
                {
                    label:   t`Badge class endorsements`,
                    enabled: _get(badgeClass, 'endorsements.total', 0) > 0
                                 || _get(badgeClass, 'perms.requestEndorsement.value') === 1,
                    active:  badgeClassTab === 'endorsements',
                    to:      '?badgeClassTab=endorsements',
                    content: () => badgeClass && (<Endorsements
                        id={badgeClass.id}
                        onOpenEndorsementRequest={() => setEndorsementForm(true)}
                        canRequest={_get(badgeClass, 'perms.requestEndorsement.value') === 1}
                    />),
                },
            ]} />

            <Dialog badge={gainedBadge} onClose={() => setGainedBadge(null)} />
            {!gainedBadge && endorsementForm && <RequestEndorsement
                id={badgeClass.id}
                onClose={() => setEndorsementForm(false)}
            />}
        </Root>
    );
};

BadgeClass.propTypes = {
    badgeClass:               PropTypes.shape({
        id:               PropTypes.string.isRequired,
        name:             PropTypes.string.isRequired,
        picture:          PropTypes.string.isRequired,
        description:      PropTypes.string.isRequired,
        minTasksRequired: PropTypes.number.isRequired,
        projectId:        PropTypes.string.isRequired,
        criteria:         PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
        status:           PropTypes.oneOf(['draft', 'published']).isRequired,
        userBadge:        PropTypes.shape({
            mine: PropTypes.bool.isRequired,
        }),
        perms:            PropTypes.shape({
            edit:               PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            requestEndorsement: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }),
        }).isRequired,
        endorsements:     PropTypes.shape({
            total: PropTypes.number.isRequired,
        }).isRequired,
    }),
    userBadge:                PropTypes.shape({
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mine:        PropTypes.bool,
        criteria:    PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
    }),
    setGainedBadge:           PropTypes.func.isRequired,
    gainedBadge:              PropTypes.shape({}),
    variant:                  PropTypes.oneOf(['default', 'userBadge']),
    badgeClassTab:            PropTypes.oneOf(['information', 'endorsements']),
    endorsementForm:          PropTypes.bool.isRequired,
    setEndorsementForm:       PropTypes.func.isRequired,
    createBadgeClassEditHref: PropTypes.func,
    badgeIssuePath:           PropTypes.string,
    openCriterion:            PropTypes.string,
};

BadgeClass.defaultProps = {
    gainedBadge:              null,
    userBadge:                null,
    badgeClass:               null,
    variant:                  'default',
    badgeClassTab:            'information',
    createBadgeClassEditHref: null,
    badgeIssuePath:           null,
    openCriterion:            null,
};

export default compose(
    branch(({ badgeClass, userBadge }) => !badgeClass && !userBadge, renderNothing),
    withStateHandlers({
        gainedBadge:     null,
        endorsementForm: false,
    }, {
        setGainedBadge:     () => gainedBadge => ({ gainedBadge }),
        setEndorsementForm: () => endorsementForm => ({ endorsementForm }),
    }),
)(BadgeClass);
