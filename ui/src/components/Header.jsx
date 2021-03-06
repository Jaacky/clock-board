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
        let homeLink = (this.props.user.email) ? "/dashboard" : "/";

        let links = [
            <Link className={styles.logo} key="headerHome" to={homeLink}>
                <div>Clock Board</div>
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
                    <button className={styles.signUp}>Sign Up</button>
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