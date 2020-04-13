import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { branch, renderComponent, mapProps, renderNothing } from 'recompose';
import { t } from 'ttag';
import Link from '../Link';
import { font14A4, font8 } from '../uiFonts';
import completedPic from './completed.svg';

const Picture = styled('div')(({ picture, withLink, size, circleEnabled }) => ({
    width:  120,
    height: 120,
    ...(size === 'small' && { width: 60, height: 60 }),

    ...(circleEnabled && {
        width:        80,
        height:       80,
        margin:       20,
        borderRadius: 4,
        ...(size === 'small' && { width: 40, height: 40, margin: 10 }),
    }),

    background: `transparent url("${picture}") center center/contain no-repeat`,
    display:    'inline-block',
    cursor:     withLink ? 'pointer' : 'default',
}));

const rootStyle = ({ size }) => ({
    margin:     8,
    width:      120,
    display:    'inline-block',
    flexShrink: 0,
    textAlign:  'left',

    ...(size === 'small' && {
        width: 60,
    }),
});

const RootLink = mapProps(({ link, ...other }) => ({ ...other, ...link }))(styled(Link)(rootStyle));
const Root = branch(({ link }) => link, renderComponent(RootLink))(styled('div')(rootStyle));

const Anchor = styled('div')(({ enabled }) => ({
    position: 'relative',
    ...(!enabled && { display: 'none' }),
}));

const Svg = styled('svg')(({ size }) => ({
    position:  'absolute',
    width:     120,
    height:    120,
    transform: 'rotate(-90deg)',
    ...(size === 'small' && {
        width:  60,
        height: 60,
    }),
}));

const CircleBack = styled('circle')({
    stroke:        'rgba(0, 0, 0, 0.1)',
    strokeLinecap: 'round',
    transition:    'all 0.3s linear 0ms',
});

const toStroke = (r, value) => 2 * Math.PI * r * value;

const CircleTop = styled('circle')(({ value, r, theme }) => ({
    stroke:          _get(theme, 'colors.primary'),
    strokeLinecap:   'round',
    transition:      'all 0.3s linear 0ms',
    strokeDasharray: `${toStroke(r, value)} ${toStroke(r, 1 - value)}`,
    visibility:      value === 0 ? 'hidden' : 'visible',
}));

const Name = styled('div')({
    ...font14A4,
    marginBottom: 8,
    textAlign:    'center',
});

const Completed = styled('div')(({ size }) => ({
    display:    'inline-block',
    width:      18,
    height:     18,
    background: `transparent url("${completedPic}") center center/contain no-repeat`,
    position:   'relative',
    top:        92,
    left:       92,

    ...(size === 'small' && {
        top:  42,
        left: 42,
    }),
}));

const Draft = styled('span')(({ theme }) => ({
    ...font8,
    borderRadius:    3,
    backgroundColor: _get(theme, 'colors.primary'),
    color:           '#ffffff',
    whiteSpace:      'nowrap',
    padding:         '6px 4px 5px 3px',
    flexShrink:      0,
}));

const BadgeThumb = ({ badgeClass, userBadge, showBalloon, link, size, variant }) => {
    const name = _get(badgeClass, 'name') || _get(userBadge, 'name');
    const picture = _get(badgeClass, 'picture') || _get(userBadge, 'picture');
    const balloon = showBalloon && { 'data-balloon': name, 'data-balloon-pos': 'down' };
    const criteria = _get(badgeClass, 'criteria') || _get(userBadge, 'criteria') || [];
    const completedCount = criteria.filter(c => _get(c, 'task.status') === 'finished').length;
    const minimumValue = _get(badgeClass, 'quest') ? 0.01 : 0;
    const value = completedCount > 0
        ? completedCount / criteria.length
        : minimumValue;
    const completed = !!_get(badgeClass, 'userBadge.mine') || !!_get(userBadge, 'mine');
    const circleEnabled = badgeClass && badgeClass.evidenceRequired && !completed;
    const isDraft = badgeClass && badgeClass.status !== 'published';

    return (
        <Root link={link} title={name} size={size}>
            <Anchor enabled={circleEnabled}>
                <Svg viewBox="0 0 42 42" size={size}>
                    <CircleBack cx={21} cy={21} r={20} fill="none" strokeWidth="1" strokeMiterlimit="20" />
                    <CircleTop cx={21} cy={21} r={20} fill="none" strokeWidth="1" strokeMiterlimit="20" value={value} />
                </Svg>
            </Anchor>
            <Picture
                picture={picture}
                {...balloon}
                withLink={!!link}
                size={size}
                circleEnabled={circleEnabled}
            >
                {completed && <Completed size={size} />}
                {isDraft && <Draft>{t`Not published yet`}</Draft>}
            </Picture>
            {variant === 'default' && <React.Fragment>
                {!showBalloon && <Name>{name}</Name>}
            </React.Fragment>}
        </Root>
    );
};

BadgeThumb.propTypes = {
    badgeClass:  PropTypes.shape({
        picture:          PropTypes.string.isRequired,
        name:             PropTypes.string.isRequired,
        evidenceRequired: PropTypes.bool,
        userBadge:        PropTypes.shape({
            mine: PropTypes.bool,
        }),
        quest:            PropTypes.shape(),
        criteria:         PropTypes.arrayOf(PropTypes.shape({
            task: PropTypes.shape({
                status: PropTypes.oneOf(['waitForEvidence', 'waitForApprove', 'waitForFix', 'finished']).isRequired,
            }),
        })),
        status:           PropTypes.oneOf(['draft', 'published']).isRequired,
    }),
    userBadge:   PropTypes.shape({
        picture:  PropTypes.string.isRequired,
        name:     PropTypes.string.isRequired,
        mine:     PropTypes.bool,
        criteria: PropTypes.arrayOf(PropTypes.shape({
            task: PropTypes.shape({
                status: PropTypes.oneOf(['waitForEvidence', 'waitForApprove', 'waitForFix', 'finished']).isRequired,
            }),
        })),
    }),
    showBalloon: PropTypes.bool,
    link:        PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape({}),
    }),
    size:        PropTypes.oneOf(['small', 'normal']),
    variant:     PropTypes.oneOf(['default', 'clean']),
};

BadgeThumb.defaultProps = {
    showBalloon: false,
    link:        null,
    size:        'normal',
    variant:     'default',
    userBadge:   null,
    badgeClass:  null,
};

export default branch(({ badgeClass, userBadge }) => !badgeClass && !userBadge, renderNothing)(BadgeThumb);
