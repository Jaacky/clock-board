import React from 'react';

import styles from '../scss/styles.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    // TODO: Move fetch call to saga, handle state setting globally instead of through this component.
    handleSubmit = async event => {
        event.preventDefault();
        console.log("Login props: ", this.props);
        console.log("this.prosp.history", this.props.history);
        let { sendLoginRequest } = this.props;
        this.setState({ isLoading: true });
        sendLoginRequest(event.target.email.value, event.target.password.value, this.props.history)
        // try {
        //     let response = await fetch("/api/signin", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             "email": event.target.email.value,
        //             "password": event.target.password.value,
        //         }),
        //     });
        //     console.log("response ok: ", response.ok);
        //     if (response.ok) {
        //         let json = await response.json();
        //         console.log("json response from submit", json);

        //         this.setState({ isLoading: false });
        //         loginRequest({idToken: json.idToken});
                
        //     } else {
        //         // Login unsuccessful
        //         this.setState({ isLoading: false });
        //     }
        // } catch(err) {
        //     console.log("Network err in post request", err);
        // }

        // this.setState({ isLoading: false });
    }

    render() {
        return(
            <div className={styles.clocks}>
                <div className={styles.clockPlaceholder}>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <label>Email:</label>
                        <input name="email" type="email" placeholder="Email"/>
                        <label>Password:</label>
                        <input name="password" type="password" placeholder="Password"/>
                        <label>&nbsp;</label> {/* Equalize spacing between inputs and button */}
                        <button type="submit" disabled={this.state.isLoading}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;