import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import share from './share.svg';
import ShareView from './Share';
import outsidify from '../Modal/outsidify';

const Share = outsidify({})(ShareView);

const Root = styled('div')({
    display: 'inline-block',
    padding: 10,
});

const Button = styled('button')({
    width:      40,
    height:     40,
    background: `transparent url("${share}") center center/contain no-repeat`,
    display:    'inline-block',
    border:     '0 none',
    cursor:     'pointer',
    outline:    'none',
});

const Anchor = styled('div')({
    position: 'relative',
});

const Expanded = styled('div')({
    position:        'absolute',
    width:           40,
    backgroundColor: '#ffffff',
    borderRadius:    20,
    border:          '1px solid #E5E3ED',
});

const ShareButton = ({ url, open, setOpen }) => (
    <Root>
        <Button type="button" onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            setOpen(!open);
        }} />
        {open && <Anchor>
            <Expanded onClick={() => setTimeout(() => setOpen(false), 100)}>
                <Share url={url} vertical onClose={() => setTimeout(() => setOpen(false), 100)} />
            </Expanded>
        </Anchor>}
    </Root>
);

ShareButton.propTypes = {
    url:     PropTypes.string.isRequired,
    open:    PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default withState('open', 'setOpen', false)(ShareButton);
