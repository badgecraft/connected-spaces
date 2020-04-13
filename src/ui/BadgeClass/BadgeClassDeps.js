import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { t, ngettext, msgid } from 'ttag';
import styled from '@emotion/styled';
import { getContext } from 'recompose';
import { required } from '../uiUtils';
import Thumb from './BadgeThumb';
import { font12 } from '../uiFonts';

const Root = styled('div')({});

const Legend = styled('div')({
    ...font12,
    marginBottom: 8,
    color:        '#A59FC0'
});

const Deps = styled('div')({
    display:     'flex',
    alignItems:  'center',
    flexWrap:    'wrap',
    marginLeft:  -8,
    marginRight: -8,
});

const depsLabel = ({ count = required(), explicit = required() }) => {
    if (explicit > 0) {
        if (explicit === count) {
            return t`You have to get all badges from the list below`;
        }

        return ngettext(
            msgid`You have to get ${count} badge from the list below`,
            `You have to get ${count} badges from the list below`,
            count,
        );
    }

    if (count > 0) {
        return ngettext(
            msgid`You have to get ${count} badge in this project`,
            `You have to get ${count} badges in this project`,
            count,
        );
    }

    return null;
};

const BadgeClassDeps = ({ badgeClass, paths }) => {
    const count = _get(badgeClass, 'depsCount', 0);
    const explicit = _get(badgeClass, 'depsExplicit') || [];

    if (count === 0 || explicit.length === 0) {
        return null;
    }

    return (
        <Root>
            <Legend>{depsLabel({ count, explicit: explicit.length })}</Legend>
            {explicit.length > 0 && (<Deps>
                {explicit.map(dep => {
                    const { id, projectId } = dep;
                    return (
                        <Thumb
                            link={_get(dep, 'perms.view.value') === 1 && projectId ? {
                                to:     paths.badgeClassView,
                                params: { id, projectId },
                            } : null}
                            key={dep.id}
                            badgeClass={dep}
                            showBalloon
                            size="small"
                        />
                    );
                })}
            </Deps>)}
        </Root>
    );
};

BadgeClassDeps.propTypes = {
    badgeClass: PropTypes.shape({
        depsMet:      PropTypes.bool.isRequired,
        depsCount:    PropTypes.number.isRequired,
        depsExplicit: PropTypes.arrayOf(PropTypes.shape({
            id:        PropTypes.string.isRequired,
            projectId: PropTypes.string.isRequired,
            perms:     PropTypes.shape({
                view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
    paths:      PropTypes.shape({
        badgeClassView: PropTypes.string.isRequired,
    }).isRequired,
};

export default getContext({
    paths: PropTypes.shape({}).isRequired,
})(BadgeClassDeps);
