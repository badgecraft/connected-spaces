import styled from '@emotion/styled';
import { withProps } from 'recompose';

const style = {
    width:  '100%',
    height: 300,
};

export default withProps(({ id }) => ({
    src:             `https://www.youtube.com/embed/${id}`,
    frameBorder:     0,
    allow:           'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
}))(styled('iframe')(style));
