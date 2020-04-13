import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t, jt } from 'ttag';
import _get from 'lodash/get';
import { Box } from '@rebass/emotion';
import GoalProgressBar from './GoalProgressBar';
import { font14A1, font14A4, font12A6, font16A3, font16A7 } from '../uiFonts';
import ContextMenu from '../Menu/ContextMenu';
import context from './context.svg';
import expand from './expand.svg';
import add from '../Form/add.svg';
import checkedIcon from './checked.svg';
import Link from '../Link';
import { themedMinWidth } from '../uiUtils';
import EditableGoalTitle from './EditableGoalTitle';
import lock from './lock.svg';
import remove from './remove.svg';
import view from './view.svg';

const Root = styled('div')({
    border:       '1px solid #E5E3ED',
    borderRadius: 15,
    margin:       '15px 0 0 0',
    padding:      '10px 5px 10px 15px',
    display:      'flex',
    alignItems:   'center',
});

const Main = styled('div')(({ theme }) => ({
    ...font14A1,
    flexGrow:    1,
    paddingLeft: 4,

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
        display:        'flex',
        flexDirection:  'row',
        alignItems:     'center',
        justifyContent: 'space-between',
    },
}));

const Actions = styled('div')({
    flexShrink: 0,
    whiteSpace: 'nowrap',
});

const Label = styled('label')({
    marginRight: 8,
    cursor:      'pointer',
    flexGrow:    1,
    height:      '100%',
});

const Status = styled('div')(({ theme }) => ({
    ...font12A6,
    whiteSpace: 'nowrap',

    [themedMinWidth('tablet', theme)]: {
        ...font16A7,
    },
}));

const Expander = styled('label')({
    display:       'inline-block',
    verticalAlign: 'middle',
    width:         12,
    height:        12,
    background:    `transparent url("${expand}") center center/12px 12px no-repeat`,
    cursor:        'pointer',
    padding:       15,
    transition:    'all .3s',
});

const Expanded = styled('div')({
    borderBottomLeftRadius:  15,
    borderBottomRightRadius: 15,

    height:    0,
    overflowY: 'hidden',
});

const CheckpointStatus = styled('span')(({ checked, theme }) => ({
    display:       'inline-block',
    verticalAlign: 'middle',
    width:         20,
    height:        20,
    border:        `1px solid ${_get(theme, 'colors.primary')}`,
    borderRadius:  '50%',
    marginBottom:  2,
    cursor:        'pointer',

    ...(checked && {
        background: `${_get(theme, 'colors.primary')} url("${checkedIcon}") center center/6px 5px no-repeat`,
    }),
}));

const CheckpointText = styled('div')({
    borderBottom:   '1px solid #E5E3ED',
    marginLeft:     10,
    flexGrow:       1,
    padding:        '10px 0',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
});

const CheckpointActions = styled('div')({});

const CheckpointRoot = styled('div')({
    display:    'flex',
    alignItems: 'center',
    flexShrink: 0,
});

const AddRoot = styled('div')({
    paddingTop: 10,
});

const Add = styled('span')({
    display:       'inline-block',
    verticalAlign: 'middle',
    width:         20,
    height:        20,
    background:    `transparent url("${add}") center center/contain no-repeat`,
    border:        '0 none',
    outline:       'none',
    cursor:        'pointer',
    marginRight:   10,
    marginBottom:  2,
});

const List = styled('ul')({
    margin:  '10px 15px',
    padding: 0,

    li: {
        ...font14A4,
        listStyleType: 'none',
        marginBottom:  5,
    },
});

const Container = styled('div')({
    [`${Expanded}`]: {},
});

const Input = styled('input')({
    display: 'none',

    [`&:checked + ${Container}`]: {
        [`${Root}`]: {
            borderBottomLeftRadius:  0,
            borderBottomRightRadius: 0,
            [`${Expander}`]:         {
                transform: 'rotate(180deg)',
            },
        },

        [`${Expanded}`]: {
            height:    'auto',
            border:    '1px solid #E5E3ED',
            borderTop: '0 none',
        },
    },
});

const ViewLink = styled(Link)({
    ...font12A6,
    display:       'inline-block',
    verticalAlign: 'middle',
    width:         24,
    height:        24,
    background:    `transparent url("${view}") center center/16px 16px no-repeat`,
    marginRight:   8,
});

const EditableRoot = styled('div')({
    marginRight:  8,
    marginTop:    -4,
    marginBottom: -4,
    marginLeft:   -8,
    width:        '100%',
});

