import React from 'react';

import styles from '../scss/styles.scss';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length >= 8 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let { sendRegistrationRequest } = this.props;

        sendRegistrationRequest(event.target.email.value, event.target.password.value, this.props.history);
    }

    render() {
        return (
            <div className={styles.clocks}>
                <div className={styles.clockBox}>
                    <div className={styles.clockPlaceholder}>
                        <form className={styles.form} onSubmit={this.handleSubmit}>
                            <h2>Sign Up</h2>
                            <label>Email:</label>
                            <input
                                autoFocus
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Email"
                            />
                            <label>Password:</label>
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password"
                            />
                            <label>Confirm password:</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                placeholder="Confirm password"
                            />
                            <label>&nbsp;</label> {/* Equalize spacing between inputs and button */}
                            <button
                                type="submit"
                                disabled={!this.validateForm() || this.state.isLoading }
                            >
                            {this.state.isLoading ? "Registering" : "Register" }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}