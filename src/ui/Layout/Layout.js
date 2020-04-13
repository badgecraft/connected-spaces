import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Spinner from '../Spinner/PageLoadSpinner';
import Flash from '../Flash';
import BugReport from '../BugReport';
import BottomInfoBar from '../BottomBar/BottomBar'

const Root = styled('div')({
    background:    '#ffffff',
    minHeight:     '100%',
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'stretch',
});

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.eventsList = [];
    }

    getChildContext = () => ({
        addEscapeListener: this.addListener,
    });

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

    render = () => (
        <Root>
            <Spinner />
            {this.props.renderHeader()}
            <Flash />
            {this.props.renderContent(this.props.children)}
            {this.props.renderFooter()}
            <BottomInfoBar cookieName="conn_ac1" />
            <BugReport />
        </Root>
    );
}

Layout.childContextTypes = {
    addEscapeListener: PropTypes.func,
};

Layout.propTypes = {
    children:      PropTypes.node.isRequired,
    renderHeader:  PropTypes.func,
    renderFooter:  PropTypes.func,
    renderContent: PropTypes.func,
};

Layout.defaultProps = {
    renderHeader:  () => null,
    renderFooter:  () => null,
    renderContent: () => children => children,
};

export default Layout;
