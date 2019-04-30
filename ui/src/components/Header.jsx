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
        return(
            <div className={styles.header}>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/register">
                    <button>Sign Up</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <button onClick={this.handleLogout}>Logout</button>
                <Link to="/verification">
                    <button>Verification</button>
                </Link>
                <Link to="/dashboard">
                    <button>Dashboard</button>
                </Link>
            </div>
        )
    }
}

export default withRouter(Header);