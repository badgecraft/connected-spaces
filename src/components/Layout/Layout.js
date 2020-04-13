import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { compose, getContext, withState } from 'recompose';
import { Container as _Container } from '../UI/Content';
import Header from '../UI/DefaultHeader';
import Footer from '../UI/Footer';
import BottomMenu from '../UI/DefaultBottomMenu';
import Flash from '../../ui/Flash';
import BottomInfoBar from '../../ui/BottomBar/BottomBar';
import BugReport from '../../ui/BugReport';
import PageSwitching from '../Spinner/PageSwitching';
import paths from '../../constants/paths';
import query from '../../core/defaultRouteQuery.gql';
import theme from '../../theme';
import ExternalOpen from '../Event/EventOnOtherSite';

const Container = styled(_Container)(({ fullScreen }) => ({
    ...(fullScreen && {
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
    })
}));

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.eventsList = [];
    }

    getChildContext = () => {
        const { viewer, route, contextOrganisation, mapType, setExternalEvent } = this.props;
        return {
            viewer,
            route,
            addEscapeListener: this.addListener,
            contextOrganisation,
            paths,
            mapType,
            setExternalEvent,
        };
    };

    componentDidMount() {
        document.addEventListener('keyup', this.handleListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleListener, false);
    }

    addListener = (func) => {
        if (this.eventsList.indexOf(func) === -1) {
            this.eventsList.push(func);
        }
        return () => this.removeListener(func);
    };

    removeListener = (func) => {
        this.eventsList = this.eventsList.filter((f) => f !== func);
    };

    handleListener = (evt) => {
        if (evt.keyCode === 27) {
            const func = this.eventsList[this.eventsList.length - 1];
            if (func) {
                func();
                this.removeListener(func);
            }
        }
    };

    render() {
        const {
            children, route = { path: '/' }, fullScreen, header, bottomMenu, footer, bottomConfig, colors, mapType,
            externalEvent, setExternalEvent,
        } = this.props;
        return (
            <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, ...colors } }}>
                <Container fullScreen={fullScreen}>
                    {header || <Header withMobileLogo />}
                    <Flash />
                    {children}
                    {!fullScreen && (
                        typeof footer === 'undefined'
                            ? <Footer />
                            : footer
                    )}
                    {typeof bottomMenu === 'undefined'
                        ? <BottomMenu route={route} mapType={mapType} />
                        : bottomMenu}
                    <BottomInfoBar cookieName="conn_ac1" bottomConfig={bottomConfig} />
                    <BugReport />
                    <PageSwitching />
                    <ExternalOpen event={externalEvent} onCancel={() => setExternalEvent(null)} />
                </Container>
            </ThemeProvider>
        )
    }
}

Layout.propTypes = {
    children:            PropTypes.node.isRequired,
    route:               PropTypes.shape({
        path:   PropTypes.string.isRequired,
        params: PropTypes.shape().isRequired,
    }).isRequired,
    fullScreen:          PropTypes.bool,
    viewer:              PropTypes.shape(),
    header:              PropTypes.node,
    bottomMenu:          PropTypes.node,
    footer:              PropTypes.node,
    contextOrganisation: PropTypes.string,
    bottomConfig:        PropTypes.shape(),
    colors:              PropTypes.shape(),
    mapType:             PropTypes.string.isRequired,
    externalEvent:       PropTypes.shape(),
    setExternalEvent:    PropTypes.func.isRequired,
};

Layout.defaultProps = {
    fullScreen:          false,
    viewer:              null,
    header:              null,
    footer:              undefined,
    bottomMenu:          undefined,
    contextOrganisation: null,
    bottomConfig:        {},
    colors:              {},
    externalEvent:       null,
};

Layout.childContextTypes = {
    addEscapeListener:   PropTypes.func,
    viewer:              PropTypes.shape(),
    route:               PropTypes.shape(),
    contextOrganisation: PropTypes.string,
    paths:               PropTypes.shape(),
    mapType:             PropTypes.string,
    setExternalEvent:    PropTypes.func.isRequired,
};

const ConnectedLayout = compose(
    getContext({ lang: PropTypes.string.isRequired }),
    withState('externalEvent', 'setExternalEvent', null),
    graphql(query, {
        options: { fetchPolicy: 'cache-first' },
        props:   ({ data: { site } }) => ({
            colors:  _get(site, 'colors') || {},
            mapType: _get(site, 'mapType') || 'map',
        }),
    }),
)(Layout);

ConnectedLayout.displayName = 'ConnectedLayout';

export default ConnectedLayout;
