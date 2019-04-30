import React from 'react';
import { withRouter, Link } from 'react-router-dom'

import styles from 'scss/styles';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogout = () => {
        this.props.sendLogoutRequest(this.props.history);
    }

    render() {
        console.log("Header props user", this.props.user);
        console.log(this.props.user.email);
        let links = [
            <Link key="headerHome" to="/">
                <button>Home</button>
            </Link>,
        ];
        if (this.props.user.email) {
            links = links.concat([
                <Link key="headerDashboard" to="/dashboard">
                    <button>Dashboard</button>
                </Link>,
                <button key="headerLogout" onClick={this.handleLogout}>Logout</button>
            ]);
        } else {
            links = links.concat([
                <Link key="headerRegister" to="/register">
                    <button>Sign Up</button>
                </Link>,
                <Link key="headerLogin" to="/login">
                    <button>Login</button>
                </Link>,
            ]);
        }
        return(
            <div className={styles.header}>
                {links}
                <Link key="headerVerification" to="/verification">
                    <button>Verification</button>
                </Link>
            </div>
        )
    }
}

export default withRouter(Header);