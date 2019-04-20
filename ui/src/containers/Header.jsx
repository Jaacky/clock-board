import React from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';
import Registration from 'components/Registration';

import {
    loginRequest,
    registrationRequest,
} from 'actions';

import styles from 'scss/styles';

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
                [
                    <Registration key="registration"
                        registrationRequest={this.props.registrationRequest}
                    />,
                    <Login key="login"
                        loginRequest={this.props.loginRequest}
                    />
                ]
            )
        }
    }

    render() {
        return(
            <div className={styles.header}>
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
        registrationRequest: (email, password) => {
            dispatch(registrationRequest(email, password));
        },
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;