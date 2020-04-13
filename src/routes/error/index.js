import React from 'react';
import ErrorPage from './ErrorPage';

function action(error) {
    return {
        title:     'Demo Error',
        component: <ErrorPage error={error} />,
    };
}

export default action;
