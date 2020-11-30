import React, { Component, ComponentType, FunctionComponent, ReactComponentElement, ReactNode, ReactPropTypes } from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { initialAppStateType } from '../store';
import { useSelector } from 'react-redux';
import { ProfileScreen } from '../screens/ProfileScreen';


// 계정 유저가 아닌경우 url로 접속하는걸 방지하는 컴포넌트

interface PrivateCustomRoutePropsType extends RouteProps {
    component: ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateCustomRoutePropsType> = ({ component: Component, ...rest }) => {
    const userSignin = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userSignin;
    return (
        <Route
            {...rest}
            render={(props) => userInfo ? (
                <Component {...props}></Component>
            ) : (
                    <Redirect to="signin" />
                )}
        >

        </Route>
    )
}
