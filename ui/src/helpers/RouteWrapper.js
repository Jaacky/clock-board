import React from 'react';
import { Route } from 'react-router';

const RouteWrapper = ({ component: ChildComponent, exact, path, ...rest }) => {
    return (
        <Route exact path={path} render={ (props) => {
            console.log("Route.props", props);
            return (
                <ChildComponent {...rest} history={props.history}/>
            )
        }}/>
    )
}

export default RouteWrapper