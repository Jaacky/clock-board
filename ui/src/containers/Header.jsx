import React from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';
import Registration from 'components/Registration';

import {
    loginRequest,
    registrationRequest,
    verificationRequest,
} from 'actions';

import styles from 'scss/styles';
import Verification from '../components/Verification';

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
                    <Verification key="verification"
                        sendVerificationRequest={this.props.sendVerificationRequest}
                    />,
                    <Login key="login"
                        loginRequest={this.props.loginRequest}
                    />,
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
        sendVerificationRequest: (email, code) => {
            dispatch(verificationRequest(email, code));
        },
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;