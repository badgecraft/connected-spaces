import styled from '@emotion/styled';
import { withProps } from 'recompose';

const style = {
    width:  '100%',
    height: 300,
};

export default withProps(({ id }) => ({
    src:             `https://player.vimeo.com/video/${id}`,
    frameBorder:     0,
    allow:           'autoplay; fullscreen',
    allowFullScreen: true,
}))(styled('iframe')(style));
