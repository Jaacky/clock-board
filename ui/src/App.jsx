import React from 'react';
import { connect } from 'react-redux';

import Registration from './containers/Registration';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Registration/>
                <Login/>
                <Dashboard/>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const AppContainer = connect(
    mapStateToProps,
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