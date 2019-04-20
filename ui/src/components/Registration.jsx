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
            confirmationCode: "",
            newUser: null,
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length >= 8 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        console.log("validate confirmation form: " + this.state.confirmationCode.length > 0)
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let { registrationRequest } = this.props;
        this.setState({ isLoading: true });

        registrationRequest(event.target.email.value, event.target.password.value);
        this.setState({ newUser: "heyo" });

        this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
    }

    renderForm() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
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
                <button
                    type="submit"
                    disabled={!this.validateForm() || this.state.isLoading }
                >
                {this.state.isLoading ? "Registering" : "Register" }
                </button>
            </form>
        )
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <label>Confirmation code:</label>
                <input
                    autoFocus
                    name="confirmationCode"
                    type="tel"
                    value={this.state.confirmationCode}
                    onChange={this.handleChange}
                    placeholder="Confirmation code"
                />
                <button
                    type="submit"
                    disabled={!this.validateConfirmationForm() || this.state.isLoading }
                >
                {this.state.isLoading ? "Verifying" : "Verify" }
                </button>
            </form>
        )
    }

    render() {
        console.log("New user: ", this.newUser === null);
        return (
            <div>
                {this.state.newUser === null 
                    ? this.renderForm()
                    : this.renderConfirmationForm()
                }
            </div>
        )
    }
}