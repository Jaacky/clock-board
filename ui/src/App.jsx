import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './containers/Dashboard';

import RouteWrapper from './helpers/RouteWrapper';

import Header from './components/Header';
import Login from 'components/Login';
import Registration from 'components/Registration';
import Verification from 'components/Verification';

import {
    loginRequest,
    registrationRequest,
    verificationRequest,
} from 'actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    {/* <Route exact path="/" component={}/> */}
                    <RouteWrapper path="/register" component={Registration}
                        registrationRequest={this.props.registrationRequest}
                    />
                    <RouteWrapper path="/login" component={Login}
                        loginRequest={this.props.loginRequest}
                    />
                    <RouteWrapper path="/verification" component={Verification}
                        sendVerificationRequest={this.props.sendVerificationRequest}
                    />


                    <Route path="/dashboard" component={Dashboard}/>
                </Switch>
                {/* <Dashboard/> */}
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    console.log("state in app", state);
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (email, password) => {
            dispatch(loginRequest(email, password));
        },
        registrationRequest: (email, password) => {
            dispatch(registrationRequest(email, password));
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