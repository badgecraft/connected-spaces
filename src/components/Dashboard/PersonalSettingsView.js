import React from 'react';
import { t } from 'ttag';
import { connect } from 'react-redux';
import Layout from './PersonalLayout';
import Header from '../UI/DefaultFormHeader';
import { TOGGLE_MENU_OPEN } from '../../ui/Menu/toggableMenuReducer';
import UserForm from '../../ui/User/UserForm';

const BackHeader = connect(
    () => ({ title: t`Personal settings` }),
    dispatch => ({ onClickBack: () => dispatch({ type: TOGGLE_MENU_OPEN, payload: { name: 'userHeaderRightMenu' } }) }),
)(Header);

const PersonalSettingsView = ({ ...props }) => (
    <Layout{...props} header={<BackHeader />}>
        <UserForm />
    </Layout>
);

PersonalSettingsView.propTypes = {};

export default PersonalSettingsView;
