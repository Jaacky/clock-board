import React from 'react';

import styles from '../scss/styles.scss';

export default class Verification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            confirmationCode: "",
        };
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

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
    }

    render() {
        console.log("New user: ", this.newUser === null);
        return (
            <form
                className={styles.form}
                onSubmit={this.handleConfirmationSubmit}
            >
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
}