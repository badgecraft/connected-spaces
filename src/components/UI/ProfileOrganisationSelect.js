import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import Link from '../Link';
import { paths, Colors } from '../Constants';

const Root = styled('div')``;

const List = styled('ul')`
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 140px;
    overflow-y: scroll;
`;

const Item = styled('li')`
    border-top: 1px solid #F0EFF8;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: ${Colors.heading};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-child {
        border-bottom: 1px solid #F0EFF8;
    }
`;

const Image = styled('img')`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 12px;
`;

// todo loading
const ProfileOrganisationSelect = ({ list = [], ...props }) => (
    <Root {..._pick(props, 'className')}>
        <List>
            {list.filter(item => item).map(org => (
                <Item key={org.id}>
                    <Link to={paths.spaceView} params={org}>
                        <Image alt={org.name} src={org.picture} /> {org.name}
                    </Link>
                </Item>
            ))}
        </List>
    </Root>
);

ProfileOrganisationSelect.propTypes = {
    // total:   PropTypes.number.isRequired,
    list:    PropTypes.arrayOf(PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ProfileOrganisationSelect;
