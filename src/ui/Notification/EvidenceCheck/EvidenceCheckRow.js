import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import _get from 'lodash/get';
import { jt, t } from 'ttag';
import { Field } from 'redux-form';
import Files from '../../BadgeClass/EvidenceFiles';
import Markdown from '../../Markdown';
import { themedMinWidth } from '../../uiUtils';
import { font14, font16A1, font12 } from '../../uiFonts';
import { LinkOrBold } from '../NotifyItem/notifyItemUtils';
import Button from '../../Button';
import Input from '../../Form/InputField';

const isType = type => ev => ev.__typename === type;

const Root = styled('form')({
    display:         'block',
    width:           '100%',
    backgroundColor: '#ffffff',
    boxShadow:       '0 14px 14px 0 rgba(0,0,0,0.07)',
    color:           '#3E3564',
    padding:         16,
    marginBottom:    32,
});

const InfoRoot = styled('div')({
    display:         'flex',
    alignItems:      'center',
    padding:         '8px 0px',
    backgroundColor: 'transparent',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ picture, theme, marginRight, marginLeft }) => ({
    width:      32,
    height:     32,
    background: `transparent url("${picture}") center center/contain no-repeat`,
    flexShrink: 0,
    marginRight,
    marginLeft,

    [themedMinWidth('tablet', theme)]: {
        width:  48,
        height: 48,
    },
}));

const Data = styled('div')({
    flexGrow: 1,
    ...font16A1,
});

const Strong = styled('strong')({
    ...font14,
});

const Evidences = styled('div')({});

const Buttons = styled('div')({
    textAlign: 'right',
});

const Label = styled('div')({
    ...font12,
    marginTop:    16,
    marginBottom: 8,
});

const Text = styled('div')({
    borderLeft:  '1px solid #E5E3ED',
    paddingLeft: 8,
    marginTop:   0,
});

const EvidenceCheckRow = ({ item, paths, handleAccept, handleReject, submitting }) => {
    const evidences = _get(item, 'evidences') || [];
    const files = evidences.filter(isType('FileEvidence')).map(ev => ev.file);
    const { no, description } = item.criterion;
    const projectId = _get(item, 'badgeClass.projectId');
    const badgeClassId = _get(item, 'badgeClass.id');

    const user = (<Strong key="u">{_get(item, 'user.name')}</Strong>);
    const badge = (<LinkOrBold
        key="b"
        link={_get(item, 'badgeClass.perms.view.value') === 1 && badgeClassId && projectId}
        to={paths.badgeClassView}
        params={{ id: badgeClassId, projectId }}
        target="_blank"
    >{_get(item, 'badgeClass.name')}</LinkOrBold>);

    return (
        <Root method="POST">
            <InfoRoot>
                <Pic marginLeft={0} marginRight={16} picture={_get(item, 'user.picture')} />
                <Data>
                    {jt`${user} has requested that you verify the evidence to complete task for ${badge}`}
                </Data>
                <LinkOrBold
                    key="b"
                    link={_get(item, 'badgeClass.perms.view.value') === 1 && badgeClassId && projectId}
                    to={paths.badgeClassView}
                    params={{ id: badgeClassId, projectId }}
                    target="_blank"
                >
                    <Pic marginLeft={16} marginRight={0} picture={_get(item, 'badgeClass.picture')} />
                </LinkOrBold>

            </InfoRoot>
            <div>
                <Label>{t`For criterion ${no}`}</Label>
                <Markdown source={description} />
            </div>
            <Evidences>
                <Label>{t`Evidences submitted`}</Label>
                <Files files={files} />
                <Text>
                    {evidences.filter(isType('TextEvidence')).map(ev => (<Markdown key={ev.id} source={ev.text} />))}
                </Text>
            </Evidences>

            <div>
                <Field
                    name="comment"
                    component={Input}
                    multiLine
                    placeholder={t`Type your comment here`}
                    disabled={submitting}
                />
                <Buttons>
                    <Button
                        type="button"
                        variant="secondary"
                        label={t`Please improve`}
                        onClick={handleReject}
                        disabled={submitting}
                    />
                    {' '}
                    <Button
                        type="button"
                        variant="primary"
                        label={t`Approve`}
                        onClick={handleAccept}
                        disabled={submitting}
                    />
                </Buttons>
            </div>
        </Root>
    );
};

EvidenceCheckRow.propTypes = {
    item:         PropTypes.shape({
        user:       PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        badgeClass: PropTypes.shape({
            name:      PropTypes.string.isRequired,
            picture:   PropTypes.string.isRequired,
            projectId: PropTypes.string.isRequired,
            perms:     PropTypes.shape({
                view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
        }).isRequired,
        criterion:  PropTypes.shape({
            no:          PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        evidences:  PropTypes.arrayOf(PropTypes.shape({
            id:         PropTypes.string.isRequired,
            __typename: PropTypes.oneOf(['FileEvidence', 'TextEvidence']).isRequired,
        })).isRequired,
    }).isRequired,
    paths:        PropTypes.shape({
        badgeClassView: PropTypes.string.isRequired,
    }).isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
};

export default EvidenceCheckRow;
