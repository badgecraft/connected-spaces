import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { branch, renderComponent } from 'recompose';
import _get from 'lodash/get';
import { paths } from '../Constants';
import Link from '../Link';
import { font14 } from '../../ui/uiFonts';

const Container = styled(Box)({
    display:    'flex',
    alignItems: 'center',
});

const Name = styled(Box)({
    ...font14,
    color: '#3E3564',
});

const Picture = styled('div')(({ bg }) => ({
    display:     'inline-block',
    background:  `transparent url("${bg}") center center/60px 60px no-repeat`,
    width:       60,
    height:      60,
    marginRight: 20,
}));

const EmptyPic = styled('div')({
    width:       60,
    marginRight: 20,
});

const NameBox = styled('div')({});

const Linkish = branch(
    props => _get(props, 'perms.view.value') === 1,
    renderComponent(Link),
)(React.Fragment);

const Organizer = ({ id, picture, name, perms }) => (
    <Linkish perms={perms} to={paths.spaceView} params={{ id }}>
        <Container my={2} mx={2}>
            {picture ? <Picture bg={picture} /> : (<EmptyPic />)}
            <NameBox>
                <Name>{name}</Name>
            </NameBox>
        </Container>
    </Linkish>
);

Organizer.propTypes = {
    id:      PropTypes.string.isRequired,
    name:    PropTypes.string.isRequired,
    picture: PropTypes.string,
    perms:   PropTypes.shape({
        view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
};

Organizer.defaultProps = {
    picture: null,
};

export default Organizer;
