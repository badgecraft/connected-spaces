import { t } from 'ttag';
import styled from '@emotion/styled';
import { font16, font24 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

// eslint-disable-next-line
export const toTeamName = team => {
    switch (team) {
        case 'participants':
            return t`Participants`;
        case 'trainers':
            return t`Trainers`;
        case 'contractors':
            return t`Contractors`;
        default:
            return null;
    }
};

export const Title = styled('h1')(({ theme }) => ({
    ...font16,
    padding: '12px 0px',
    color:   '#000000',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
        display:     'inline-block',
        marginRight: 27,
    },
}));
