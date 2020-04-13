import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import Style from './_appStyle';
import history from '../server/history';
import { toLink } from '../ui/Link';
import { disableNextScrollRestore } from '../ui/uiDisableReRouteOnClient';

const ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: PropTypes.func.isRequired,
    // Universal HTTP client
    fetch:     PropTypes.func.isRequired,
    pathname:  PropTypes.string.isRequired,
    query:     PropTypes.shape(),
    // Integrate Redux
    // http://redux.js.org/docs/basics/UsageWithReact.html
    ...ReduxProvider.childContextTypes,
    // Apollo Client
    client:    PropTypes.shape().isRequired,
    baseURL:   PropTypes.string.isRequired,
    bcWebURL:  PropTypes.string.isRequired,
    lang:      PropTypes.string.isRequired,
    cookies:   PropTypes.shape(),

    paths: PropTypes.shape({}).isRequired,

    pushPath:  PropTypes.func,
    pushRoute: PropTypes.func,
    platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class App extends React.PureComponent {
    getChildContext() {
        const { context } = this.props;
        return {
            ...context,
            pushRoute: (to, { disableNextScroll } = {}) => disableNextScrollRestore(
                () => history.push(toLink(to)),
                disableNextScroll,
            ),
            pushPath:  (to, { disableNextScroll } = {}) => disableNextScrollRestore(
                () => history.push(to),
                disableNextScroll,
            ),
        };
    }

    render() {
        // Here, we are at universe level, sure? ;-)
        const { context: { client }, children } = this.props;
        // NOTE: If you need to add or modify header, footer etc. of the app,
        // please do that inside the Layout component.
        return (
            <ApolloProvider client={client}>
                <React.Fragment key="r">
                    <Style />
                    {children}
                </React.Fragment>
            </ApolloProvider>
        );
    }
}

App.propTypes = {
    context:  PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
};

App.childContextTypes = ContextType;

export default App;
