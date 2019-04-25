import React from 'react';

import styles from '../scss/styles.scss';

export default class Verification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        let { user, sendVerificationRequest } = this.props;
        console.log(user.email, event.target.confirmationCode.value);
        sendVerificationRequest(user.email, event.target.confirmationCode.value);
    }

    render() {
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
                    placeholder="Confirmation code"
                />
                <button
                    type="submit"
                    disabled={this.state.isLoading}
                >
                {this.state.isLoading ? "Verifying" : "Verify" }
                </button>
            </form>
        )
    }
}