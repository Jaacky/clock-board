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
            <div className={styles.clocks}>
                <div className={styles.clockBox}>
                    <div className={styles.clockPlaceholder}>
                        <form className={styles.form} onSubmit={this.handleConfirmationSubmit}>
                            <h1>Verification</h1>
                            <label>Confirmation code:</label>
                            <input
                                autoFocus
                                name="confirmationCode"
                                type="tel"
                                placeholder="Confirmation code"
                            />
                            <label>&nbsp;</label> {/* Equalize spacing between inputs and button */}
                            <button
                                type="submit"
                                disabled={this.state.isLoading}
                            >
                            {this.state.isLoading ? "Verifying" : "Verify" }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}