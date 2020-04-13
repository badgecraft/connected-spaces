import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { defaultProps } from 'recompose';
import { Colors } from "../Constants";

export const Content = defaultProps({ mx: [3, 2, 4] })(styled(Box)(
    ({ bg, align, color }) => ({
        ...(bg && { backgroundColor: bg }),
        ...(align && { textAlign: align }),
        ...(color && { color }),
    })
));

export const Container = styled.div({
    backgroundColor: Colors.pageBackground
});

export default Content;
