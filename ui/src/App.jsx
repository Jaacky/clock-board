import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './containers/Dashboard';

import RouteWrapper from './helpers/RouteWrapper';

import Header from './components/Header';
import Login from 'components/Login';
import Registration from 'components/Registration';
import Verification from 'components/Verification';
import Landing from 'components/Landing';

import {
    authenticationCheckRequest,
    loginRequest,
    logoutRequest,
    registrationRequest,
    verificationRequest,
} from 'actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Fires a history push event after success/fail, which will cause component to remount and fires this again -> infinite loop
        // this.props.sendAuthenticationCheckRequest();
    }

    render() {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <Header
                    user={this.props.user}
                    sendLogoutRequest={this.props.sendLogoutRequest}
                />
                <Switch>
                    <RouteWrapper exact path="/" component={Landing}
                        sendAuthenticationCheckRequest={this.props.sendAuthenticationCheckRequest}
                    />
                    <RouteWrapper path="/register" component={Registration}
                        sendRegistrationRequest={this.props.sendRegistrationRequest}
                    />
                    <RouteWrapper path="/login" component={Login}
                        sendLoginRequest={this.props.sendLoginRequest}
                    />
                    <RouteWrapper path="/verification" component={Verification}
                        sendVerificationRequest={this.props.sendVerificationRequest}
                        user={this.props.user}
                    />
                    <RouteWrapper path="/dashboard" component={Dashboard}
                        sendAuthenticationCheckRequest={this.props.sendAuthenticationCheckRequest}
                    />
                </Switch>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    console.log("state in app", state);
    return {
        user: state.user,
        loading: state.loading.app,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendAuthenticationCheckRequest: () => {
            dispatch(authenticationCheckRequest());
        },
        sendLoginRequest: (email, password, history) => {
            dispatch(loginRequest(email, password, history));
        },
        sendLogoutRequest: (history) => {
            dispatch(logoutRequest(history));
        },
        sendRegistrationRequest: (email, password, history) => {
            dispatch(registrationRequest(email, password, history));
        },
        sendVerificationRequest: (email, code) => {
            dispatch(verificationRequest(email, code));
        },
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;

// class App extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             clocks: [],
//             isLoading: false,
//         };
//     }

//     componentDidMount() {
//         this.setState({ isLoading: true });
//         fetch("/api/1")
//             .then((response) => {
//                 return response.json();
//             })
//             .then((json) => {
//                 this.setState({clocks: json.clocks, isLoading: false});
//                 console.log(JSON.stringify(json));
//             });
//     }

//     render() {
//         const { clocks, isLoading } = this.state;
//         if (isLoading) {
//             return <p>Loading...</p>
//         }

//         return (
//             <Provider store={store}>
//                 <App/>
//                 {/* {clocks.map(clock => {
//                     const end = new Date(clock.end);
//                     return (
//                         <div key={clock.end}>
//                             <h2>{clock.end}</h2>
//                             <h2>{end.getFullYear()}-{end.getMonth() + 1}-{end.getDate()} / {end.getHours()}:{end.getMinutes()}</h2>
//                         </div>
//                     )
//                 }
//                 )} */}
//             </Provider>
//         )
//     }
// }