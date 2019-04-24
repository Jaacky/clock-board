import React from 'react';
import { Link } from 'react-router-dom'

import styles from 'scss/styles';

const Header = () => {
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
            <Link to="/verification">
                <button>Verification</button>
            </Link>
            <Link to="/dashboard">
                <button>Dashboard</button>
            </Link>
        </div>
    )
}

export default Header;