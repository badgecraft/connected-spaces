import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
});

class ErrorPage extends React.Component {
    static propTypes = {
        error: PropTypes.shape({
            name:    PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            stack:   PropTypes.string.isRequired,
        }),
    };

    static defaultProps = {
        error: null,
    };

    render() {
        if (__DEV__ && this.props.error) {
            return (
                <div>
                    <h1>{this.props.error.name}</h1>
                    <pre>{this.props.error.stack}</pre>
                </div>
            );
        }

        return (
            <Root>
                <p>Sorry, a critical error occurred on this page, please reload or try again later</p>
            </Root>
        );
    }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default ErrorPage;
