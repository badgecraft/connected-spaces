import React from 'react';
import { compose, mapProps, renderComponent, branch } from 'recompose';
import { t } from 'ttag';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import Evidence from './EvidenceFiles';
import { font12 } from '../uiFonts';

const Title = styled('h3')({
    ...font12,
    color: '#A59FC0',
});

const NoPermission = () => (
    <Title>{t`You are not allowed to view these evidence`}</Title>
);

const NoEvidenceSupplied = () => (
    <Title>{t`No evidence supplied`}</Title>
);

export const extractComment = object => (_get(object, 'evidences') || [])
    .filter(({ __typename }) => __typename === 'TextEvidence')
    .map(({ text }) => text)
    .join('\n');

export const extractFiles = object => (_get(object, 'evidences') || [])
    .filter(({ __typename }) => __typename === 'FileEvidence')
    .map(ev => _get(ev, 'file'))
    .filter(f => f);

export default compose(
    branch(({ criterion }) => criterion.evidences === null, renderComponent(NoPermission)),
    branch(({ criterion }) => criterion.evidences.length === 0, renderComponent(NoEvidenceSupplied)),
    mapProps(({ criterion }) => ({
        files:   extractFiles(criterion),
        comment: extractComment(criterion),
    })),
)(Evidence);
