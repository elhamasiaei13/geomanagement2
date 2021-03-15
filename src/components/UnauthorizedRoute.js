import React from 'react';
import { Route, } from 'react-router-dom';
import authUtil from '../service/authUtil';

class UnauthorizedRoute extends React.Component {

    render() {
        return (
            < Route
                path="/"
                component={
                    ({ location, history }) => {
                        if (authUtil.isRedirectedBackFromAuthServer(location)) {
                            if (authUtil.isAuthorizedByAuthServer(location)) {
                                localStorage.removeItem("stateStr");
                                authUtil.persistAuthCredential(location);
                                authUtil.redirectToPreLocation();
                                return false;
                            } else {
                                authUtil.redirectToLoginErrorPage();
                            }
                        } else {
                            authUtil.redirectToAuthServer(location);
                        }
                        return false;
                    }
                }
            />
        );
    }
}

export default UnauthorizedRoute;