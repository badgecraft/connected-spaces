import React from 'react';
import styled from '@emotion/styled';
import Card from './Card';

const Text = styled('div')(({ width = 100 }) => ({
    backgroundColor: '#BDBDBD',
    width,
    height:          14,
    display:         'block',
    marginBottom:    8,
}));

const ActivityCardLoading = () => (<Card
    cover={{ color: '#BDBDBD', fade: true }}
    name={<Text width={150} />}
    details={<div>
        <Text width={100} />
        <Text width={50} />
    </div>}
    action={<Text width="100%" />}
/>);

export default ActivityCardLoading;
