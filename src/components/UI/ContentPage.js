import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Content as _Content } from './Content';
import { font16, font16A1, font16A2 } from '../../ui/uiFonts';

const Content = styled(_Content)({
    '*':    { ...font16A1 },
    a:      { textDecoration: 'underline' },
    h1:     { ...font16 },
    h2:     { ...font16 },
    h3:     { ...font16 },
    h4:     { ...font16 },
    h5:     { ...font16 },
    h6:     { ...font16 },
    strong: { ...font16A2 },
});

const ContentPage = ({ title, html }) => (
    <Content mt={3} mb={5} mx={[3, 4, 6]}>
        {title && <h1>{title}</h1>}
        <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
        />
    </Content>
);

ContentPage.propTypes = {
    title: PropTypes.node,
    html:  PropTypes.node.isRequired,
};

ContentPage.defaultProps = {
    title: null,
};

export default ContentPage;
