import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t, jt } from 'ttag';
import { toLink } from '../Link';

const Link = styled.a`
    text-decoration: underline;
    margin: 0 4px;
`;

const Container = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 40px 20px 0px 20px;
    min-height: 300px;
`;

export default class RedirectPage extends React.Component {
    static propTypes = {
        params: PropTypes.shape().isRequired,
        to:     PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { to, params } = this.props;
        window.location.href = toLink({ to, params });
    }

    render() {
        const { to, params } = this.props;
        const link = (<Link key="l" href={toLink({ to, params })}>{t`Click this link`}</Link>);
        return (<Container>
            {jt`If the page is not redirected ${link}`}
        </Container>);
    }
}
