import React from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';
import Registration from 'containers/Registration';

import { loginRequest } from 'actions';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAccountPrompts = () => {
        let {
            // user,
            user: {
                idToken
            }
        } = this.props;
        if (idToken === undefined) {
            console.log("idToken is undefined");
            return (
                <div>
                    <Registration/>
                    <Login loginRequest={this.props.loginRequest}/>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderAccountPrompts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state in header", state);
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (email, password) => {
            dispatch(loginRequest(email, password));
        },
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;