const Locked = styled('span')({
    width:         16,
    height:        16,
    background:    `transparent url("${lock}") center center/12px 12px no-repeat`,
    display:       'inline-block',
    verticalAlign: 'middle',
    marginRight:   4,
    marginBottom:  2,
    marginLeft:    -4,
});

const Remove = styled('button')({
    width:         24,
    height:        24,
    flexShrink:    0,
    outline:       'none',
    border:        '0 none',
    cursor:        'pointer',
    background:    `transparent url("${remove}") center center/16px 16px no-repeat`,
    verticalAlign: 'middle',
    display:       'inline-block',
});

const GoalItem = (props) => {
    const {
        item, addTaskPath, onRemoveGoal, onToggleStepCompleted, onAddStep, viewStepPath, setEditMode, editMode,
        onRemoveStep,
    } = props;
    const steps = (item.steps || []);
    const totalSteps = steps.length;
    const completedSteps = steps.filter(step => step.completed).length;
    const completed = totalSteps > 0 && completedSteps === totalSteps;

    const bar = (<GoalProgressBar key="pb" value={(completedSteps / totalSteps) || 0} />);
    const status = completed
        ? jt`Completed ${bar} ${completedSteps}/${totalSteps}`
        : jt`Not completed ${bar} ${completedSteps}/${totalSteps}`;

    const lockedMessage = t`Goals title is not editable, because it was created using an indicator`;

    return (
        <Box width={1}>
            <Input type="checkbox" id={item.id} defaultChecked={totalSteps === 0} />
            <Container>
                <Root>
                    <Main>
                        {editMode
                            ? (<EditableRoot><EditableGoalTitle
                                autoFocus
                                id={item.id}
                                value={item.title}
                                onComplete={() => setEditMode(false)}
                            /></EditableRoot>)
                            : (<Label htmlFor={item.id}>
                                {_get(item, 'perms.editTitle.value') !== 1
                                && <Locked data-balloon={lockedMessage} data-balloon-pos="right" />}
                                {item.title}
                            </Label>)}
                        {totalSteps > 0 && <Status>{status}</Status>}
                    </Main>
                    <Actions>
                        <Expander htmlFor={item.id} />
                        <ContextMenu
                            icon={context}
                            items={[
                                {
                                    label:   t`Edit goal title`,
                                    onClick: () => setEditMode(true),
                                    enabled: _get(item, 'perms.editTitle.value') === 1 && !editMode,
                                },
                                { label: t`Add step`, onClick: onAddStep, enabled: true },
                                { label: t`Remove goal`, onClick: onRemoveGoal, enabled: true },
                            ]}
                        />
                    </Actions>
                </Root>
                <Expanded>
                    <List>
                        {steps.filter(step => step).map(step => (
                            <li key={step.id}>
                                <CheckpointRoot>
                                    <CheckpointStatus
                                        checked={step.completed}
                                        onClick={() => onToggleStepCompleted(step.id, !step.completed)}
                                    />
                                    <CheckpointText>
                                        {step.title}
                                        <CheckpointActions>
                                            {!step.completed
                                            && <ViewLink
                                                to={viewStepPath}
                                                params={step}
                                                title={t`View goal step details`}
                                            />}
                                            {!step.completed && (<Remove
                                                type="button"
                                                onClick={() => onRemoveStep(step.id)}
                                                title={t`Remove goal step`}
                                            />)}
                                        </CheckpointActions>
                                    </CheckpointText>
                                </CheckpointRoot>
                            </li>
                        ))}
                        <li>
                            <AddRoot>
                                <Link to={addTaskPath} params={item}><Add /> {t`Add step`}</Link>
                            </AddRoot>
                        </li>
                    </List>
                </Expanded>
            </Container>
        </Box>
    );
};

GoalItem.propTypes = {
    item:                  PropTypes.shape({
        id:    PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        steps: PropTypes.arrayOf(PropTypes.shape({
            id:        PropTypes.string.isRequired,
            title:     PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            perms:     PropTypes.shape({
                editTitle: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
    addTaskPath:           PropTypes.string.isRequired,
    viewStepPath:          PropTypes.string.isRequired,
    onRemoveGoal:          PropTypes.func.isRequired,
    onToggleStepCompleted: PropTypes.func.isRequired,
    onAddStep:             PropTypes.func.isRequired,
    editMode:              PropTypes.bool.isRequired,
    setEditMode:           PropTypes.func.isRequired,
    onRemoveStep:          PropTypes.func.isRequired,
};

export default GoalItem;
